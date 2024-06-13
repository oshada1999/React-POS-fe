/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Lex:['Lexend'],
        Poppins:['Poppins'],
        Zet:['Lexend Zetta'],
        Nunito:['Nunito'],
        Euclid:['Euclid Circular A']
      },
      dropShadow: {
        '3': 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        '4': 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      }
    },
  },
  plugins: [],
}