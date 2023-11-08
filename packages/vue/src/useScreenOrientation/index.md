<script setup>
import Source from '../../.vitepress/theme/components/Source.vue'
</script>

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

## Usage in app.ts or MainComponent.vue
If need to block or enable orientation in your app.ts or your main component must wait for the application to be completely mounted, the following code solves the problem

```ts
import { onApplicationMounted, useScreenOrientation } from '@nativescript-use/vue';

const {
  setOrientation,
  enableRotation,
  disableRotation
} = useScreenOrientation();

onApplicationMounted(() => {
  setOrientation("landscape");
  disableRotation();
})
```

## Source
<Source source="useScreenOrientation" demo="ScreenOrientationView.vue"/>

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

## Core dependency
[@nativescript-use/nativescript-orientation](https://github.com/NativeScript-Use/NativeScript-Use/tree/main/packages/nativescript-orientation)