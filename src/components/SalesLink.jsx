import React, { useState } from 'react';
import { Copy, Check, QrCode } from 'lucide-react';
import QRCode from 'qrcode.react';

const SalesLink = ({ productId, productName }) => {
  const baseUrl = 'https://yourdomain.com/p/';
  const link = `${baseUrl}${productId}`;
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleQR = () => {
    setShowQR(!showQR);
  };

  return (
    <div className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl p-4 shadow-lg transition-all">
      <h2 className="text-xl font-semibold text-white mb-2">Satış Linkin Hazır 🎯</h2>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 bg-zinc-800 text-zinc-200 px-3 py-2 rounded-lg truncate">
          {link}
        </div>

        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <button
            onClick={handleCopy}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-3 py-2 rounded-lg flex items-center gap-1 text-sm"
          >
            {copied ? (
              <>
                <Check size={16} /> Kopyalandı
              </>
            ) : (
              <>
                <Copy size={16} /> Kopyala
              </>
            )}
          </button>

          <button
            onClick={toggleQR}
            className="bg-zinc-700 hover:bg-zinc-600 transition text-white px-3 py-2 rounded-lg flex items-center gap-1 text-sm"
          >
            <QrCode size={16} />
            QR
          </button>
        </div>
      </div>

      {showQR && (
        <div className="mt-4 p-4 bg-white rounded-xl flex flex-col items-center shadow-inner">
          <QRCode value={link} size={128} />
          <span className="text-sm text-zinc-700 mt-2">{productName || 'Ürün'}</span>
        </div>
      )}
    </div>
  );
};

export default SalesLink;
