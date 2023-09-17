# useBreakpoints

Reactive screen breakpoints.

## Usage

```vue
<script lang="ts" setup>
import { useBreakpoints } from "@nativescript-use/vue";

const breakpointsExample = {
  'xs': 0,
  'sm': 128,
  'md': 248,
  'lg': 376,
  'xl': 504,
  '2xl': 632,
  '4xl': 888,
};
// ⚡ you can define the breakpoints you need
const deviceBreakpoints = useBreakpoints({
  mobile: 0,
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
})

const breakpoints = useBreakpoints(breakpointsExample);
const current = breakpoints.current();
const xs = breakpoints.smaller('xs');
const xsg = breakpoints.greater('xs');
const betweenlg4xl = breakpoints.between('lg', 'xl');
const largeScreen = breakpoints.isGreater('xl');
const betweenLGand2xl = breakpoints.between('lg', '2xl');
const lg = breakpoints['lg'];

// you can see all the methods in the Type declaration section

</script>

```
<br />

## Type declaration
```ts
import { Ref, ComputedRef } from "nativescript-vue";
export declare type Breakpoints<K extends string = string> = Record<K, number | string>;
/**
 * Reactive screen breakpoints.
 *
 * @param breakpoints
 */
export declare function useBreakpoints<K extends string>(breakpoints: Breakpoints<K>): Record<K, Ref<boolean>> & {
    greater(k: K): Ref<boolean>;
    greaterOrEqual: (k: K) => Ref<boolean>;
    smaller(k: K): Ref<boolean>;
    smallerOrEqual(k: K): Ref<boolean>;
    between(a: K, b: K): Ref<boolean>;
    isGreater(k: K): Ref<boolean>;
    isGreaterOrEqual(k: K): Ref<boolean>;
    isSmaller(k: K): Ref<boolean>;
    isSmallerOrEqual(k: K): Ref<boolean>;
    isInBetween(a: K, b: K): Ref<boolean>;
    current(): ComputedRef<string[]>;
};

```

## Core dependency
[@nativescript-use/nativescript-media-query](https://github.com/NativeScript-Use/NativeScript-Use/packages/nativescript-media-query/README.md)