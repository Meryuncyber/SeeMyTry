import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';

const ImageUploader = ({ onImageSelected }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreviewUrl(ev.target.result);
      setFileName(file.name);
      onImageSelected(file);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreviewUrl(null);
    setFileName(null);
    inputRef.current.value = null;
    onImageSelected(null);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-inner transition hover:shadow-xl">
      <label
        htmlFor="file-input"
        className="cursor-pointer flex flex-col items-center justify-center w-full py-8 border-2 border-dashed border-gray-500/30 rounded-xl hover:bg-gray-100/10 transition-all"
      >
        {previewUrl ? (
          <div className="relative w-full">
            <img
              src={previewUrl}
              alt="Yüklenen görsel"
              className="rounded-xl w-full object-contain max-h-80 border border-white/10"
            />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full hover:bg-red-600 transition"
              aria-label="Görseli kaldır"
            >
              <X size={16} />
            </button>
            <p className="text-sm text-center text-gray-400 mt-2 truncate">{fileName}</p>
          </div>
        ) : (
          <>
            <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-300 text-center">
              Görsel yüklemek için tıkla veya sürükle bırak
            </p>
            <span className="text-xs text-gray-500 mt-1">
              Desteklenen: JPEG, PNG, WebP
            </span>
          </>
        )}
      </label>

      <input
        type="file"
        accept="image/*"
        id="file-input"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
