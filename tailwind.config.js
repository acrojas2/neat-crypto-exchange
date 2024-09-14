/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'default-bg-color': '#EFF3FD',
        'default-neat-text-color': '#151F6D',
        'primary-neat-blue': {
          '50': '#eff4ff',
          '100': '#dce7fd',
          '200': '#c1d5fc',
          '300': '#96bcfa',
          '400': '#6497f6',
          '500': '#3369f0',
          '600': '#2a53e6',
          '700': '#223fd3',
          '800': '#2235ab',
          '900': '#213187',
          '950': '#192152',
          },
        'neat-red': {
          '50': '#fff2f1',
          '100': '#ffe1e0',
          '200': '#ffc9c7',
          '300': '#ffa4a0',
          '400': '#ff6f69',
          '500': '#f9423a',
          '600': '#e7241b',
          '700': '#c21a13',
          '800': '#a01a14',
          '900': '#851c17',
          '950': '#480a07',
        },
        'neat-rose': {
          '50': '#fdf2f8',
          '100': '#fce7f2',
          '200': '#fccee6',
          '300': '#fba6d1',
          '400': '#f76fb1',
          '500': '#f04e98',
          '600': '#df2370',
          '700': '#c11556',
          '800': '#a01447',
          '900': '#85163f',
          '950': '#510621',
        },
      }
    },
  },
  plugins: [],
}
