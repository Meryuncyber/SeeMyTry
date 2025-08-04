import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path'; // `path` modülünü import ediyoruz

export default defineConfig({
  plugins: [react()],
  base: '/mtbot/',
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  // Bu bölümü ekliyoruz:
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  publicDir: 'src/models', // Model dosyalarını public dizini olarak belirtiyoruz.
});
