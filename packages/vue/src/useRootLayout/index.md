<script setup>
import Source from '../../.vitepress/theme/components/Source.vue'
</script>

# useRootLayout

Utility for RootLayout view. [RootLayout official documentation](https://docs.nativescript.org/ui-and-styling.html#rootlayout)

## Usage

```vue
<script lang="ts" setup>
import { onMounted } from 'nativescript-vue'
import { useRootLayout } from '@nativescript-use/vue'
import { MyComponent } from "./MyComponent.vue";

const { show, close, isShow } = useRootLayout(MyComponent, {
  props: { foo: "bar" },
  rootLayoutOption: {
    shadeCover: {
      color: '#000',
      opacity: 0.7,
      tapToClose: true
    },
    animation: {
      enterFrom: {
        opacity: 0,
        translateY: 500,
        duration: 500
      },
      exitTo: {
        opacity: 0,
        duration: 300
      }
    }
  },
  // Define listeners to listen to emits from your component
  on: {
    myCustomEmitEvent: (myData) => {  // 👂 in your child emit('myCustomEmitEvent', myData)
      console.log("listening to emit from parent: myCustomEmitEvent " + myData);
    }
  },
  onClose: () => { // 👂 define a listener for when it closes
    console.log("On Close RootLayout")
  }
});

onMounted(() => {
  show();
})

</script>

<template>
  <Page>
    <RootLayout>
        <StackLayout>
            <!-- ... -->
        </StackLayout>
    </RootLayout>
  </Page>
</template>
```

::: tip
If you need multiple rootLayouts you can alias the methods and references returned by `useRootLayout`.
:::
```vue
<script lang="ts" setup>
import { useRootLayout } from '@nativescript-use/vue'
import { BomttomSheetComponent } from "./BomttomSheetComponent.vue";
import { ModalComponent } from "./ModalComponent.vue";

const { 
  show: showBottomSheet, 
  close: closeBottomSheet, 
  isShow: isShowBottomSheet 
} = useRootLayout(BomttomSheetComponent, {your_options});

const { 
  show: showModal, 
  close: closeModal, 
  isShow: isShowModal 
} = useRootLayout(ModalComponent, {your_options});

</script>

<template>
  <!-- ... -->
</template>
```

## Source
<Source source="useRootLayout" demo="RootLayoutView.vue"/>

## Type declaration
```ts
import { RootLayoutOptions, View } from "@nativescript/core";
/**
 * Utility for RootLayout view.
 *
 * @param component
 * @param options
 */
export declare function useRootLayout(component: any, options?: {
    props?: any;
    on?: Record<string, (...args: any[]) => any>;
    rootLayoutOption?: RootLayoutOptions;
    closeTimerMillis?: number;
    onClose?: () => void;
}): {
    show: () => Promise<void>;
    close: () => void;
    isShow: Ref<boolean>;
    view: View;
};

```
