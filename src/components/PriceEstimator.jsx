import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { estimatePrice } from '../services/priceEstimationService';

const PriceEstimator = ({ product }) => {
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!product) {
      setEstimatedPrice(null);
      setError(null);
      return;
    }

    const fetchPrice = async () => {
      setLoading(true);
      setError(null);
      setEstimatedPrice(null);

      try {
        const price = await estimatePrice(product);
        setEstimatedPrice(price);
      } catch (err) {
        setError('Fiyat tahmini alınamadı. Lütfen tekrar deneyin.');
        console.error('PriceEstimator hata:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [product]);

  if (!product) {
    return (
      <div className="p-4 mt-6 text-center text-gray-400 italic bg-white/5 rounded-lg">
        Ürün seçilmeden fiyat tahmini yapılamaz.
      </div>
    );
  }

  return (
    <section className="mt-8 p-6 bg-white/5 rounded-3xl shadow-md backdrop-blur-sm max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold mb-4 text-sky-400">Fiyat Tahmini</h3>

      {loading && (
        <p className="text-gray-300 animate-pulse text-center">Fiyat tahmini hesaplanıyor...</p>
      )}

      {error && (
        <p className="text-red-500 text-center font-medium">{error}</p>
      )}

      {!loading && !error && estimatedPrice !== null && (
        <p className="text-gray-100 text-lg font-semibold text-center select-text">
          Tahmini Fiyat: <span className="text-emerald-400">{estimatedPrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
        </p>
      )}
    </section>
  );
};

PriceEstimator.propTypes = {
  product: PropTypes.object, // { id, name, category, brand, model, ... } gibi ürün bilgileri
};

export default PriceEstimator;
