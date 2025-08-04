import { useState, useCallback } from 'react';
import { recognizeImage } from '../services/imageRecognitionService';

export const useImageRecognition = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [processedData, setProcessedData] = useState(null);

  const processImage = useCallback(async (imageFile) => {
    if (!imageFile) {
      setError("Lütfen bir resim dosyası seçin.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setProcessedData(null);

    try {
      // imageRecognitionService servisini çağırarak resim işleme işlemini başlat
      const result = await recognizeImage(imageFile);
      setProcessedData(result);
    } catch (err) {
      console.error("Resim tanıma işlemi sırasında bir hata oluştu:", err);
      setError("Resim tanıma işlemi başarısız oldu. Lütfen geçerli bir ürün resmi yükleyin.");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return { isProcessing, error, processedData, processImage };
};
