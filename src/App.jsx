// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ImageUploader from "./components/ImageUploader";
import ProductRecognition from "./components/ProductRecognition";
import DescriptionGenerator from "./components/DescriptionGenerator";
import PriceEstimator from "./components/PriceEstimator";
import SalesLink from "./components/SalesLink";
import OptimizedImage from "./components/OptimizedImage";
import ResultCard from "./components/ResultCard";

import "./styles/index.css";

function App() {
  return (
    <Router>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-white">
            🧠 Micro Ticaret Botu
          </h1>

          {/* Yükleme Adımı */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-200 mb-2">
              1. Ürün Görselini Yükle
            </h2>
            <ImageUploader />
          </section>

          {/* Görsel Tanıma */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-200 mb-2">
              2. Ürünü Tanımla
            </h2>
            <ProductRecognition />
          </section>

          {/* Açıklama Oluşturma */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-200 mb-2">
              3. Akıllı Açıklama Önerisi
            </h2>
            <DescriptionGenerator />
          </section>

          {/* Fiyat Tahmini */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-200 mb-2">
              4. Yapay Zekâ ile Fiyat Tahmini
            </h2>
            <PriceEstimator />
          </section>

          {/* Optimizasyon */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-200 mb-2">
              5. Görsel Optimizasyonu
            </h2>
            <OptimizedImage />
          </section>

          {/* Satış Linki */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-200 mb-2">
              6. Satış Linki Oluştur
            </h2>
            <SalesLink />
          </section>

          {/* Özet Kart */}
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-gray-200 mb-2">
              Ürün Özeti
            </h2>
            <ResultCard />
          </section>
        </div>
      </Layout>
    </Router>
  );
}

export default App;
