import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vite geliştirme sunucusunun ayarları
  server: {
    host: '0.0.0.0', // Yerel ağınızdaki diğer cihazlardan erişim için
    port: 3000,
  },
  // Üretim derlemesi (build) ayarları
  build: {
    outDir: 'dist', // Derlenmiş dosyaların çıkacağı klasör
    sourcemap: true, // Hata ayıklama için kaynak haritaları oluştur
  },
  // PWA (Progressive Web App) ayarları
  // Gerçek bir PWA için, bu kısımda Vite PWA eklentisi kullanılabilir.
  // Şu anki durumda, main.jsx dosyasından service worker'ı manuel olarak kaydediyoruz.
  // Bu nedenle, Vite'ın PWA eklentisini kurmaya gerek yoktur.
  // publicDir: 'public', // Genel statik dosyaların bulunduğu dizin
  // assetsInclude: ['**/*.json'], // Varsa model dosyaları gibi ekstra varlıkları dahil etme
});
