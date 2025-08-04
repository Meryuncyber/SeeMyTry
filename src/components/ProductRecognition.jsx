import React from 'react';
import DescriptionGenerator from './DescriptionGenerator';
import PriceEstimator from './PriceEstimator';
import SalesLink from './SalesLink';
import OptimizedImage from './OptimizedImage';
import ResultCard from './ResultCard';

const ProductRecognition = ({ recognitionData }) => {
  if (!recognitionData) {
    return null; // Veri yoksa bileşeni render etme
  }

  // Gemini API'den gelen veriyi doğrudan kullanıyoruz
  const { name, category, description, originalImage } = recognitionData;
  
  const productDetails = {
    name,
    category,
    description, // Artık Gemini'den gelen açıklamayı kullanıyoruz
    originalImage
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto my-8 space-y-6">
      <h2 className="text-3xl font-extrabold text-indigo-400 text-center">Ürün Analizi Tamamlandı!</h2>
      
      {/* Sonuç kartı, diğer bileşenlerin çıktılarını toplar */}
      <ResultCard>
        {/* Optimize edilmiş resmi göster */}
        <OptimizedImage imageUrl={productDetails.originalImage} />
        
        {/* Ürün adını ve kategorisini göster */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Ürün Bilgileri</h3>
          <p className="text-lg"><strong>Ürün Adı:</strong> {productDetails.name}</p>
          <p className="text-lg"><strong>Kategori:</strong> {productDetails.category}</p>
        </div>
        
        {/* Açıklama oluşturucu bileşeni */}
        <DescriptionGenerator productData={productDetails} />
        
        {/* Fiyat tahminleyici bileşeni */}
        <PriceEstimator productData={productDetails} />
        
        {/* Satış bağlantısı oluşturucu bileşeni */}
        <SalesLink productData={productDetails} />
      </ResultCard>
    </div>
  );
};

export default ProductRecognition;
