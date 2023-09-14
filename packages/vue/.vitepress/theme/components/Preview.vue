<template>
  <div v-if="isChromium" class="wrap-iframe">
    <iframe src="https://stackblitz.com/edit/nativescrip-use-vue?embed=1&file=src%2Fapp.ts&view=both"></iframe>
  </div>
  <div v-else class=" flex justify-center mb-12">
    <a class="rounded-full bg-ns-vueuse px-3 py-2" target="_blank"
      href="https://stackblitz.com/edit/nativescrip-use-vue?file=src%2Fapp.ts">Playground</a>
  </div>
</template>
<script setup>
import { onBeforeMount, ref } from "vue"

const isChromium = ref(true);
onBeforeMount(() =>{
  isChromium.value = !!window.chrome
})
</script>
<style scoped>
.wrap-iframe {
  width: 80%;
  display: flex;
  justify-content: center;
  margin: auto;
}

.wrap-iframe iframe {
  width: 100%;
  border: none;
  height: 800px;
  background: #1e1e20;
}
</style>