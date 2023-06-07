<script lang="ts" setup>
import {
  $navigateTo,
} from 'nativescript-vue';
import ElementSizeView from "~/components/ElementSizeView.vue";
import ColorModeView from "~/components/ColorModeView.vue";


function onUseElementSize() {
    $navigateTo(ElementSizeView)
}
function onUseColorMode() {
  $navigateTo(ColorModeView)
}

</script>

<template>
  <Frame backgroundColor="transparent" >
    <Page>
      <StackLayout rows="*, auto, auto, *" class="px-4">
        <Label ref="refView" text="" class="light:text-white dark:text-blue-500 dim:text-green-500 cafe:text-yellow-500" />

        <Button @tap="onUseElementSize" text="UseElementSize" class="bg-white mt-12"></Button>
        <Button @tap="onUseColorMode" text="UseColorMode" class="bg-white mt-12"></Button>
      </StackLayout>
    </Page>
  </Frame>
</template>

<style>
/* .info {
    font-size: 20;
  } */
</style>
