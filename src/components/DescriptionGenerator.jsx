import React, { useState, useEffect } from 'react';
import { generateDescription } from '../services/descriptionService';
import { FaCopy, FaSpinner, FaEdit } from 'react-icons/fa';

const DescriptionGenerator = ({ productData }) => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (productData) {
      setLoading(true);
      setError(null);
      const timer = setTimeout(async () => {
        try {
          const generatedText = await generateDescription(productData);
          setDescription(generatedText);
        } catch (err) {
          console.error("Açıklama oluşturulurken hata:", err);
          setError("Açıklama oluşturulamadı. Lütfen tekrar deneyin.");
        } finally {
          setLoading(false);
        }
      }, 1000); // Kullanıcı deneyimi için 1 saniyelik sahte gecikme

      return () => clearTimeout(timer);
    }
  }, [productData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(description);
    alert('Açıklama kopyalandı!');
  };

  const handleEditChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md mt-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-bold text-gray-200">Ürün Açıklaması</h3>
        <div className="flex space-x-2">
          {!loading && description && (
            <>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                title="Açıklamayı Düzenle"
              >
                <FaEdit />
              </button>
              <button 
                onClick={handleCopy}
                className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                title="Kopyala"
              >
                <FaCopy />
              </button>
            </>
          )}
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-4">
          <FaSpinner className="animate-spin mr-2 text-indigo-400" />
          <p className="text-gray-400">Açıklama oluşturuluyor...</p>
        </div>
      )}

      {error && (
        <p className="text-red-400 py-4">{error}</p>
      )}

      {!loading && !error && (
        isEditing ? (
          <textarea
            value={description}
            onChange={handleEditChange}
            className="w-full h-40 p-3 bg-gray-800 text-gray-100 rounded-lg border-2 border-gray-600 focus:border-indigo-500 focus:outline-none transition-colors"
          />
        ) : (
          <p className="bg-gray-800 p-3 rounded-lg whitespace-pre-wrap">{description}</p>
        )
      )}
    </div>
  );
};

export default DescriptionGenerator;
