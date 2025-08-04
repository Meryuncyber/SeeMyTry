/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind'in hangi dosyalarda CSS sınıflarını arayacağını belirtiyoruz.
  // Bu, üretim derlemesi sırasında gereksiz CSS'i kaldırmak için önemlidir.
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  // Projenin tasarımına özgü renkler, fontlar, boyutlar vb. tanımlamak için kullanılır.
  theme: {
    extend: {
      // Özel bir font ailesi tanımlıyoruz.
      // 'Inter' fontunu index.html dosyasından yüklüyoruz.
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  // Tailwind'e ek işlevsellik katan eklentileri (plugins) tanımlıyoruz.
  plugins: [],
};
