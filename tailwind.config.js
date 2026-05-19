/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0d1526',
          900: '#131b2e',
          800: '#1a2340',
          700: '#222a3d',
          600: '#2d3650',
          500: '#384060',
        },
        accent: {
          DEFAULT: '#98cbff',
          dark: '#003354',
          hover: '#7ab8f5',
        },
        'text-primary': '#dae2fd',
        'text-secondary': '#c1c6d7',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderColor: {
        DEFAULT: 'rgba(65, 71, 85, 0.2)',
      },
    },
  },
  plugins: [],
}
