/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html",],
  theme: {
    extend: {
      fontFamily: {
        geist: ['Geist', 'sans-serif']
      },
      colors: {
        'bf-bg': '#FAFAFA',
        'bf-primary': '#005596',
      }
    },
  },
  plugins: [],
}

