<script setup>
import Source from '../../.vitepress/theme/components/Source.vue'
</script>

# useIntersectionObserver

Reactive detects that a target element visibility.

Tracks a view inside a `ScrollView` and notifies when the view is visible on the screen.

## Usage

```vue
<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import { useIntersectionObserver } from '@nativescript-use/vue';

const scrollRef = ref();
const viewRef = ref();

const { isVisible } = useIntersectionObserver(viewRef, scrollRef, {
  onChange: (isVisible: boolean) => {
    console.log("onChange isVisible " + isVisible);
  }
})

// Or listen to the changes with watch
watch(isVisible , () => {
  console.log("watch isVisible " + isVisible.value);
})
</script>

<template>
  <Page>
    ...
    <ScrollView ref="scrollRef">
      <StackLayout>
        <FlexboxLayout class="flex-wrap flex-col">
          <Label text="Foo item" class="p-4"></Label>
          <Label text="Foo item" class="p-4"></Label>
          <Label text="Foo item" class="p-4"></Label>
          <Label ref="viewRef" text="Track this view 👀" class="p-4"></Label>
        </FlexboxLayout>
      </StackLayout>
    </ScrollView>
    ...
  </Page>
</template>
```

## Source
<Source source="useIntersectionObserver" demo="IntersectionObserverView.vue"/>

## Type declaration
```ts
import { Ref, Readonly } from "nativescript-vue"
import { ViewRef } from "@nativescript-use/vue";
import { ScrollView } from "@nativescript/core";

/**
 * Reactive detects that a target element visibility.
 *
 * @param target
 * @param parentView
 * @param options
 */
export declare function useIntersectionObserver(target: ViewRef, parentView: ViewRef<ScrollView>, options?: {
    onChange?: (isVisible: boolean) => void;
}): {
    isVisible: Readonly<Ref<boolean>>;
    stopTrack: () => void;
};

```

## Core dependency
[@nativescript-use/nativescript-intersection-observer](https://github.com/NativeScript-Use/NativeScript-Use/tree/main/packages/nativescript-intersection-observer)
