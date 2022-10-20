/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp'), require('daisyui')],
  daisyui: {
    themes: [
      {
        emerald: {
          ...require('daisyui/src/colors/themes')['[data-theme=emerald]'],
          'base-100': '#f8fafc',
        },
      },
    ],
  },
};
