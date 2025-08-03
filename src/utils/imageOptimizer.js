/**
 * imageOptimizer.js
 * 
 * Ticaret Botu için modern, dinamik ve performans odaklı görsel optimizasyon yardımcıları.
 * 
 * Amaç:
 * - Görselleri web/uygulama için uygun şekilde yeniden boyutlandırmak,
 * - Sıkıştırmak,
 * - Gerekirse format dönüştürmek (ör: JPEG -> WebP),
 * - Yükleme sürelerini kısaltmak,
 * - Dinamik Tailwind yapılarına uygun şekilde, UI entegrasyonunu kolaylaştırmak.
 */

import compressImage from 'browser-image-compression';

/**
 * Görseli yeniden boyutlandır ve optimize et.
 * Tarayıcı destekli JS sıkıştırma, kalite ayarı ile.
 * 
 * @param {File} imageFile - Kullanıcının yüklediği resim dosyası
 * @param {Object} options - Optimizasyon seçenekleri
 * @param {number} options.maxWidth - Maksimum genişlik (px)
 * @param {number} options.maxHeight - Maksimum yükseklik (px)
 * @param {number} options.maxSizeMB - Maksimum dosya boyutu (MB)
 * @param {number} options.initialQuality - Başlangıç kalite değeri (0-1)
 * @param {boolean} options.convertToWebp - WebP'ye dönüştür (varsayılan: true)
 * @returns {Promise<File>} - Optimize edilmiş dosya
 */
export async function optimizeImage(imageFile, options = {}) {
  const {
    maxWidth = 1024,
    maxHeight = 1024,
    maxSizeMB = 1,
    initialQuality = 0.8,
    convertToWebp = true,
  } = options;

  if (!imageFile) throw new Error('No image file provided.');

  const config = {
    maxSizeMB,
    maxWidthOrHeight: Math.max(maxWidth, maxHeight),
    useWebWorker: true,
    initialQuality,
    fileType: convertToWebp ? 'image/webp' : imageFile.type,
  };

  try {
    const compressedFile = await compressImage(imageFile, config);
    return compressedFile;
  } catch (error) {
    console.error('Image optimization failed:', error);
    throw error;
  }
}

/**
 * DataURL veya base64 stringini optimize etmek için,
 * Bu fonksiyon genellikle img elementleri için ön optimizasyon.
 * (Opsiyonel, ileri seviye)
 * 
 * @param {string} dataUrl 
 * @param {Object} options 
 * @returns {Promise<string>} Optimize edilmiş dataUrl
 */
export async function optimizeDataURL(dataUrl, options = {}) {
  // Basit örnek: base64 → Blob → optimizeImage → tekrar dataUrl
  // Bu fonksiyon büyük resimler için dikkatle kullanılmalı.

  const blob = dataURLtoBlob(dataUrl);
  const optimizedFile = await optimizeImage(new File([blob], 'temp.webp', { type: 'image/webp' }), options);
  return fileToDataURL(optimizedFile);
}

/**
 * DataURL'den Blob oluşturur.
 * @param {string} dataURL 
 * @returns {Blob}
 */
function dataURLtoBlob(dataURL) {
  const parts = dataURL.split(',');
  const mime = parts[0].match(/:(.*?);/)[1];
  const binary = atob(parts[1]);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: mime });
}

/**
 * File/Blob'u dataURL'ye dönüştürür.
 * @param {File|Blob} file 
 * @returns {Promise<string>}
 */
function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
