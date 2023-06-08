
# useRootLayout

Utility for RootLayout view. [RootLayout official documentation](https://docs.nativescript.org/ui-and-styling.html#rootlayout)

## Usage

```vue
<template>
  <Page>
    <RootLayout>
        <StackLayout>
            <!-- ... -->
        </StackLayout>
    </RootLayout>
  </Page>
</template>

<script lang="ts" setup>
import { onMounted } from 'nativescript-vue'
import { useRootLayout } from '@vallemar/nativescript-vueuse'
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
  onClose: () => { // 👂 define a listener for when it closes
    console.log("On Close RootLayout")
  }
});

onMounted(() => {
  show();
})

</script>
```
<br />

::: tip
If you need multiple rootLayouts you can alias the methods and references returned by `useRootLayout`.
:::
```vue
<template>
  <!-- ... -->
</template>

<script lang="ts" setup>
import { useRootLayout } from '@vallemar/nativescript-vueuse'
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
```

## Type declaration
```ts
import { Ref } from "@vallemar/nativescript-vueuse";
import { RootLayoutOptions, View} from "@nativescript/core";
/**
 * Utility for RootLayout view.
 *
 * @param component
 * @param options
 */
export declare function useRootLayout(component: any, options?: {
    props?: any;
    rootLayoutOption?: RootLayoutOptions;
    onClose?: () => void;
}): {
    show: () => Promise<void>;
    close: () => void;
    isShow: Ref<boolean>;
    view: View;
};
```
