import React, { useState, useCallback } from 'react';
import { useImageRecognition } from '../hooks/useImageRecognition';
import { useDropzone } from 'react-dropzone';
import { FaImage, FaSpinner, FaTrash } from 'react-icons/fa';

const ImageUploader = () => {
  const [preview, setPreview] = useState(null);
  const { isProcessing, error, processedData, processImage } = useImageRecognition();

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      processImage(file);
    }
  }, [processImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
    maxFiles: 1,
  });

  const handleRemoveImage = () => {
    setPreview(null);
    
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-200">Ürün Fotoğrafı Yükle</h2>
      
      {preview ? (
        <div className="relative mb-4">
          <img src={preview} alt="Yüklenen ürün önizlemesi" className="w-full h-auto rounded-lg shadow-lg" />
          <button 
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            <FaTrash />
          </button>
        </div>
      ) : (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-indigo-400 bg-gray-700' : 'border-gray-600 bg-gray-900'
          }`}
        >
          <input {...getInputProps()} />
          <FaImage className="text-4xl text-gray-400 mx-auto mb-2" />
          {isDragActive ? (
            <p className="text-indigo-300">Resmi buraya bırakın...</p>
          ) : (
            <p className="text-gray-400">Resmi buraya sürükleyin ya da tıklayıp seçin.</p>
          )}
        </div>
      )}

      {isProcessing && (
        <div className="mt-4 flex items-center justify-center text-indigo-400">
          <FaSpinner className="animate-spin mr-2" />
          <span>Analiz ediliyor, lütfen bekleyin...</span>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-600 text-white rounded-lg">
          <p>Hata: {error}</p>
        </div>
      )}

      {processedData && !isProcessing && (
        <div className="mt-4 p-4 bg-green-600 text-white rounded-lg">
          <p>İşlem başarıyla tamamlandı!</p>
          {/* Sonuç verileri buradan diğer bileşenlere iletilecek */}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
      
