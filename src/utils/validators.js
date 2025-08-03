/**
 * Boşluklar dahil, null veya undefined olmayan string mi?
 * @param {string} value 
 * @returns {boolean}
 */
export function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

/**
 * Geçerli email formatında mı?
 * Basit ama güçlü regex ile.
 * @param {string} email 
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!isNonEmptyString(email)) return false
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email.toLowerCase())
}

/**
 * Geçerli telefon numarası mı? (Türkiye odaklı)
 * Başında +90 olabilir, sadece rakamlar ve boşluk kabul edilir.
 * 
 * @param {string} phone 
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  if (!isNonEmptyString(phone)) return false
  const cleaned = phone.replace(/[\s()-]/g, '') // boşluk ve parantezleri temizle
  const re = /^(?:\+90)?[5-9][0-9]{9}$/ // Türkiye cep telefonu formatı
  return re.test(cleaned)
}

/**
 * Parola gücü (sadece örnek kriterler)
 * Minimum 8 karakter, en az bir büyük harf, bir küçük harf, bir rakam, bir özel karakter
 * @param {string} password 
 * @returns {boolean}
 */
export function isStrongPassword(password) {
  if (!isNonEmptyString(password)) return false
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return re.test(password)
}

/**
 * Sayı mı? (Pozitif, negatif, ondalık destekler)
 * @param {any} value 
 * @returns {boolean}
 */
export function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

/**
 * Pozitif tam sayı mı?
 * @param {any} value 
 * @returns {boolean}
 */
export function isPositiveInteger(value) {
  return Number.isInteger(Number(value)) && Number(value) > 0
}

/**
 * URL geçerli mi? (Basit kontrol)
 * @param {string} url 
 * @returns {boolean}
 */
export function isValidUrl(url) {
  if (!isNonEmptyString(url)) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Dosya tipi geçerli mi? (örneğin resim: png, jpg, jpeg, gif)
 * @param {string} filename 
 * @param {Array<string>} allowedExtensions - küçük harf uzantılar
 * @returns {boolean}
 */
export function isValidFileType(filename, allowedExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp']) {
  if (!isNonEmptyString(filename)) return false
  const ext = filename.split('.').pop().toLowerCase()
  return allowedExtensions.includes(ext)
}

/**
 * Dosya boyutu sınırı kontrolü (byte cinsinden)
 * @param {number} sizeInBytes 
 * @param {number} maxSizeInBytes 
 * @returns {boolean}
 */
export function isFileSizeValid(sizeInBytes, maxSizeInBytes = 5 * 1024 * 1024) {
  return typeof sizeInBytes === 'number' && sizeInBytes > 0 && sizeInBytes <= maxSizeInBytes
}

/**
 * JSON string mi? Parsing kontrolü yapar.
 * @param {string} jsonString 
 * @returns {boolean}
 */
export function isValidJson(jsonString) {
  if (!isNonEmptyString(jsonString)) return false
  try {
    JSON.parse(jsonString)
    return true
  } catch {
    return false
  }
}
