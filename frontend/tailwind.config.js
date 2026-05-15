/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        onae: {
          black:   '#1A1A1A',
          offwhite:'#F5F2ED',
          red:     '#DE3B2B',
          navy:    '#194688',
          blue:    '#34A0E7',
          white:   '#FFFFFF',
          gray:    '#999999',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        redhat:  ['Red Hat Display', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
