import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { generateDescription } from '../services/descriptionService';

const DescriptionGenerator = ({ product, onDescriptionReady }) => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!product) {
      setDescription('');
      setError(null);
      return;
    }

    const fetchDescription = async () => {
      setLoading(true);
      setError(null);
      try {
        // Ürün bilgisiyle açıklama oluştur
        const generated = await generateDescription(product);
        setDescription(generated);
        if (onDescriptionReady) onDescriptionReady(generated);
      } catch (err) {
        setError('Açıklama oluşturulamadı. Lütfen tekrar deneyin.');
        console.error('DescriptionGenerator error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDescription();
  }, [product, onDescriptionReady]);

  if (!product) {
    return (
      <div className="p-4 mt-6 text-center text-gray-400 italic bg-white/5 rounded-lg">
        Ürün seçilmeden açıklama oluşturulamaz.
      </div>
    );
  }

  return (
    <section className="mt-8 p-6 bg-white/5 rounded-3xl shadow-md backdrop-blur-sm max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold mb-4 text-sky-400">Ürün Açıklaması</h3>

      {loading && (
        <p className="text-gray-300 animate-pulse text-center">
          Açıklama oluşturuluyor, lütfen bekleyin...
        </p>
      )}

      {error && (
        <p className="text-red-500 text-center font-medium">{error}</p>
      )}

      {!loading && !error && (
        <p className="whitespace-pre-line text-gray-100 text-lg leading-relaxed select-text">
          {description || 'Açıklama mevcut değil.'}
        </p>
      )}
    </section>
  );
};

DescriptionGenerator.propTypes = {
  product: PropTypes.object, // Ürün objesi (tanımlı shape tercihe bağlı)
  onDescriptionReady: PropTypes.func,
};

export default DescriptionGenerator;
