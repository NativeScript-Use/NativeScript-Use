<script lang="ts" setup>
import { ref } from "nativescript-vue";
import { useElementSize, unrefView } from "@vallemar/nativescript-vueuse";

const refView = ref()
const { width, height } = useElementSize(refView);

function changeSize() {
  const view = unrefView(refView);
  view.animate({
    height: view.getActualSize().height === 400 ? 150 : 400,
    duration: 2000
  })
}
</script>

<template>
  <Page actionBarHidden="true">
    <StackLayout  class="p-4">
      <StackLayout ref="refView" class="bg-gray-300 rounded-2xl p-3 text-center">
        <Label :text="`Width: ${width}`" />
        <Label :text="`Height: ${height}`"  />
      </StackLayout>

      <Button @tap="changeSize" text="Change size" class="bg-white mt-12"></Button>
    </StackLayout>
  </Page>
</template>
