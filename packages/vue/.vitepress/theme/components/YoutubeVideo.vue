<template>
  <div class="flex justify-center">
    <iframe width="420" height="345" :src="src">
    </iframe>
  </div>
</template>

<script setup lang="ts">

const { src } = defineProps({
  src: String
})

</script>
