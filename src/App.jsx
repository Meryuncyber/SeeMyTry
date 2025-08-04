// src/App.jsx
// ... diğer import'lar ...
import ProductRecognition from './components/ProductRecognition';
import ManualInputForm from './components/ManualInputForm'; // Yeni bir bileşen

function App() {
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isManualInput, setIsManualInput] = useState(false); // Yeni durum

  // ... (useEffect ve diğer fonksiyonlar aynı kalır) ...

  const handleImageUpload = async (file) => {
    setIsLoading(true);
    setError(null);
    setProductData(null); // Veriyi temizle

    try {
      const data = await recognizeProduct(file);
      setProductData(data);
    } catch (err) {
      console.error(err);
      setError("Resim tanıma işlemi başarısız oldu.");
      setIsManualInput(true); // Hata durumunda manuel girişi etkinleştir
    } finally {
      setIsLoading(false);
    }
  };
  
  // Manuel girişten gelen veriyi işleyecek fonksiyon
  const handleManualSubmit = (data) => {
    setProductData(data);
    setIsManualInput(false);
  };

  return (
    // ...
    <div className="w-full max-w-xl">
      <ImageUploader 
        onDrop={handleImageUpload} 
        isLoading={isLoading} 
        error={error} 
        onRemove={handleRemoveImage}
      />
      
      {isLoading && (
        <div className="text-center mt-4">
          <p>Analiz ediliyor...</p>
        </div>
      )}

      {isManualInput && !isLoading && (
        <div className="bg-gray-800 p-6 rounded-lg mt-4">
          <p className="text-red-400 mb-4">Otomatik tanıma başarısız oldu. Lütfen ürün bilgilerini manuel girin.</p>
          <ManualInputForm onSubmit={handleManualSubmit} />
        </div>
      )}

      {productData && !isLoading && (
        <ProductRecognition recognitionData={productData} />
      )}
    </div>
    // ...
  );
}

export default App;
        
