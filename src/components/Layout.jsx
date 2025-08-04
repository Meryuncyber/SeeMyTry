import React from 'react';
import { FaRobot } from 'react-icons/fa';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-8">
      {/* Uygulamanın Başlık Alanı */}
      <header className="w-full max-w-4xl text-center py-6">
        <div className="flex items-center justify-center space-x-3 text-indigo-400">
          <FaRobot className="text-4xl sm:text-5xl" />
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Mikro Ticaret Botu
          </h1>
        </div>
        <p className="mt-2 text-lg text-gray-400">
          Fotoğrafını yükle, gerisini o halletsin.
        </p>
      </header>

      {/* Ana İçerik Alanı */}
      <main className="w-full max-w-4xl flex-grow">
        {children}
      </main>

      {/* Uygulamanın Alt Bilgi Alanı */}
      <footer className="w-full max-w-4xl text-center mt-8 py-4 border-t border-gray-700 text-gray-500 text-sm">
        <p>&copy; 2024 Mikro Ticaret Botu. Tüm hakları saklıdır.</p>
        <p className="mt-1">Bu proje bir eğitim çalışmasıdır.</p>
      </footer>
    </div>
  );
};

export default Layout;
