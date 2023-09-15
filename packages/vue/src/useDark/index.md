
# useDark

Reactive dark mode with auto data persistence.

## Usage
```js
import { useDark } from "@nativescript-use/vue";

const isDark = useDark();

function toggleTheme(){
  isDark.value = !isDark.value;
}
```

## CSS integration
To control the styles in your CSS you just have to add the theme class with the prefix `ns-`.

```css
.ns-light Label{
    color: gray;
} 

.ns-dark Label{
    color: white;
}
```

## Integrate with TailWind CSS

Integrate TaildWind CSS with the official [NativeScript plugin](https://github.com/NativeScript/tailwind) and apply styles depending on the theme. It works out of the box and no integration needs to be done

```html
<Label text="Theme example" class="text-gray-500 dark:text-white" />
```
<br />

## Type declaration

```ts
import { WritableComputedRef } from "nativescript-vue";

export declare function useDark(): WritableComputedRef<boolean>;

```