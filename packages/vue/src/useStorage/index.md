<script setup>
import Source from '../../.vitepress/theme/components/Source.vue'
</script>

# useStorage

Create a reactive ref that can be used to access & modify [ApplicationSettings](https://docs.nativescript.org/core/application-settings) and using [useStorage of VueUse](https://vueuse.org/core/useStorage/#usestorage).

Uses [localStorage plugin](https://github.com/NativeScript-Use/NativeScript-Use/blob/main/packages/nativescript-localstorage/README.md) by default, other storage sources be specified via third argument.


## Usage

```ts
import { useStorage } from '@nativescript-use/vue'

// bind object
const state = useStorage('my-store', { hello: 'hi', greeting: 'Hello' })

// bind boolean
const flag = useStorage('my-flag', true) // returns Ref<boolean>

// bind number
const count = useStorage('my-count', 0) // returns Ref<number>

// delete data from storage
state.value = null
```

You can find all the documentation at [useStorage of Vue Use](https://vueuse.org/core/useStorage/#usestorage).

## Source
<Source source="useStorage"/>

## Type declaration

```ts
import { LocalStorage } from '@nativescript-use/nativescript-localstorage';
import { RemovableRef, UseStorageOptions } from '@vueuse/core';

export declare function useStorage<T = any, K extends string = string>(
    key: K, 
    initialValue: T,
    storage?: LocalStorage<K>, 
    options?: UseStorageOptions<T>
): RemovableRef<T>;
```