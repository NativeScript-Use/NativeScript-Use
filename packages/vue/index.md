---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "@NativeScrip-Use/Vue"
  text: "Collection of NativeScript-Vue3 Composition Utilities"
  image: https://art.nativescript-vue.org/misc/phone.svg
  actions:
    - theme: brand
      text: Get Started
      link: /started
    - theme: alt
      text: Functions
      link: /src/unrefView/index.md

---

<Home />


<script setup>
import Home from './.vitepress/theme/components/Home.vue'

</script>
<style>
@media (min-width: 420px) {
  .main .name {
      white-space: nowrap;
      overflow: visible;
  }
}
</style>