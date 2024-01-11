<script setup>
import Source from '../../.vitepress/theme/components/Source.vue'
</script>

# useColorMode

Reactive color mode (dark / light / customs) with auto data persistence.

## Usage
### Basic Initialize
To use only light/dark themes you can initialize with the basic setting `useColorMode`

```js
// app.ts / main.ts

import { createApp } from 'nativescript-vue';
import { useColorMode } from "@nativescript-use/vue";

/* Init ColorMode */
useColorMode({ initialValue: 'auto' })

createApp(Home).start();
```

### Advanced initializer
To add custom modes other than `light/dark` you need to initialize in the input file to your application the custom modes you want to apply.

If you only want to use the `light/dark` modes this step is not necessary.
```js
// app.ts / main.ts

import { createApp } from 'nativescript-vue';
import { useColorMode } from "@nativescript-use/vue";

/* Init ColorMode */
const { system, schema, theme, modes } = useColorMode({
    modes: [
        // custom colors
        'dim',
        'cafe',
    ],
    initialValue: 'auto',
    onChanged: (theme: 'dark' | 'light' | 'dim' | 'cafe') => {
    }
})

createApp(Home).start();
```


### Use in your application

```ts
import { computed } from 'nativescript-vue'
import { useColorMode } from '@nativescript-use/vue'

const { system, schema, theme, modes } = useColorMode();

schema // Ref<'dark' | 'light' | 'dim' | 'cafe' | 'auto'>   👈 use this for change theme
system // Readonly<Ref<'dark' | 'light'>>
theme  // Readonly<Ref<'dark' | 'light' | 'dim' | 'cafe'>>;
modes  // Readonly<Ref<'dark' | 'light' | 'dim' | 'cafe' | 'auto'>>;

function changeTheme(){
    schema.value = 'cafe'; // change to cafe mode
}

function changeToDeviceTheme(){
    schema.value = 'auto';
}
```

## CSS integration
To control the styles in your CSS you just have to add the theme class with the prefix `ns-` an example is, for the custom theme `cafe` the class would be `ns-cafe`.

```css
.ns-light Label{
    color: gray;
} 

.ns-dark Label{
    color: white;
} 

.ns-dim Label{
    color: green;
} 

.ns-cafe Label{
    color: yellow;
} 

```

## Integrate with TailWind CSS

Integrate TaildWind CSS with the official [NativeScript plugin](https://github.com/NativeScript/tailwind) and apply styles depending on the theme

```ts
// tailwind.config.js
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './app/**/*.{css,xml,html,vue,svelte,ts,tsx}'
  ],
  plugins: [
    /**
     * A simple inline plugin that adds the theme variant
     */
    plugin(function ({ addVariant }) {
      addVariant('light', '.ns-light &');
      addVariant('dark', '.ns-dark &');
      addVariant('dim', '.ns-dim &');
      addVariant('cafe', '.ns-cafe &');
    }),
  ],
  corePlugins: {
    preflight: false // disables browser-specific resets
  }
}
```

Then you can do the following
```html
<Label text="Theme example" class="light:text-gray-500 dark:text-white dim:text-green-500 cafe:text-yellow-500" />
```

## Source
<Source source="useColorMode" demo="ColorModeView.vue,src/app.ts"/>

## Type declaration

```ts
import { Ref } from "nativescript-vue";

export type BasicColorMode = 'light' | 'dark';
export type BasicColorSchema = BasicColorMode | 'auto';
export interface UseColorModeOptions<T extends string = BasicColorMode> {
    /**
     * The initial color mode
     *
     * @default 'auto'
     */
    initialValue?: T | BasicColorSchema;
    /**
     * Prefix when adding value to the attribute
     */
    modes?: T[] | BasicColorSchema[];
    /**
     * A custom handler for handle the updates.
     * When specified, the default behavior will be overridden.
     *
     * @default undefined
     */
    onChanged?: (mode: T | BasicColorMode) => void;
    /**
     * Key to persist the data into ApplicationSettings.
     *
     * @default 'nativevueuse-color-scheme'
     */
    storageKey?: string | null;
}
export declare function useColorMode<T extends string = BasicColorMode>(options?: UseColorModeOptions<T>): {
    schema: Ref<BasicColorSchema | T>;
    system: Readonly<Ref<BasicColorMode>>;
    theme: Readonly<Ref<BasicColorMode | T>>;
    modes: Readonly<Ref<string[]>>;
};
```