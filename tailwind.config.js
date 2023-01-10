/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{php,js}"
  ],
  theme: {
    extend:{
      width: {
        '20%': '20%',
      },
      gridTemplateRows: {
        'row-4': 'repeat(4, minmax(0, 50vh))',
      },
      fontFamily: {
        mont: "'Montserrat', sans-serif",
      },
    },
  },
  plugins: [],
}
