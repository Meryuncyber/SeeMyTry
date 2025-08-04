// src/components/ManualInputForm.jsx
import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const ManualInputForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && category.trim() && description.trim()) {
      onSubmit({ name, category, description, originalImage: null });
    }
  };

  const isFormValid = name.trim() && category.trim() && description.trim();

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
      <h3 className="text-xl font-bold mb-2 text-indigo-300">Bilgileri Manuel Girin</h3>
      <p className="text-sm text-gray-400 mb-6">
        Ürün fotoğrafınızı tanımlarken bir sorun oluştu. Lütfen ürününüzle ilgili bilgileri girerek devam edin.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-400">Ürün Adı</label>
          <input
            type="text"
            id="productName"
            placeholder="Örn: Siyah Deri Çanta"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="productCategory" className="block text-sm font-medium text-gray-400">Kategori</label>
          <input
            type="text"
            id="productCategory"
            placeholder="Örn: Kadın Aksesuar"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="productDescription" className="block text-sm font-medium text-gray-400">Açıklama</label>
          <textarea
            id="productDescription"
            rows="4"
            placeholder="Örn: Yüksek kaliteli malzemeden üretilmiş, şık ve kullanışlı bir çanta."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium transition-all ${
            isFormValid
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          <FaPaperPlane className="mr-2" />
          <span>Bilgileri Onayla ve Devam Et</span>
        </button>
      </form>
    </div>
  );
};

export default ManualInputForm;
