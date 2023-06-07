<template>
  <div v-if="isChromium" class="wrap-iframe">
    <iframe src="https://stackblitz.com/edit/nativescript-vueuse-demo?embed=1&file=src%2Fapp.ts&view=both"></iframe>
  </div>
</template>
<script setup>
var isChromium = !!window.chrome;
</script>
<style scoped>
.wrap-iframe{
  width: 80%;
  display: flex;
  justify-content: center;
  margin: auto;
}
.wrap-iframe iframe{
  width: 100%;
  border: none;
  height: 800px;
  background: #1e1e20;
}
</style>