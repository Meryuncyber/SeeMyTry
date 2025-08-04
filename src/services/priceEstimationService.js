/**
 * Ürün verilerine göre bir fiyat aralığı tahmin eder.
 * Gerçek bir senaryoda bu fonksiyon, bir API'den fiyat verisi çekebilir.
 * @param {Object} productData - productName ve category gibi bilgileri içeren ürün nesnesi.
 * @returns {Promise<Object>} Tahmin edilen min ve max fiyatları içeren bir nesne.
 */
export const estimatePrice = async (productData) => {
  console.log("Fiyat tahmini yapılıyor...", productData);

  // Sahte bir API çağrısını simüle etmek için rastgele bir gecikme ekliyoruz.
  const randomDelay = Math.floor(Math.random() * 2000) + 1000; // 1-3 saniye arası
  await new Promise(resolve => setTimeout(resolve, randomDelay));

  if (!productData || !productData.category) {
    throw new Error("Fiyat tahmini için yeterli ürün verisi bulunamadı.");
  }

  // Kategoriye göre fiyat aralıklarını simüle eden bir harita (map)
  const priceRanges = {
    'Akıllı Telefon': { min: 4500, max: 7000 },
    'Kitap': { min: 50, max: 200 },
    'Kulaklık': { min: 300, max: 1500 },
    'Sırt Çantası': { min: 250, max: 800 },
    'Ayakkabı': { min: 600, max: 1800 },
    'Saat': { min: 1000, max: 5000 },
    'Oyuncak': { min: 100, max: 500 },
    'Diğer Elektronik': { min: 500, max: 3000 }
  };

  const selectedRange = priceRanges[productData.category];

  if (!selectedRange) {
    throw new Error("Bu kategori için fiyat tahmini yapılamadı.");
  }

  // Belirlenen aralık içinde rastgele bir min ve max fiyat oluşturuyoruz
  const minPrice = Math.floor(Math.random() * (selectedRange.max - selectedRange.min + 1)) + selectedRange.min;
  const maxPrice = minPrice + Math.floor(Math.random() * 500) + 100; // Min fiyattan 100-600 TL daha fazla

  const estimatedPrice = {
    min: minPrice,
    max: maxPrice
  };
  
  console.log("Tahmin edilen fiyat:", estimatedPrice);

  return estimatedPrice;
};
