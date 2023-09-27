<script setup>
import Source from '../../.vitepress/theme/components/Source.vue'
</script>

# useKeyboard

Reactive keyboard state. It also provides methods to open or close the keyboard.

## Usage

```vue
<script lang="ts" setup>
import { ref } from "nativescript-vue";
import { useKeyboard } from "@nativescript-use/vue";

const el = ref()

const { 
  isOpen, 
  open, 
  close 
} = useKeyboard({
  onChange: (isOpenKeyboard: boolean) => {
    console.log("onChange " + isOpenKeyboard);
  },
  defaultTarget: el // ℹ️ When you call open() the focus will be applied to this view.
});

</script>

<template>
  <Page>
    <StackLayout class="p-3">
      <FlexboxLayout class=" justify-center items-center mt-10">
        <Label class="text-center text-lg bg-variant rounded-2xl p-10">Reactive status {{ isOpen }}</Label>
      </FlexboxLayout>
      <TextField ref="el" class="bg-variant rounded-full mt-8 pl-3 ios:py-2" hint="Write on me ✍️" />
      <Button @tap="open" class="mx-1 mt-8 w-1/2" text="Open keyboard"></Button>
      <Button @tap="close" class="mx-1 mt-8 w-1/2" text="Close keyboard"></Button>
    </StackLayout>
  </Page>
</template>
```

## Usage with multiple views

If you have multiple targets to apply focus to, you can pass the view as a parameter in the open method so that it is not necessary to declare multiple `useKeyboard` with `defaultTarget`

```vue
<script lang="ts" setup>
import { ref } from "nativescript-vue";
import { useKeyboard } from "@nativescript-use/vue";

const el = ref()

const { 
  isOpen, 
  open, 
  close 
} = useKeyboard();

const onOpen = () => open(el); // 👈 Choose the view you want to apply focus to in the open method

</script>

```

## Source
<Source source="useKeyboard" demo="KeyboardView.vue"/>

## Type declaration
```ts
import { Ref } from "nativescript-vue"
import { ViewRef } from "@nativescript-use/vue";
import { View } from "@nativescript/core";

/**
 * Reactive keyboard state. It also provides methods to open or close the keyboard.
 *
 * @param target
 * @param options
 */
export declare function useKeyboard(options?: {
    onChange?: (isOpen: boolean) => void;
    defaultTarget?: View | ViewRef;
}): {
    isOpen: Readonly<Ref<boolean>>;
    open: (target?: View | ViewRef) => void;
    close: () => void;
};

```

## Core dependency
[@nativescript-use/nativescript-keyboard](https://github.com/NativeScript-Use/NativeScript-Use/tree/main/packages/nativescript-keyboard)