<script setup>
import Source from '../../.vitepress/theme/components/Source.vue'
</script>

# useContentElementSize

Reactive content size of a NativeScript view. 

This function returns the sum of size measurements of the children of the element passed as target.

## Usage

```vue
<script lang="ts" setup>
import { ref } from 'nativescript-vue'
import { useContentElementSize } from '@nativescript-use/vue'

const el = ref();
const { width, fullWidth, // fullWidth: all widths + all margins left|right
  height, fullHeight, // fullHeight: all heights + all margins top|bottom
  marginTop,
  marginBottom,
  marginLeft,
  marginRight } = useContentElementSize(el);
</script>

<template>
  <StackLayout ref="el">
    <Image src="foo.png" class="my-8" />
    <Label :text=`Height ${fullHeight}` />
  </StackLayout>
</template>
```

## Source
<Source source="useContentElementSize" demo="ElementSizeView.vue"/>

## Type declaration
```ts
import { Ref, Readonly } from "nativescript-vue"
import { ViewRef } from "@nativescript-use/vue";
import { CoreTypes, View } from "@nativescript/core";

export declare type ContentSizeDIP = {
    width: CoreTypes.dip;
    fullWidth: CoreTypes.dip;
    height: CoreTypes.dip;
    fullHeight: CoreTypes.dip;
    marginTop: CoreTypes.dip;
    marginBottom: CoreTypes.dip;
    marginLeft: CoreTypes.dip;
    marginRight: CoreTypes.dip;
};
/**
 * Reactive content size of a NativeScript element.
 *
 * @param target
 * @param options
 */
export declare function useContentElementSize(target: View | ViewRef, options?: {
    onChange?: (size: ContentSizeDIP) => void;
    initialSize?: ContentSizeDIP;
}): {
    width: Readonly<Ref<CoreTypes.dip>>;
    fullWidth: Readonly<Ref<CoreTypes.dip>>;
    height: Readonly<Ref<CoreTypes.dip>>;
    fullHeight: Readonly<Ref<CoreTypes.dip>>;
    marginTop: Readonly<Ref<CoreTypes.dip>>;
    marginBottom: Readonly<Ref<CoreTypes.dip>>;
    marginLeft: Readonly<Ref<CoreTypes.dip>>;
    marginRight: Readonly<Ref<CoreTypes.dip>>;
};


```
