import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import { loadModel } from './services/imageRecognitionService';

// PWA servis çalışanını kaydetme
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service worker başarıyla kaydedildi.');
    } catch (error) {
      console.error('Service worker kaydı başarısız oldu:', error);
    }
  }
};

// Uygulamayı başlatacak ana fonksiyon
const startApp = async () => {
  // Makine öğrenimi modelini önceden yükle
  // Bu işlem, uygulamanın diğer kısımları yüklenirken arka planda çalışabilir.
  try {
    await loadModel();
    console.log("Makine öğrenimi modeli başarıyla yüklendi.");
  } catch (error) {
    console.error("Model yüklenirken bir sorun oluştu:", error);
  }

  // PWA servis çalışanını kaydet
  registerServiceWorker();

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Uygulamayı başlat
startApp();
