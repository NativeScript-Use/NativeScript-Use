
# unrefView

Extract a NativeScript view from a Ref

## Usage

```vue

<template>
  <StackLayout ref="el">
  </StackLayout>
</template>

<script lang="ts" setup>
import { onMounted, ref} from 'nativescript-vue'
import { unrefView } from '@vallemar/nativescript-vueuse'

const el = ref();

onMounted(() =>{
  const view = unrefView(el);
})

</script>
```
<br />

## Type declaration
```ts
import { View } from "@nativescript/core";
import { ViewRef } from "@vallemar/nativescript-vueuse";
/**
 * Utility. Get View from Ref.
 *
 * @param target
 */
export declare function unrefView<T = View>(target: ViewRef<T>): T | undefined;
```
