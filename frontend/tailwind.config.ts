import { defineConfig } from 'tailwindcss/resolveConfig'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'book-yellow': '#f5d884',
        'book-dark-yellow': '#e8c855',
      },
      fontFamily: {
        'serif': ['Georgia', 'Garamond', 'serif'],
      }
    },
  },
  plugins: [],
}
