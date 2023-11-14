<script setup>
import Source from '../../.vitepress/theme/components/Source.vue'
</script>

# refView

Utility typed Ref of NativeScript View.

## Usage

```vue
<script lang="ts" setup>
import type { StackLayout } from '@nativescript/core';
import { onMounted } from 'nativescript-vue'
import { refView } from '@nativescript-use/vue'

const elRef = refView(); // <-- `.value` Typed as View

// OR

const elRef = refView<StackLayout>(); // <-- `.value` Typed as StackLayout

onMounted(() => {
  elRef.value // <-- `.value` is typed as View or your typed 
})
</script>

<template>
  <StackLayout ref="elRef">
  </StackLayout>
</template>
```

## Source
<Source source="refView"/>

## Type declaration
```ts
import type { View } from '@nativescript/core';
import { Ref } from 'nativescript-vue';

/**
 * Utility. Typed Ref of View.
 */
export declare function refView<T = View>(): Ref<T>;
```

