import React, { useState, useEffect } from 'react';
import ImageUploader from './components/ImageUploader';
import ResultCard from './components/ResultCard'; // Sonuçları gösterecek bir bileşen olduğunu varsayıyoruz
import { recognizeProduct, initializeGemini } from './services/imageRecognitionService';
import './styles/index.css';

function App() {
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Gemini API'yi başlatmak için useEffect kullanıyoruz.
  // Bu kod, uygulama yüklendiğinde bir kez çalışır.
  useEffect(() => {
    // API anahtarını Vite'ın .env dosyasından alır.
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    initializeGemini(apiKey);
  }, []);

  // Resim yüklendiğinde çalışacak fonksiyon
  const handleImageUpload = async (files) => {
    if (files && files.length > 0) {
      const file = files[0];
      setIsLoading(true);
      setError(null);

      try {
        const data = await recognizeProduct(file);
        setProductData(data);
      } catch (err) {
        console.error(err);
        setError("Resim tanıma işlemi başarısız oldu. Lütfen geçerli bir ürün resmi yükleyin.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRemoveImage = () => {
    setProductData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Mikro Ticaret Botu</h1>
      <p className="text-lg text-gray-400 mb-8">Fotoğrafını yükle, gerisini o halletsin.</p>

      <div className="w-full max-w-xl">
        <ImageUploader 
          onDrop={handleImageUpload} 
          isLoading={isLoading} 
          error={error} 
          onRemove={handleRemoveImage}
        />
        
        {isLoading && (
          <div className="mt-8 text-center text-xl text-yellow-400">
            Ürün inceleniyor, lütfen bekleyin...
          </div>
        )}

        {productData && (
          <ResultCard data={productData} />
        )}
      </div>
      
      <footer className="mt-12 text-gray-500 text-sm">
        <p>© 2024 Mikro Ticaret Botu. Tüm Hakları Saklıdır.</p>
        <p>Bu proje bir eğitim çalışmasıdır.</p>
      </footer>
    </div>
  );
}

export default App;
      
