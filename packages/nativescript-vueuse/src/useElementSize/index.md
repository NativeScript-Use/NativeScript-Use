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
import { Ref } from "nativescript-vue"
import { ViewRef } from "@vallemar/nativescript-vueuse";
import { CoreTypes } from "@nativescript/core/core-types";

export type SizeDIP = {
    width: CoreTypes.dip;
    height: CoreTypes.dip;
};
/**
 * Reactive size of a NativeScript element.
 *
 * @param target
 * @param options
 */
export declare function useElementSize(target: ViewRef, options?: {
    onChange?: (size: SizeDIP) => void;
    initialSize?: SizeDIP;
}): {
    width: Ref<CoreTypes.dip>;
    height: Ref<CoreTypes.dip>;
};

```
