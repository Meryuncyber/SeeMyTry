/**
 * Verilen bir string'in boş olup olmadığını kontrol eder.
 * Boşluklardan oluşan string'leri de boş kabul eder.
 * @param {string} value - Kontrol edilecek string.
 * @returns {boolean} Boş ise true, değilse false.
 */
export const isStringEmpty = (value) => {
  if (typeof value !== 'string') {
    return true;
  }
  return value.trim().length === 0;
};

/**
 * Verilen bir değerin geçerli bir sayı olup olmadığını kontrol eder.
 * @param {*} value - Kontrol edilecek değer.
 * @returns {boolean} Geçerli bir sayı ise true, değilse false.
 */
export const isValidNumber = (value) => {
  if (typeof value === 'number' && !isNaN(value)) {
    return true;
  }
  if (typeof value === 'string' && value.trim() !== '') {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
  return false;
};

// Gelecekte eklenebilecek diğer doğrulama fonksiyonları için bir yer tutucu
// export const isValidEmail = (email) => { ... };
// export const isValidURL = (url) => { ... };
