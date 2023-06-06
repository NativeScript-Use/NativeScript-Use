
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
/**
 * Utility. Get View from Ref.
 *
 * @param target
 */
declare function unrefView<T extends View>(target: ViewRef): View | undefined;
```
