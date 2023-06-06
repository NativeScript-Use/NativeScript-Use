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
/**
 * Reactive size of a NativeScript element.
 *
 * @param target
 * @param options
 */
declare function useElementSize<T extends View>(target: ViewRef, options?: {
    onChange?: (size: Size) => void;
    initialSize?: Size;
}): {
    width: Ref<number>;
    height: Ref<number>;
};
```
