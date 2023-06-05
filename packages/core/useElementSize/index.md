---
category: Elements
---

# useElementSize

Reactive size of an NativeScript View.

## Usage

```vue
<template>
  <StackLayout ref="el">
    <Label :text=`Height ${height} Width ${width}` />
  </StackLayout>
</template>

<script lang="ts" setup>
import { ref } from 'nativescript-vue'
import { useElementSize } from 'vallemar/nativescriptvueuse'

const el = ref(null);
const { width, height } = useElementSize(el);
</script>
```
