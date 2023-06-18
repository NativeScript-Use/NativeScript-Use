# useMediaQuery

Reactive Media Query. Returns a reactive variable that reacts to orientation changes.

## Usage

```vue
<script lang="ts" setup>
import { useMediaQuery } from '@nativescript-use/vue';

const isXL = useMediaQuery("(min-width: 1024)");
const isMD = useMediaQuery("(min-width: 600) and (max-width: 1024)");

const isXLHigh = useMediaQuery("(min-height: 1024)");
const isMDHigh = useMediaQuery("(min-height: 400) and (max-height: 1024)");

const isLandscape = useMediaQuery("(orientation: landscape)");

</script>

```
<br />

## Type declaration
```ts
import { Ref } from "nativescript-vue"

/**
 * Reactive Media Query.
 *
 * @param mediaQueryString
 */
export declare function useMediaQuery(mediaQueryString: string): Ref<boolean>;

```
