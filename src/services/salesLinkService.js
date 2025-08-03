// src/services/salesLinkService.js

/**
 * Ürün verilerine dayalı olarak paylaşılabilir ve mikro e-ticaret uyumlu
 * dinamik bir satış bağlantısı oluşturur.
 *
 * Her bağlantı, lokal olarak barındırılan bir tanıtım sayfasına yönlendirir
 * ve ürün slug'ı ile birlikte UUID parametresi içerir.
 */

import { generateSlug, generateUUID } from '../utils/formatters'

const BASE_URL = import.meta.env.PROD
  ? 'https://meryuncyber.github.io/micro-ticaret-botu'
  : 'http://localhost:5173'

/**
 * Satış linki oluşturucu
 * @param {Object} productData - Ürünle ilgili veriler
 * @param {string} productData.title - Ürün başlığı
 * @param {string} productData.imagePath - Optimize edilmiş görselin yolu
 * @param {string} productData.price - Ürün fiyatı
 * @returns {string} - Dinamik satış bağlantısı
 */
export function generateSalesLink(productData) {
  if (!productData || !productData.title || !productData.imagePath) {
    throw new Error('Geçersiz ürün verisi.')
  }

  const slug = generateSlug(productData.title)
  const uuid = generateUUID()

  // Örn: https://.../urun/beyaz-tshirt?ref=4fd8a2f3-0a1c-4e10
  return `${BASE_URL}/urun/${slug}?ref=${uuid}`
}

/**
 * Satış linkini sosyal medya uyumlu bir formatta hazırlar.
 * @param {Object} productData
 * @returns {{
 *    url: string,
 *    previewText: string
 * }}
 */
export function getShareableLink(productData) {
  const url = generateSalesLink(productData)
  const previewText = `🎯 ${productData.title} sadece ${productData.price}₺!
Görsel ve detaylar: ${url}`

  return {
    url,
    previewText
  }
}
