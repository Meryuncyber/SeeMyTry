// src/services/descriptionService.js

/**
 * Ürün açıklaması oluşturma servisi
 * Görsel analizinden elde edilen nesne sınıfı, kullanıcı isteği ve ekstra bağlamla açıklama üretir
 */

import { formatPrice } from '../utils/formatters'
import { validateProductClass } from '../utils/validators'

/**
 * Temel açıklama şablonları (dil bağımsız genişletilebilir)
 */
const baseTemplates = {
  default: (name, feature) =>
    `Bu ${name}, ${feature} özelliğiyle öne çıkıyor. Günlük kullanım için ideal ve şıklığıyla dikkat çekiyor.`,
  fashion: (name, feature) =>
    `Tarzınızı tamamlayacak ${name}, ${feature} dokusuyla hem konforlu hem göz alıcı.`,
  electronics: (name, feature) =>
    `Yüksek performanslı ${name}, ${feature} donanımıyla teknoloji tutkunlarına özel üretildi.`,
  home: (name, feature) =>
    `Ev dekorasyonuna modern bir dokunuş: ${feature} yapısı ve zarif tasarımıyla ${name}.`,
}

/**
 * Ürün açıklaması üretici
 * @param {Object} productData - Ürün verisi
 * @param {string} productData.name - Ürün adı
 * @param {string} productData.category - Kategori (fashion, electronics, home vs.)
 * @param {string[]} productData.features - Öne çıkan özellikler
 * @param {number} productData.price - Tahmini fiyat
 * @param {string} productData.locale - Kullanıcı dili (opsiyonel)
 * @returns {string} Ürün açıklaması
 */
export function generateDescription(productData) {
  if (!productData || !productData.name || !productData.category) return ''

  const { name, category, features, price, locale } = productData

  const selectedFeature = features?.[0] || 'özel tasarımı'
  const template =
    baseTemplates[category.toLowerCase()] || baseTemplates['default']

  let description = template(name, selectedFeature)

  if (price) {
    description += ` Sadece ${formatPrice(price, locale)} fiyatıyla satışta.`
  }

  return description
}
