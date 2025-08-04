import { genAI } from './imageRecognitionService';

/**
 * Gemini API kullanarak ürün için yaratıcı bir açıklama oluşturur.
 * @param {object} productData - imageRecognitionService'ten gelen ürün verisi
 * @returns {Promise<string>} Oluşturulan ürün açıklaması
 */
export const generateDescription = async (productData) => {
  if (!genAI) {
    throw new Error("Gemini API başlatılmadı.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    Aşağıda bir ürünün adı, kategorisi ve kısa bir açıklaması verilmiştir. Bu bilgilere dayanarak, e-ticaret siteleri için akıcı, yaratıcı ve dikkat çekici bir ürün açıklaması yaz. Açıklama en az 100 kelime uzunluğunda olsun ve müşteriyi etkilemeye odaklan.
    
    Ürün Adı: ${productData.name}
    Kategori: ${productData.category}
    Açıklama: ${productData.description}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Açıklama oluşturulurken hata:", error);
    throw new Error("Açıklama oluşturulamadı. Lütfen geçerli bilgilerle tekrar deneyin.");
  }
};
    
