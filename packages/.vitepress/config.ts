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
      { text: 'Functions', link: '/core/useColorMode/index.md' }
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
          { text: 'useColorMode', link: '/core/useColorMode/index.md' },
          { text: 'useElementSize', link: '/core/useElementSize/index.md' },
          { text: 'useStorage', link: '/core/useStorage/index.md' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vallemar/NativeScriptVueUse' }
    ]
  }
})
