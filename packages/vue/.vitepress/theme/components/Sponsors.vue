<template>
  <div class="flex justify-center items-center flex-col">
    <h3>Sponsors</h3>
    <div class="mt-4">
      <Sponsor v-for="(sponsor, i) in sponsors" :key="i" :name="sponsor.name" :avatar="sponsor.avatar" :github="sponsor.github"></Sponsor>
    </div>
    <div class="flex justify-center mb-12">
      <a class="rounded-full !text-white font-bold bg-ns-vueuse px-3 py-1 mt-4" target="_blank" href="https://github.com/sponsors/vallemar">Start Sponsor</a>
    </div>
  </div>
</template>
<script setup>
import Sponsor from './Sponsor.vue';
const sponsors = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/5060049?s=52&v=4',
    name: 'cemarta7',
    github: 'https://github.com/cemarta7',
  },
];
</script>
