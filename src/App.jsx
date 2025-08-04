import React from 'react';
import ImageUploader from './components/ImageUploader';
import ProductRecognition from './components/ProductRecognition';
import Layout from './components/Layout';
import { useImageRecognition } from './hooks/useImageRecognition';

const App = () => {
  const { processedData, processImage } = useImageRecognition();

  // `processedData`'yı ve `processImage`'i `ImageUploader` bileşenine aktarıyoruz.
  // Bu, ImageUploader'ın resim yüklemesiyle birlikte tanıma işlemini başlatmasını sağlar.
  return (
    <Layout>
      {/* Resim yükleme ve işleme bileşeni */}
      <ImageUploader onImageProcess={processImage} />

      {/* İşlenmiş veri varsa, ürün tanıma sonuçlarını gösteren bileşeni render et */}
      {processedData && (
        <ProductRecognition recognitionData={processedData} />
      )}
    </Layout>
  );
};

export default App;
