import React from "react";
import { Download, ExternalLink } from "lucide-react"; // Tailwind uyumlu ikonlar
import OptimizedImage from "./OptimizedImage";

const ResultCard = ({
  title,
  description,
  price,
  originalImage,
  optimizedImage,
  salesLink,
}) => {
  return (
    <div className="w-full max-w-md mx-auto bg-zinc-900 text-white rounded-2xl shadow-lg overflow-hidden border border-zinc-800 transition hover:shadow-xl">
      {/* Görsel */}
      <div className="relative h-64 bg-zinc-800 overflow-hidden">
        <OptimizedImage
          src={optimizedImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-zinc-700 text-xs px-2 py-1 rounded">
          Optimizasyonlu Görsel
        </div>
      </div>

      {/* İçerik */}
      <div className="p-4 space-y-3">
        <h2 className="text-xl font-bold truncate">{title || "Ürün Adı"}</h2>
        <p className="text-sm text-zinc-300 line-clamp-3">
          {description || "Açıklama henüz oluşturulmadı."}
        </p>

        {/* Tahmini Fiyat */}
        <div className="text-lg font-semibold text-green-400">
          {price ? `₺${price}` : "Fiyat hesaplanıyor..."}
        </div>

        {/* Aksiyon Butonları */}
        <div className="flex justify-between items-center pt-2">
          {/* Satış Linki */}
          {salesLink ? (
            <a
              href={salesLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-sm font-medium rounded-md transition"
            >
              Satışa Git <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          ) : (
            <span className="text-sm text-zinc-500 italic">
              Satış bağlantısı yok
            </span>
          )}

          {/* Görsel İndir */}
          {optimizedImage && (
            <a
              href={optimizedImage}
              download
              className="inline-flex items-center text-sm text-zinc-300 hover:text-white transition"
            >
              <Download className="w-4 h-4 mr-1" />
              Görseli İndir
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
