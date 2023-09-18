<template>
  <div v-if="isChromium" class="wrap-iframe mt-8">
    <div class="flex justify-center items-center">
      <h3 class="">Try with </h3>
      <img class="ml-2" style="height: 38px; width: 38px;"
        src="https://avatars.githubusercontent.com/u/6128107?s=200&v=4" />
      <span class=" ml-q">+</span>
      <img style="height: 45px; width: 45px;"
        src="https://raw.githubusercontent.com/NativeScript/artwork/main/logo/export/NativeScript_Logo_Blue_Transparent.svg" />
      <span class=" mr-2">+</span>
      <img style="height: 30px; width: 30px;"
        src="https://d33wubrfki0l68.cloudfront.net/9a3dab7d5789ca17d6b0b9af993d40a26be9e5b6/a0243/img/theme/docs-logo.svg" />
    </div>
    <iframe class="mt-4"
      src="https://stackblitz.com/edit/nativescrip-use-vue?embed=1&file=src%2Fapp.ts&view=both"></iframe>
  </div>
  <div v-else class=" flex justify-center mb-12">
    <a class="rounded-full text-white bg-ns-vueuse px-3 py-2" target="_blank"
      href="https://stackblitz.com/edit/nativescrip-use-vue?file=src%2Fapp.ts">Playground</a>
  </div>
</template>
<script setup>
import { onBeforeMount, ref } from "vue"

const isChromium = ref(true);
onBeforeMount(() => {
  isChromium.value = !!window.chrome
})
</script>
<style scoped>
.wrap-iframe {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.wrap-iframe iframe {
  width: 100%;
  border: none;
  height: 800px;
  background: #1e1e20;
  border-radius: 16px;
  overflow: none;
}
</style>