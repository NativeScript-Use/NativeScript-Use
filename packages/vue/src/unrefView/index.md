<script setup>
import Source from '../../.vitepress/theme/components/Source.vue'
</script>

# unrefView

Extract a NativeScript view from a Ref

## Usage

```vue
<script lang="ts" setup>
import { onMounted, ref} from 'nativescript-vue'
import { unrefView } from '@nativescript-use/vue'

const el = ref();

onMounted(() =>{
  const view = unrefView(el);
})
</script>

<template>
  <StackLayout ref="el">
  </StackLayout>
</template>
```

## Source
<Source source="unrefView"/>

## Type declaration
```ts
import { View } from "@nativescript/core";
import { ViewRef } from "@nativescript-use/vue";
/**
 * Utility. Get View from Ref.
 *
 * @param target
 */
export declare function unrefView<T = View>(target: T | ViewRef<T>): T | undefined;
```

