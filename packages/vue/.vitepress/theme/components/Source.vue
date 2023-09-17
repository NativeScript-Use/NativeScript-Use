<template>
  <div class="flex items-center justify-start">
    <a target="_blank" class="cursor-pointer" :href="sourceURL">Source</a>
    <div v-if="demoURL">
      <span class="mx-2">•</span>
      <a target="_blank" class=" cursor-pointer" :href="demoURL">Demo</a>
    </div>
  </div>
</template>

<script setup lang="ts">

const { source, demo } = defineProps({
  source: String, demo: String
})

//@ts-ignore
const sourceURL = BASE_BLOB_SOURCE + source + "/index.ts";
//@ts-ignore
const demoURL = demo ? STACKBLITZ_VIEW + demo : null;

</script>
