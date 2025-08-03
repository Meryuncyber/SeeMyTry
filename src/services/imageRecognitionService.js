// /src/services/imageRecognitionService.js

import * as tf from '@tensorflow/tfjs';
import { loadGraphModel } from '@tensorflow/tfjs-converter';
import { optimizeImage } from '../utils/imageOptimizer';
import { isValidImage } from '../utils/validators';

const MODEL_PATH = '/src/models/product-classifier-model.json';

let model = null;

/**
 * Modeli tek seferlik yükler.
 */
const loadModel = async () => {
  if (!model) {
    try {
      model = await loadGraphModel(MODEL_PATH);
      console.info('[TFJS] Model başarıyla yüklendi.');
    } catch (error) {
      console.error('[TFJS] Model yüklenemedi:', error);
      throw new Error('Görsel tanıma modeli yüklenemedi.');
    }
  }
  return model;
};

/**
 * Görseli sınıflandırır ve kategori/probability sonucu döner.
 * @param {File} imageFile - Yüklenen görsel dosyası
 * @returns {Promise<{ label: string, probability: number }>} 
 */
export const classifyImage = async (imageFile) => {
  if (!isValidImage(imageFile)) {
    throw new Error('Geçersiz görsel formatı.');
  }

  const imgBitmap = await createImageBitmap(imageFile);
  const optimized = await optimizeImage(imgBitmap, { width: 224, height: 224 });

  const tensor = tf.browser.fromPixels(optimized)
    .toFloat()
    .expandDims(0)
    .div(tf.scalar(255));

  const model = await loadModel();
  const prediction = model.predict(tensor);

  const scores = await prediction.data();
  const highest = scores.indexOf(Math.max(...scores));

  // Örnek sınıf etiketleri (sen gerçek veriyle eşleştir)
  const labels = ['Telefon', 'Ayakkabı', 'Kıyafet', 'Aksesuar', 'Kitap', 'Bilgisayar'];

  return {
    label: labels[highest] || 'Bilinmiyor',
    probability: Number(scores[highest].toFixed(3)),
  };
};
