/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        character: '#111111',
        background: '#FFFFFF',
        myRed: '#E60023'
      }
    }
  },
  plugins: []
}
