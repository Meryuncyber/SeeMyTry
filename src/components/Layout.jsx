// src/components/Layout.jsx
import React from "react";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white font-sans selection:bg-pink-600 selection:text-white">
      {/* Metadata */}
      <Helmet>
        <title>MicroTicaret | Görselden Satışa AI Destekli Çözüm</title>
        <meta name="description" content="Bir görsel yükleyin, AI destekli sistem ürünü tanımlasın, açıklama ve fiyat oluştursun, size özel satış linkini anında versin." />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      {/* Üst Bar */}
      <header className="sticky top-0 z-30 bg-gray-900/80 backdrop-blur-md shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-pink-500">MicroTicaret</h1>
          <a href="#how-it-works" className="text-sm text-gray-300 hover:text-white transition">Nasıl Çalışır?</a>
        </div>
      </header>

      {/* İçerik */}
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Alt Bilgi */}
      <footer className="w-full border-t border-gray-700 py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} MicroTicaret. Tüm hakları saklıdır.
      </footer>

      {/* Global Toast / Bildirim */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #4b5563",
          },
        }}
      />
    </div>
  );
};

export default Layout;
