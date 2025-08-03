import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import ResultCard from './ResultCard';
import { recognizeProduct } from '../services/imageRecognitionService';

const ProductRecognition = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [recognitionResult, setRecognitionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Görsel yüklendiğinde tetiklenen fonksiyon
  useEffect(() => {
    if (!selectedFile) {
      setRecognitionResult(null);
      setError(null);
      return;
    }

    const recognize = async () => {
      setLoading(true);
      setError(null);
      setRecognitionResult(null);
      try {
        // imageRecognitionService'den ürün tahmini al
        const result = await recognizeProduct(selectedFile);
        setRecognitionResult(result);
      } catch (err) {
        setError('Ürün tanıma işlemi başarısız oldu. Lütfen tekrar deneyin.');
        console.error('ProductRecognition hata:', err);
      } finally {
        setLoading(false);
      }
    };

    recognize();
  }, [selectedFile]);

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white/5 backdrop-blur-md rounded-3xl shadow-lg">
      <h2 className="text-3xl font-semibold text-sky-400 mb-6 text-center">
        Ürün Görseli Tanıma
      </h2>

      <ImageUploader onImageSelected={setSelectedFile} />

      {loading && (
        <p className="mt-6 text-center text-gray-300 animate-pulse">
          Ürün tanınıyor, lütfen bekleyin...
        </p>
      )}

      {error && (
        <p className="mt-6 text-center text-red-500 font-medium">{error}</p>
      )}

      {recognitionResult && (
        <div className="mt-8">
          <ResultCard product={recognitionResult} />
        </div>
      )}
    </section>
  );
};

export default ProductRecognition;
