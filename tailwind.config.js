const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        green: {
          100: '#6BA17B',
          200: '#cedf99',
        },
        rose: {
          100: '#E04325',
          200: '#f6ced8',
        },
        drkgreen: {
          100: '#2A4E36'
        },
        grey: {
          100: '#F7F7F7',
          200: '#CFD8DB',
          300: '#91A4AA',
        },
        blue: {
          100: '#79D3E0',
          200: '#101E2B',
        }
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
