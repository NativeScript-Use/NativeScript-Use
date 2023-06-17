# useScreenOrientation

Reactive screen orientation and utilities to manage the orientation.

## Usage

```vue
<script lang="ts" setup>
import { useScreenOrientation } from '@nativescript-use/vue';

const {
  orientation,
  setOrientation,
  enableRotation,
  disableRotation
} = useScreenOrientation({
  onChange: (orientation) => {
    console.log("useScreenOrientation onChange " + orientation);
  }
})

</script>

<template>
  <Page actionBarHidden="true">
    <ScrollView>
      <StackLayout class="p-3">
        <Label class="text-center text-2xl">ScreenOrientation {{ orientation }}</Label>
        <Button @tap="setOrientation('portrait')" class="mx-1 mt-8" text="Set portrait"></Button>
        <Button @tap="setOrientation('landscape')" class="mx-1 mt-8" text="Set landscape"></Button>
        <Button @tap="setOrientation('landscapeleft')" class="mx-1 mt-8" text="Set landscapeleft"></Button>
        <Button @tap="setOrientation('landscaperight')" class="mx-1 mt-8" text="Set landscaperight"></Button>
        <Button @tap="enableRotation" class="mx-1 mt-8" text="Enable rotation"></Button>
        <Button @tap="disableRotation" class="mx-1 mt-8" text="Disable rotation"></Button>
      </StackLayout>
    </ScrollView>
  </Page>
</template>
```
<br />

## Type declaration
```ts
import { Ref } from "nativescript-vue"
import { CoreTypes } from "@nativescript/core";

/**
 * Reactive screen orientation and utilities to manage the orientation.
 *
 * @param target
 * @param options
 */
export declare function useScreenOrientation(options?: {
    onChange?: (orientation: CoreTypes.DeviceOrientationType) => void;
}): {
    orientation: Readonly<Ref<CoreTypes.DeviceOrientationType>>;
    setOrientation: (value: "portrait" | "landscape" | "landscaperight" | "landscapeleft", animation?: boolean) => void;
    enableRotation: () => void;
    disableRotation: () => void;
};

```
