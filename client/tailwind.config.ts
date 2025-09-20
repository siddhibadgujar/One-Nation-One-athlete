import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef9ff',
          100: '#d8f0ff',
          200: '#b6e4ff',
          300: '#84d2ff',
          400: '#47b6ff',
          500: '#1e99ff',
          600: '#0877e5',
          700: '#065fba',
          800: '#084f96',
          900: '#0a417a'
        }
      }
    }
  },
  plugins: []
} satisfies Config;
