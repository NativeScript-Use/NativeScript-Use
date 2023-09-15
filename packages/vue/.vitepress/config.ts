import { defineConfig } from 'vitepress';

const logo = 'https://art.nativescript-vue.org/NativeScript-Vue-Green-White.svg';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    /*    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "https://nativescript-vue.org/apple-touch-icon.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "https://nativescript-vue.org/favicon-32x32.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "https://nativescript-vue.org/favicon-16x16.png"}],
    */
    ['link', { rel: 'icon', type: 'image/svg', sizes: '32x32', href: logo }],
    [
      'script',
      {
        async: 'true',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-RV37C0FX94',
      },
    ],
    ['script', {}, "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-RV37C0FX94');"],
  ],
  title: 'NativeScriptVueUse',
  description: 'Collection of NativeScript-Vue3 Composition Utilities',
  themeConfig: {
    logo,
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get Started', link: '/started' },
      { text: 'Functions', link: '/src/unrefView/index.md' },
      { text: 'Playground', link: 'https://stackblitz.com/edit/nativescrip-use-vue?file=src%2Fapp.ts' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [{ text: 'Get Started', link: '/started' }],
      },
      {
        text: 'Functions',
        items: [
          { text: 'unrefView', link: '/src/unrefView/index.md' },
          { text: 'useBreakpoints', link: '/src/useBreakpoints/index.md' },
          { text: 'useClipboard', link: '/src/useClipboard/index.md' },
          { text: 'useColorMode', link: '/src/useColorMode/index.md' },
          { text: 'useColorPalette', link: '/src/useColorPalette/index.md' },
          { text: 'useContentElementSize', link: '/src/useContentElementSize/index.md' },
          { text: 'useDark', link: '/src/useDark/index.md' },
          { text: 'useElementSize', link: '/src/useElementSize/index.md' },
          { text: 'useEventListener', link: '/src/useEventListener/index.md' },
          { text: 'useKeyboard', link: '/src/useKeyboard/index.md' },
          { text: 'useMediaQuery', link: '/src/useMediaQuery/index.md' },
          { text: 'useRootLayout', link: '/src/useRootLayout/index.md' },
          { text: 'useScreenOrientation', link: '/src/useScreenOrientation/index.md' },
          { text: 'useStorage', link: '/src/useStorage/index.md' },
        ],
      },
      {
        text: 'Global hooks',
        items: [{ text: 'onApplicationMounted', link: '/src/onApplicationMounted/index.md' }],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/NativeScript-Use/NativeScript-Use' },
      { icon: 'discord', link: 'https://discord.com/invite/RgmpGky9GR' },
      //{ icon: { svg: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg'}, link: 'https://www.npmjs.com/package/@vallemar/nativescript-vueuse' }
    ],
    search: {
      provider: 'local',
    },
  },
});
