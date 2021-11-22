module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'green-tag': '#49FF00',
        'red-tag':"#FF0000"
      }  
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
