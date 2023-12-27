<template>
  <div class="flex justify-center">
    <iframe width="100%" height="500" :src="src">
    </iframe>
  </div>
</template>

<script setup lang="ts">

const { src } = defineProps({
  src: String
})

</script>
