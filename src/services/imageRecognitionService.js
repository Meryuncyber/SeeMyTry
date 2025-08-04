import * as tf from '@tensorflow/tfjs';

// Bu, yüklenen modeli saklayacağımız global bir değişkendir.
// Modeli bir kez yüklüyoruz ve tekrar kullanıyoruz.
let productClassifierModel;

// Modelin yükleneceği yol
const MODEL_URL = '/models/product-classifier-model.json';

// Örnek olarak kullanacağımız etiketler (sınıflar)
// Gerçek bir modelde bu etiketler modelin eğitim çıktısından elde edilir.
const LABELS = ['Elektronik', 'Kitap', 'Giyim', 'Mobilya', 'Aksesuar'];

/**
 * Makine öğrenimi modelini yükler.
 * Uygulama başladığında main.jsx dosyasından çağrılır.
 * @returns {Promise<tf.LayersModel>} Yüklenen model nesnesi.
 */
export const loadModel = async () => {
  if (productClassifierModel) {
    return productClassifierModel;
  }
  
  try {
    console.log("Makine öğrenimi modeli yükleniyor...");
    productClassifierModel = await tf.loadLayersModel(MODEL_URL);
    console.log("Model başarıyla yüklendi.");
    return productClassifierModel;
  } catch (error) {
    console.error("Model yüklenirken bir hata oluştu:", error);
    throw new Error("Model yüklenemedi. Lütfen internet bağlantınızı kontrol edin.");
  }
};

/**
 * Resmi işler, modeli kullanarak tahmin yapar ve sonucu döndürür.
 * @param {HTMLImageElement} imageElement - Tanınacak resim elementi.
 * @returns {Promise<{name: string, confidence: number}>} En yüksek doğruluk oranına sahip ürün tahmini.
 */
export const recognizeProduct = async (imageElement) => {
  // Model yüklü değilse, önce yükle
  if (!productClassifierModel) {
    await loadModel();
  }

  // Resmi modelin beklediği formata dönüştürme (örneğin 224x224 piksel)
  const tensor = tf.browser.fromPixels(imageElement)
    .resizeNearestNeighbor([224, 224]) // Resim boyutunu modelin beklentisine göre ayarla
    .toFloat()
    .expandDims();

  // Resmi normalize etme (0-1 aralığına getirme)
  const normalized = tensor.div(tf.scalar(255));
  
  // Modeli kullanarak tahmin yapma
  const prediction = productClassifierModel.predict(normalized);
  
  // Tahmin sonuçlarını işleme
  const result = await prediction.data();
  const topPrediction = Array.from(result)
    .map((confidence, index) => ({ confidence, label: LABELS[index] }))
    .sort((a, b) => b.confidence - a.confidence)[0];

  // Bellek yönetimi
  tf.dispose([tensor, normalized, prediction]);

  console.log("Ürün tanıma tamamlandı:", topPrediction);
  
  // Gerçek bir tahmine yakın sahte veri döndürme
  // Bu, modelin çalışmasını simüle eder.
  const mockConfidence = topPrediction.confidence * 100;
  
  return {
    name: topPrediction.label,
    confidence: parseFloat(mockConfidence.toFixed(2))
  };
};
