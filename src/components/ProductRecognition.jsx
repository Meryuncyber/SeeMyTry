import React, { useState, useEffect } from 'react';
import DescriptionGenerator from './DescriptionGenerator';
import PriceEstimator from './PriceEstimator';
import SalesLink from './SalesLink';
import OptimizedImage from './OptimizedImage';
import ResultCard from './ResultCard';

const ProductRecognition = ({ recognitionData }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!recognitionData) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      
      try {
        
        
        const mockProductDetails = {
          name: recognitionData.productName || 'Tanımlanamayan Ürün',
          category: recognitionData.category || 'Genel',
          originalImage: recognitionData.originalImage, // Orijinal resmin URL'i
          
        };

        setProductDetails(mockProductDetails);
      } catch (err) {
        console.error("Ürün detayları alınırken hata oluştu:", err);
        setError("Ürün detayları alınırken bir sorun oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [recognitionData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <svg className="animate-spin h-8 w-8 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="ml-3 text-lg text-gray-400">Ürün bilgileri toplanıyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  if (!productDetails) {
    return null; // recognitionData yoksa bir şey render etme
  }

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
            
