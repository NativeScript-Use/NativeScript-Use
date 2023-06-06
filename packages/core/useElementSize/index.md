---
category: Elements
---

# useElementSize

Reactive size of a NativeScript View.

## Usage

```vue
<template>
  <StackLayout ref="el">
    <Label :text=`Height ${height} Width ${width}` />
  </StackLayout>
</template>

<script lang="ts" setup>
import { ref } from 'nativescript-vue'
import { useElementSize } from '@vallemar/nativescript-vueuse'

const el = ref(null);
const { width, height } = useElementSize(el);
</script>
```
<br />

## Type declaration
```ts
import { Size, View } from "@nativescript/core";
import { Ref } from "nativescript-vue";
/**
 * Reactive size of an NativeScript element.
 *
 * @see
 * @param target
 * @param options
 */
export declare function useElementSize<T extends View>(target: Ref<{
    nativeView: T;
}>, options?: {
    onChange?: (size: Size) => void;
    initialSize?: Size;
}): {
    width: Ref<number>;
    height: Ref<number>;
};

```
