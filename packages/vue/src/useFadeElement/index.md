<script setup>
import Source from '../../.vitepress/theme/components/Source.vue'
</script>

# useFadeElement

Change opacity and visibility with animation of a NativeScript element.

## Usage

```vue
<script lang="ts" setup>
const targetViewRef = ref()
const { isVisible, show, hide, toggle } = useFadeElement(targetViewRef)

const change = () => {
  isVisible.value = !isVisible.value; // 👈 Reactive fade status
  show() // 👈 Use this if you need a promise to do something when the animation ends
  hide() // 👈 Use this if you need a promise to do something when the animation ends
  toggle() // 👈 Async and util
}

</script>

<template>
  <Page>
    <GridLayout>
       <StackLayout ref="targetViewRef" height="100%" class="bg-[#20202044]"></StackLayout>
    </GridLayout>
  </Page>
</template>
```

## Source
<Source source="useFadeElement"/>

## Type declaration
```ts
import { CoreTypes } from '@nativescript/core';
import { Ref } from "nativescript-vue"
import { ViewRef } from "@nativescript-use/vue";
/**
 * Change opacity and visibility with animation of a NativeScript element.
 *
 * @param target
 * @param options
 */
export declare function useFadeElement(target: ViewRef, options: {
    initial?: {
        opacity: number;
        visibility: CoreTypes.VisibilityType;
    };
    animationDuration?: number;
}): {
    isVisible: Ref<boolean>;
    show: () => Promise<void>;
    hide: () => Promise<void>;
    toggle: () => Promise<void>;
};

```