/**
 * Ürün verilerine göre otomatik bir açıklama oluşturur.
 * Gerçek bir senaryoda bu fonksiyon, bir dil modeli API'sini çağırabilir.
 * * @param {Object} productData - productName ve category gibi bilgileri içeren ürün nesnesi.
 * @returns {Promise<string>} Oluşturulan ürün açıklaması.
 */
export const generateDescription = async (productData) => {
  console.log("Ürün açıklaması oluşturuluyor...", productData);

  // Sahte bir API çağrısını simüle etmek için rastgele bir gecikme ekliyoruz.
  const randomDelay = Math.floor(Math.random() * 1500) + 500; // 0.5 - 2 saniye arası
  await new Promise(resolve => setTimeout(resolve, randomDelay));

  if (!productData || !productData.name) {
    throw new Error("Geçerli ürün verisi bulunamadı.");
  }

  // Oluşturulan ürün açıklaması için basit bir şablon kullanıyoruz.
  const descriptions = [
    `Bu harika **${productData.name}** çok az kullanılmış ve mükemmel durumda. **${productData.category}** kategorisindeki bu ürünü kaçırma! Alıcısına şimdiden hayırlı olsun.`,
    `Sıfır ayarında **${productData.name}** fırsatı! Temiz kullanılmış ve tüm fonksiyonları sorunsuz çalışıyor. **${productData.category}** arıyorsanız, tam size göre.`,
    `Kullanışlı ve sağlam **${productData.name}** uygun fiyata satılıktır. İhtiyaç fazlası olduğu için satıyorum. **${productData.category}** sevenler için ideal.`,
  ];
  
  const randomIndex = Math.floor(Math.random() * descriptions.length);
  const generatedText = descriptions[randomIndex];
  
  console.log("Oluşturulan açıklama:", generatedText);

  return generatedText;
};
