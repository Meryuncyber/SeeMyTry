import React, { useState, useEffect } from 'react';
import { optimizeImage } from '../utils/imageOptimizer';
import { FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const OptimizedImage = ({ imageUrl }) => {
  const [optimizedUrl, setOptimizedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (imageUrl) {
      setLoading(true);
      setError(null);
      setOptimizedUrl(null);
      const timer = setTimeout(async () => {
        try {
          const optimizedBlob = await optimizeImage(imageUrl);
          const url = URL.createObjectURL(optimizedBlob);
          setOptimizedUrl(url);
        } catch (err) {
          console.error("Resim optimize edilirken hata oluştu:", err);
          setError("Resim optimize edilemedi.");
        } finally {
          setLoading(false);
        }
      }, 500); // Kullanıcı deneyimi için 0.5 saniyelik sahte gecikme

      return () => {
        clearTimeout(timer);
        if (optimizedUrl) {
          URL.revokeObjectURL(optimizedUrl);
        }
      };
    }
  }, [imageUrl]);

  if (!imageUrl) {
    return null;
  }

  return (
    <div className="relative bg-gray-700 p-4 rounded-lg shadow-md mt-4 text-center">
      <h3 className="text-xl font-bold mb-3 text-gray-200">Optimize Edilmiş Resim</h3>
      
      {loading && (
        <div className="flex flex-col items-center justify-center p-8">
          <FaSpinner className="animate-spin text-4xl text-indigo-400 mb-2" />
          <p className="text-gray-400">Resim optimize ediliyor...</p>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center p-8 text-red-400">
          <FaExclamationCircle className="text-4xl mb-2" />
          <p>{error}</p>
        </div>
      )}
      
      {optimizedUrl && !loading && (
        <>
          <img 
            src={optimizedUrl} 
            alt="Optimize edilmiş ürün resmi" 
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <div className="flex items-center justify-center mt-3 text-green-400">
            <FaCheckCircle className="mr-2" />
            <span>Optimizasyon tamamlandı!</span>
          </div>
        </>
      )}
    </div>
  );
};

export default OptimizedImage;
