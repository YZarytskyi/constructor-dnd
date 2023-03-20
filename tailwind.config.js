/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      md: '768px',
      xl: '1440px',
    },
    extend: {
      boxShadow: {
        'input': '0px 64px 64px rgba(211, 214, 215, 0.2), 0px 32px 32px rgba(211, 214, 215, 0.2), 0px 16px 16px rgba(211, 214, 215, 0.2), 0px 4px 4px rgba(211, 214, 215, 0.2), 0px 2px 2px rgba(211, 214, 215, 0.2)',
      }
    },
  },
  plugins: [],
}
