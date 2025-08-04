import React, { useState, useEffect } from 'react';
import { generateSalesLink } from '../services/salesLinkService';
import { FaExternalLinkAlt, FaSpinner } from 'react-icons/fa';

const SalesLink = ({ productData }) => {
  const [salesLinks, setSalesLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productData && productData.name) {
      setLoading(true);
      setError(null);
      const timer = setTimeout(async () => {
        try {
          const links = await generateSalesLink(productData.name);
          setSalesLinks(links);
        } catch (err) {
          console.error("Satış bağlantıları oluşturulurken hata:", err);
          setError("Satış bağlantıları oluşturulamadı.");
        } finally {
          setLoading(false);
        }
      }, 1000); // Kullanıcı deneyimi için 1 saniyelik sahte gecikme

      return () => clearTimeout(timer);
    }
  }, [productData]);

  if (loading) {
    return (
      <div className="bg-gray-700 p-4 rounded-lg shadow-md mt-4 flex items-center justify-center">
        <FaSpinner className="animate-spin mr-2 text-indigo-400" />
        <p className="text-gray-400">Satış bağlantıları oluşturuluyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-700 p-4 rounded-lg shadow-md mt-4">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!salesLinks.length) {
    return null;
  }

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md mt-4">
      <h3 className="text-xl font-bold mb-3 text-gray-200">Satış Platformu Bağlantıları</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {salesLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-gray-800 hover:bg-gray-900 p-3 rounded-lg transition-colors"
          >
            <span className="font-medium text-gray-100">{link.platform}</span>
            <FaExternalLinkAlt className="text-indigo-400" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SalesLink;
