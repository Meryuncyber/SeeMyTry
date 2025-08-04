import React, { useState, useEffect } from 'react';
import { estimatePrice } from '../services/priceEstimationService';
import { formatCurrency } from '../utils/formatters';
import { FaSpinner, FaTag, FaEdit } from 'react-icons/fa';

const PriceEstimator = ({ productData }) => {
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [userPrice, setUserPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (productData) {
      setLoading(true);
      setError(null);
      const timer = setTimeout(async () => {
        try {
          const priceRange = await estimatePrice(productData);
          setEstimatedPrice(priceRange);
        } catch (err) {
          console.error("Fiyat tahmini yapılırken hata:", err);
          setError("Fiyat tahmini yapılamadı. Lütfen manuel olarak girin.");
          setEstimatedPrice(null);
        } finally {
          setLoading(false);
        }
      }, 1500); // Kullanıcı deneyimi için 1.5 saniyelik sahte gecikme

      return () => clearTimeout(timer);
    }
  }, [productData]);

  const handleUserPriceChange = (e) => {
    const value = e.target.value;
    // Sadece sayısal değerlere izin ver
    if (/^\d*$/.test(value) || value === '') {
      setUserPrice(value);
    }
  };

  const handleSavePrice = () => {
    if (userPrice) {
      setEstimatedPrice({ min: parseFloat(userPrice), max: parseFloat(userPrice) });
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md mt-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-bold text-gray-200">Tahmini Fiyat</h3>
        {estimatedPrice && !loading && (
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
            title="Fiyatı Düzenle"
          >
            <FaEdit />
          </button>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-4">
          <FaSpinner className="animate-spin mr-2 text-indigo-400" />
          <p className="text-gray-400">Fiyat tahmini yapılıyor...</p>
        </div>
      )}

      {error && (
        <p className="text-red-400 py-4">{error}</p>
      )}

      {!loading && (
        isEditing ? (
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">₺</span>
            <input
              type="text"
              value={userPrice}
              onChange={handleUserPriceChange}
              placeholder="Kendi fiyatınızı girin"
              className="w-full p-2 bg-gray-800 text-gray-100 rounded-lg border-2 border-gray-600 focus:border-indigo-500 focus:outline-none transition-colors"
            />
            <button
              onClick={handleSavePrice}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Kaydet
            </button>
          </div>
        ) : (
          estimatedPrice ? (
            <div className="flex items-center space-x-2">
              <FaTag className="text-yellow-400 text-2xl" />
              <p className="text-2xl font-bold text-green-400">
                {formatCurrency(estimatedPrice.min)} - {formatCurrency(estimatedPrice.max)}
              </p>
            </div>
          ) : (
            !error && <p className="text-gray-400 py-4">Fiyat bilgisi henüz mevcut değil.</p>
          )
        )
      )}
    </div>
  );
};

export default PriceEstimator;
