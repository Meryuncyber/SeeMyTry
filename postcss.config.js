const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    require('postcss-import'),                     // @import desteği
    require('tailwindcss')('./tailwind.config.js'), // Tailwind konfigürasyonu
    require('postcss-nesting'),                    // Nesting desteği (SCSS benzeri yapı)
    require('autoprefixer'),                       // Tüm tarayıcılara uyum
    ...(isProduction
      ? [
          require('cssnano')({                     // Prod modda CSS minify
            preset: 'default',
          }),
        ]
      : []),
  ],
};
