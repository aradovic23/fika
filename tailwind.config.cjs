/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        martinique: {
          50: '#f2f5f7',
          100: '#e6ebf0',
          200: '#bfc9d6',
          300: '#9da8bd',
          400: '#626c8c',
          500: '#323658',
          600: '#2a2e52',
          700: '#1d2042',
          800: '#121536',
          900: '#0b0d29',
          950: '#04061a',
        },
      },
    },
  },
};
