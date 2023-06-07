import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "NativeScriptVueUse",
  description: "Collection of NativeScript-Vue3 Composition Utilities",
  themeConfig: {
    logo: "https://art.nativescript-vue.org/NativeScript-Vue-Green-White.svg",

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get Started', link: '/started' },
      { text: 'Functions', link: '/core/unrefView/index.md' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Get Started', link: '/started' },
        ]
      },
      {
        text: 'Functions',
        items: [
          { text: 'unrefView', link: '/core/unrefView/index.md' },
          { text: 'useColorMode', link: '/core/useColorMode/index.md' },
          { text: 'useElementSize', link: '/core/useElementSize/index.md' },
          { text: 'useEventListener', link: '/core/useEventListener/index.md' },
          { text: 'useRootLayout', link: '/core/useRootLayout/index.md' },
          { text: 'useStorage', link: '/core/useStorage/index.md' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vallemar/NativeScriptVueUse' },
      //{ icon: { svg: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg'}, link: 'https://www.npmjs.com/package/@vallemar/nativescript-vueuse' }
    ]
  }
})
