/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./packages/nativescript-vueuse/.vitepress/theme/**/*.vue', './packages/nativescript-vueuse/.vitepress/theme/*.js'],
  theme: {
    extend: {
      colors: {
        'ns-vueuse': '#21cd80',
      },
    },
  },
  plugins: [],
};
