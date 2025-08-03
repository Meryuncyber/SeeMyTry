/**
 * Metni slug haline getirir.
 * URL dostu, küçük harf, boşluklar tire ile değiştirilmiş.
 * Türkçe karakterler normalize edilir.
 * 
 * @param {string} text - Formatlanacak metin
 * @returns {string} Slug formatı
 */
export function generateSlug(text) {
  if (!text || typeof text !== 'string') return ''
  return text
    .toLowerCase()
    .normalize('NFD')                    // Türkçe karakterlerin ayrıştırılması
    .replace(/[\u0300-\u036f]/g, '')   // aksanları temizle
    .replace(/[^a-z0-9\s-ğüşöçıİĞÜŞÖÇ]/g, '') // harf, sayı ve bazı türkçe karakterler dışındakiler
    .trim()
    .replace(/\s+/g, '-')               // boşlukları tireye çevir
    .replace(/-+/g, '-')                // ardışık tireyi tek tireye indir
}

/**
 * UUID v4 benzeri basit, kısa benzersiz ID üretir.
 * 
 * @returns {string} Rastgele benzersiz kimlik
 */
export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Fiyatı para birimi ve formatıyla döner.
 * Örn: 1250.5 -> "₺1.250,50"
 * 
 * @param {number|string} price 
 * @param {string} currency 
 * @param {string} locale 
 * @returns {string}
 */
export function formatPrice(price, currency = 'TRY', locale = 'tr-TR') {
  const number = typeof price === 'string' ? parseFloat(price) : price
  if (isNaN(number)) return ''
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(number)
}

/**
 * Büyük sayıları insan okunabilir şekilde kısaltır.
 * Örn: 1500 -> 1.5K, 1000000 -> 1M
 * 
 * @param {number} number 
 * @param {number} digits 
 * @returns {string}
 */
export function abbreviateNumber(number, digits = 1) {
  if (number === null || number === undefined) return ''
  const lookup = [
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' },
  ]
  const item = lookup.find(item => number >= item.value)
  if (!item) return number.toString()
  return (number / item.value).toFixed(digits) + item.symbol
}

/**
 * Metinleri sınırlar, sonunda üç nokta ekler.
 * 
 * @param {string} text 
 * @param {number} maxLength 
 * @returns {string}
 */
export function truncateText(text, maxLength = 100) {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * ISO tarih formatını daha okunabilir hale getirir.
 * 
 * @param {string} isoString 
 * @param {Object} options - Intl.DateTimeFormat seçenekleri
 * @returns {string}
 */
export function formatDate(isoString, options = {}) {
  if (!isoString) return ''
  try {
    const date = new Date(isoString)
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options,
    })
  } catch {
    return ''
  }
}

/**
 * Boolean değerini "Evet" veya "Hayır" olarak döner.
 * 
 * @param {boolean} bool 
 * @returns {string}
 */
export function formatBoolean(bool) {
  return bool ? 'Evet' : 'Hayır'
}
