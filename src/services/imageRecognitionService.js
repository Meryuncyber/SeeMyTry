import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI;

export const initializeGemini = (apiKey) => {
  if (apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
    console.log("Gemini API hazırlandı.");
  } else {
    console.error("Gemini API anahtarı bulunamadı.");
  }
};

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const recognizeProduct = async (file) => {
  if (!genAI) {
    throw new Error("Gemini API başlatılmadı. Lütfen API anahtarını kontrol edin.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  try {
    const base64Image = await getBase64(file);
    const mimeType = file.type;

    const parts = [
      {
        text: "Bu bir e-ticaret ürünü fotoğrafıdır. Bana ürünün adını, kategorisini ve tahmini bir açıklamasını ver. Sadece Türkçe yanıt ver. Örneğin: Ürün Adı: Siyah Deri Çanta, Kategori: Aksesuar, Açıklama: Klasik tasarımlı, şık ve kullanışlı bir siyah deri çanta.",
      },
      {
        inlineData: {
          data: base64Image.split(",")[1],
          mimeType: mimeType,
        },
      },
    ];

    const result = await model.generateContent({ contents: [{ parts }] });
    const response = await result.response;
    const text = response.text();
    console.log("Gemini yanıtı:", text);
    
    // Yanıtı ayrıştır
    const lines = text.split('\n');
    const productName = lines.find(line => line.startsWith('Ürün Adı:'))?.split(': ')[1] || 'Bilinmiyor';
    const category = lines.find(line => line.startsWith('Kategori:'))?.split(': ')[1] || 'Bilinmiyor';
    const description = lines.find(line => line.startsWith('Açıklama:'))?.split(': ')[1] || 'Bilinmiyor';

    return { name: productName, category: category, description: description };

  } catch (error) {
    console.error("Gemini API çağrısı sırasında bir hata oluştu:", error);
    throw new Error("Ürün tanıma işlemi başarısız oldu. Lütfen geçerli bir ürün resmi yükleyin.");
  }
};
      
