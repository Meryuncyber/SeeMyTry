/**
 * Sayısal bir değeri Türk Lirası para birimi formatına dönüştürür.
 * @param {number} value - Formatlanacak sayısal değer.
 * @returns {string} Para birimi simgesi ve binlik ayraçları ile formatlanmış string.
 */
export const formatCurrency = (value) => {
  if (value === null || value === undefined) {
    return '₺0,00';
  }

  // toLocaleString ile para birimi formatını otomatik olarak oluştururuz.
  // 'tr-TR' locale'i ve 'TRY' (Türk Lirası) para birimi kullanılır.
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0, // Küsüratları göstermemek için
    maximumFractionDigits: 0, // Küsüratları göstermemek için
  }).format(value);
};

// Gelecekte eklenebilecek diğer formatlama fonksiyonları için bir yer tutucu
// export const formatDate = (date) => { ... };
// export const formatPercentage = (value) => { ... };
