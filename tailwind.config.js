// tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class', // Kullanıcı tercihlerine göre otomatik koyu/aydınlık tema
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#D1FAE5',
          DEFAULT: '#10B981', // Yeşil: güven, satış, kazanç
          dark: '#064E3B',
        },
        accent: {
          DEFAULT: '#F59E0B', // Sarı: dikkat, işlem, dönüşüm
        },
        background: {
          light: '#F9FAFB',
          dark: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace'],
      },
      spacing: {
        'header': '4.5rem',
        'footer': '3.5rem',
      },
      boxShadow: {
        card: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.brand.DEFAULT'),
              '&:hover': {
                color: theme('colors.brand.dark'),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.accent.DEFAULT'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.text-shadow': {
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
        },
      })
    }),
  ],
            }
