/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./packages/vue/.vitepress/theme/**/*.vue', './packages/vue/.vitepress/theme/*.js'],
  theme: {
    extend: {
      colors: {
        'ns-vueuse': '#21cd80',
      },
    },
  },
  plugins: [],
};
