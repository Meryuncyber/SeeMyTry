/**
 * Verilen ürün adı için popüler e-ticaret sitelerine arama linkleri oluşturur.
 * Gerçek bir senaryoda bu fonksiyon daha gelişmiş URL yapılarını kullanabilir.
 * @param {string} productName - Tanınan ürünün adı.
 * @returns {Promise<Array>} Platform adı ve URL'lerini içeren bir dizi.
 */
export const generateSalesLink = async (productName) => {
  console.log("Satış bağlantıları oluşturuluyor...", productName);

  // Sahte bir gecikme ekliyoruz.
  const randomDelay = Math.floor(Math.random() * 800) + 200; // 0.2 - 1 saniye arası
  await new Promise(resolve => setTimeout(resolve, randomDelay));

  if (!productName || typeof productName !== 'string') {
    throw new Error("Geçerli bir ürün adı sağlanmadı.");
  }

  // URL'lerde kullanılmak üzere ürün adını düzenle
  const encodedProductName = encodeURIComponent(productName);

  const links = [
    {
      platform: 'Sahibinden',
      url: `https://www.sahibinden.com/arama?query=${encodedProductName}`
    },
    {
      platform: 'Dolap',
      url: `https://www.dolap.com/arama?q=${encodedProductName}`
    },
    {
      platform: 'Letgo (OLX)',
      url: `https://www.olx.com.tr/arama/?q=${encodedProductName}`
    },
  ];

  console.log("Oluşturulan bağlantılar:", links);
  
  return links;
};
