// /src/hooks/useImageRecognition.js

import { useState, useCallback } from "react";
import { recognizeProductFromImage } from "@/services/imageRecognitionService";
import { optimizeImage } from "@/utils/imageOptimizer";
import { validateImageFile } from "@/utils/validators";

export function useImageRecognition() {
  const [imageFile, setImageFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productData, setProductData] = useState(null);

  // Kullanıcının görsel yüklemesini işler
  const handleImageUpload = useCallback((file) => {
    setError(null);

    if (!validateImageFile(file)) {
      setError("Desteklenmeyen görsel formatı veya çok büyük dosya.");
      return;
    }

    const preview = URL.createObjectURL(file);
    setPreviewURL(preview);
    setImageFile(file);
    setProductData(null);
  }, []);

  // Görsel tanıma sürecini başlatır
  const processImage = useCallback(async () => {
    if (!imageFile) {
      setError("Lütfen önce bir görsel yükleyin.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const optimized = await optimizeImage(imageFile);
      const prediction = await recognizeProductFromImage(optimized);
      setProductData(prediction);
    } catch (err) {
      console.error("Görsel işleme hatası:", err);
      setError("Görsel işlenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, [imageFile]);

  // Hook dışarıya şunları sunar
  return {
    imageFile,
    previewURL,
    productData,
    loading,
    error,
    handleImageUpload,
    processImage,
  };
}
