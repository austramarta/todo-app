const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        green: {
          100: '#9ba679',
          200: '#cedf99',
        },
        rose: {
          100: '#e5456e',
          200: '#f6ced8',
        },
      }
    },
    fontFamily: {
      title: ['Fjalla One', 'sans-serif'],
      body: ['Lato', 'sans-serif'],
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
