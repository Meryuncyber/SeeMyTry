/**
 * Verilen bir resim URL'sini alır, boyutunu küçültür ve optimize edilmiş bir Blob nesnesi olarak döndürür.
 * @param {string} imageUrl - Optimize edilecek resmin URL'si.
 * @returns {Promise<Blob>} Optimize edilmiş resmin Blob nesnesi.
 */
export const optimizeImage = async (imageUrl) => {
  console.log("Resim optimizasyonu başlatıldı...");
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const MAX_WIDTH = 800;
      const MAX_HEIGHT = 800;
      let width = img.width;
      let height = img.height;

      // Resim boyutlarını küçültme
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Resmin kalitesini düşürerek Blob olarak dışa aktarma
      canvas.toBlob((blob) => {
        if (blob) {
          console.log("Resim optimizasyonu tamamlandı. Boyut:", (blob.size / 1024).toFixed(2), "KB");
          resolve(blob);
        } else {
          reject(new Error("Resim Blob'a dönüştürülemedi."));
        }
      }, 'image/jpeg', 0.8); // JPEG formatı ve %80 kalite
    };

    img.onerror = () => {
      reject(new Error("Resim yüklenirken bir hata oluştu."));
    };
    
    img.src = imageUrl;
  });
};
