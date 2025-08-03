/**
 * priceEstimationService.js
 * 
 * Kullanıcının yüklediği ürün görselinden elde edilen bilgiler doğrultusunda,
 * ürünün ortalama piyasa fiyatını tahmin eder.
 * 
 * Veri kaynakları:
 * - Model çıktıları (tahmini ürün sınıfı, özellikler)
 * - Kullanıcı girdileri (ek açıklamalar, benzer ürün tipi)
 * - Geçmiş veriler (yerel tarama ya da API ile alınabilir)
 * 
 * Not: Bu örnek, dış veri çekimi yapılmadan, örnekle sabitlenmiş bir sistemle çalışır.
 * Daha sonra bir backend veya veri API ile entegre edilerek genişletilebilir.
 */

import { formatCurrency } from '../utils/formatters'
import { validateProductFeatures } from '../utils/validators'

/**
 * Örnek fiyat veritabanı (ileride replace edilebilir)
 */
const MOCK_PRICE_DATABASE = {
  "ayakkabı": { base: 500, min: 350, max: 750 },
  "telefon_kılıfı": { base: 120, min: 80, max: 180 },
  "kulaklık": { base: 850, min: 600, max: 1200 },
  "çanta": { base: 400, min: 300, max: 650 },
  "güneş gözlüğü": { base: 700, min: 500, max: 1000 }
}

/**
 * Fiyat tahmini yapan ana fonksiyon
 * 
 * @param {Object} features - Ürünle ilgili özellikler
 * @param {string} features.category - Ürün kategorisi (örn: ayakkabı)
 * @param {string} [features.material] - Malzeme (örn: deri)
 * @param {string} [features.brand] - Marka (örn: Adidas)
 * @param {boolean} [features.isNew] - Yeni mi (secondhand değilse true)
 * @param {number} [features.estimatedQuality] - 1-10 arası kalite skoru
 * @returns {Object} Tahmin edilen fiyat ve aralık bilgisi
 */
export function estimatePrice(features) {
  if (!validateProductFeatures(features)) {
    return {
      error: 'Eksik ya da geçersiz ürün bilgileri. Lütfen tekrar deneyin.'
    }
  }

  const categoryKey = features.category.toLowerCase()
  const db = MOCK_PRICE_DATABASE[categoryKey]

  if (!db) {
    return {
      error: 'Bu kategori için tahmini fiyat verisi bulunamadı.'
    }
  }

  // Temel fiyat üzerinden modifikasyon
  let estimated = db.base

  // Kalite skoru +20/-20%
  if (features.estimatedQuality >= 8) {
    estimated *= 1.2
  } else if (features.estimatedQuality <= 4) {
    estimated *= 0.8
  }

  // Yeni ürünse +15%
  if (features.isNew) {
    estimated *= 1.15
  }

  // Marka etkisi
  if (features.brand && ['Nike', 'Adidas', 'Apple'].includes(features.brand)) {
    estimated *= 1.25
  }

  // Malzeme özel durumu (premium materyal)
  if (features.material && ['deri', 'metal', 'cam'].includes(features.material)) {
    estimated *= 1.1
  }

  // Fiyat aralığı hesaplama (±%15)
  const lowerBound = Math.floor(estimated * 0.85)
  const upperBound = Math.ceil(estimated * 1.15)

  return {
    price: formatCurrency(estimated),
    range: `${formatCurrency(lowerBound)} - ${formatCurrency(upperBound)}`,
    raw: { estimated, lowerBound, upperBound }
  }
}
