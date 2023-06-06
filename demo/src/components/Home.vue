<script lang="ts" setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  $navigateTo,
} from 'nativescript-vue';
import Details from './Details.vue';
import {useColorMode, useElementSize} from "@vallemar/nativescript-vueuse";

const refView = ref()
const { width, height } = useElementSize(refView);


const { store } = useColorMode({
  modes: ["cafe"], onChanged: (mode) => {
    console.log("onChanged: " + mode);
  }
})

function changeTheme() {
  console.log();
  console.log("Change");

  store.value = store.value === "cafe" ? "light" : "cafe"
}
</script>

<template>
  <Frame>
    <Page>
      <ActionBar>
        <Label text="Home" class="font-bold text-lg" />
      </ActionBar>

      <StackLayout rows="*, auto, auto, *" class="px-4">
        <Label ref="refView" :text="`${width} ${height}`" class="light:text-white dark:text-blue-500 dim:text-green-500 cafe:text-yellow-500" />
        <Button @tap="changeTheme" text="Change Theme" class="bg-white mt-12"></Button>

      </StackLayout>
    </Page>
  </Frame>
</template>

<style>
/* .info {
    font-size: 20;
  } */
</style>
