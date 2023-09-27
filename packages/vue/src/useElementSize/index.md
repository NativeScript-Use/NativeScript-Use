<script setup>
import Source from '../../.vitepress/theme/components/Source.vue'
</script>

# useElementSize

Reactive size of a NativeScript View.

## Usage

```vue
<script lang="ts" setup>
import { ref } from 'nativescript-vue'
import { useElementSize } from '@nativescript-use/vue'

const el = ref(null);
const { width, height } = useElementSize(el);
</script>

<template>
  <StackLayout ref="el">
    <Label :text=`Height ${height} Width ${width}` />
  </StackLayout>
</template>
```

## Source
<Source source="useElementSize" demo="ElementSizeView.vue"/>

## Type declaration
```ts
import { Ref } from "nativescript-vue"
import { ViewRef } from "@nativescript-use/vue";
import { CoreTypes, View } from "@nativescript/core";

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
export declare function useElementSize(target: View | ViewRef, options?: {
    onChange?: (size: SizeDIP) => void;
    initialSize?: SizeDIP;
}): {
    width: Ref<CoreTypes.dip>;
    height: Ref<CoreTypes.dip>;
};

```
