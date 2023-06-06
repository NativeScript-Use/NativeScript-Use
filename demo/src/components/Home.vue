<script lang="ts" setup>
import {
  $navigateTo,
} from 'nativescript-vue';
import {useColorMode} from "@vallemar/nativescript-vueuse";
import UseElementSize from "~/components/useElementSize.vue";

function onUseElementSize() {
    $navigateTo(UseElementSize)
}


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
      <StackLayout rows="*, auto, auto, *" class="px-4">
        <Label ref="refView" text="" class="light:text-white dark:text-blue-500 dim:text-green-500 cafe:text-yellow-500" />

        <Button @tap="onUseElementSize" text="UseElementSize" class="bg-white mt-12"></Button>
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
