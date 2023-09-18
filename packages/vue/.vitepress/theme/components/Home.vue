<template>
  <balls filter="blur(50px) opacity(0.2)" style="z-index: -1"></balls>
  <Preview />
  <HomeContributors class="mt-16" />
  <Sponsors class=" mt-16" />
</template>

<script setup>
import Preview from './Preview.vue'
import HomeContributors from './HomeContributors.vue'
import Sponsors from './Sponsors.vue'
import balls from './balls.vue'

</script>
