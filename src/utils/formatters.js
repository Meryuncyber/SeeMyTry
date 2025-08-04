// src/utils/formatters.js
/**
 * Sayısal bir değeri Türk Lirası para birimi formatına dönüştürür.
 * @param {number} value - Formatlanacak sayısal değer.
 * @returns {string} Para birimi simgesi ve binlik ayraçları ile formatlanmış string.
 */
export const formatCurrency = (value) => {
  if (value === null || value === undefined) {
    return '₺0,00';
  }

  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2, // Küsüratların gösterilmesi için
    maximumFractionDigits: 2, // Küsüratların gösterilmesi için
  }).format(value);
};
      
