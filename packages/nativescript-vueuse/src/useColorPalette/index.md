
# useColorPalette

Reactive color palette (dark / light / customs) for reactive styles. 
<br />

::: info
In order for useColorPalette to react to theme changes you need the application themes to be controlled by [`useColorMode`](/core/useColorMode/)
:::

## Usage

### Basic initialize

If in your application you will only have light mode and dark mode you will need to initialize the light and dark palettes.

```js
// app.ts / main.ts

import { createApp } from 'nativescript-vue';
import { useColorMode, useColorPalette } from "@vallemar/nativescript-vueuse";

/* Init Palette */
useColorPalette({ 
    palettes: [
        { theme: "light", colors: { bg: "#f1f1f1", bgVariant: "#e3e3e3", textColor: "black" } },
        { theme: "dark", colors: { bg: "#0f0b15", bgVariant: "#292e3a", textColor: "#9bd1c3" } }
    ] 
});

createApp(Home).start();
```
<br />

### Advanced initialize

This function depends on [`useColorMode`](/core/useColorMode/). If you want other themes than the default themes on the native side (light/dark) you must also initialize [`useColorMode`](/core/useColorMode/) so that the themes match useColorPalette.

```js
// app.ts / main.ts

import { createApp } from 'nativescript-vue';
import { useColorMode, useColorPalette } from "@vallemar/nativescript-vueuse";

/* Init Color mode and Palette */
useColorMode({
    modes: ["dim", "cafe"] // Custom modes
});

useColorPalette({ 
    palettes: [
        { theme: "light", colors: { bg: "#f1f1f1", bgVariant: "#e3e3e3", textColor: "black" } },
        { theme: "dark", colors: { bg: "#0f0b15", bgVariant: "#292e3a", textColor: "#9bd1c3" } },
        { theme: "dim", colors: { bg: "#c4dfdf", bgVariant: "#8ea8a8", textColor: "#252525" } },
        { theme: "cafe", colors: { bg: "#884a39", bgVariant: "#c07c68", textColor: "#ffe6d8" } },
    ] 
});

createApp(Home).start();
```

### Use in your application
This is a simple example, keep in mind that when you change the theme through [`useColorMode`](/core/useColorMode/) the reactive palette will change automatically applying the colors of the new palette.


```vue
<script lang="ts" setup>
import { useColorPalette } from "@vallemar/nativescript-vueuse";

type Patelle = { 
  bg: string, 
  bgVariant: string, 
  textColor: string 
} // 🪄 You can define the type of your palette to have autocomplete

const { palette } = useColorPalette<string, Patelle>()

</script>

<template>
  <Page :backgroundColor="palette?.colors.bg">
    <StackLayout class="p-4">
      <FlexboxLayout class="p-2" :backgroundColor="palette?.colors.bgVariant">
        <Label text="Example" :color="palette?.colors.textColor"/>
      </FlexboxLayout>
    </StackLayout>
  </Page>
</template>

```

<br />

## Type declaration

```ts
import type { Color } from "@nativescript/core";
import { Ref } from "nativescript-vue";

export type PaletteColor<T = string, S = {
    [key: string]: string | Color;
}> = {
    theme: T;
    colors: S;
};

export interface UseColorPaletteOptions<T extends string, S extends {} = {
    [key: string]: string | Color;
}> {
    /**
     * The initial palettes
     */
    palettes?: PaletteColor<T, S>[];
    /**
     * A custom handler for handle the updates.
     *
     * @default undefined
     */
    onChanged?: (palette: PaletteColor<T>) => void;
}

export declare function useColorPalette<T extends string, S extends {} = {}>(options?: UseColorPaletteOptions<T, S>): {
    palette: Ref<PaletteColor<T, S> | undefined>;
};
```