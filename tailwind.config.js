/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html",],
  theme: {
    extend: {
      fontFamily: {
        geist: ['Geist', 'NotoSans', 'sans-serif']
      },
      colors: {
        'bf-bg': '#FAFAFA',
        'bf-primary': '#005596',
        'bf-grey': '#52525B',
        'bf-light-grey': '#F4F4F5',
        'bf-light-blue': '#E6EEF5'
      },
      backgroundImage: {
        'hero': "url('/assets/img/main_bg.png')"
      },
      screens: {
        'mob': {
          max: '899px'
        },
        'desk': '900px'
      }
    },
  },
  plugins: [],
}

