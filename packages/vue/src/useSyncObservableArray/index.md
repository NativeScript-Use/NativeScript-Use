<script setup>
import Source from '../../.vitepress/theme/components/Source.vue'
</script>

# useSyncObservableArray

Reactive synchronization between a reactive array with [ObservableArray](https://docs.nativescript.org/ui-and-styling.html#rootlayout). 

Generate an ObservableArray that will listen for changes in a reactive Vue array and apply them to the ObservableArray. Useful to use together with [ListView](https://docs.nativescript.org/ui/list-view) and [UI-CollectionView](https://github.com/nativescript-community/ui-collectionview)

## Usage
### With reactivity
```vue
<script lang="ts" setup>
import { ref } from "nativescript-vue";
import { useSyncObservableArray } from "@nativescript-use/vue";

const myArrayRef = ref([{id: 1, foo: "bar"}]);
const { observableArray } = useSyncObservableArray<MyType>(
  myArrayRef, 
  { 
    addRemoveByField: "id", 
    watchUpdates: true  // <-- default is false 
  } 
);

function updateData(){
  myArrayRef.value[1].foo = "lorem";
}
</script>
```

### Without reactivity (manual synchronization)
```vue
<script lang="ts" setup>
import { useSyncObservableArray } from "@nativescript-use/vue";

const myArrayRef = ref([{id: 1, foo: "bar"}]);
const { sync, observableArray } = useSyncObservableArray<MyType>(
  myArrayRef, 
  { addRemoveByField: "id" } 
);

function updateData(){
  myArrayRef.value[1].foo = "lorem";
  sync();
}
</script>
```

## Performance
Keep in mind that searching for changes in very large arrays is expensive so keep these points in mind when using useSyncObservableArray.
- Use `addRemoveByField` to indicate a unique property of each array element, for example the `id`.
- The process to search for changes consists of 3 phases:
  - Search for deleted items. Option `checkRemoved`.
  - Search for added items. Option `checkAdded`.
  - Check for updates on items. Option `checkUpdated`.

By default all 3 phases are activated. Use these parameters to indicate which operations you want to detect. An example, if you only want to track updates, use the following configuration:

```vue
<script lang="ts" setup>
const { observableArray } = useSyncObservableArray<MyType>(
  myArrayRef, 
  { 
    addRemoveByField: "id",
    checkRemoved: false,
    checkAdded: false,
    checkUpdates: true
  } 
);
</script>
```

## Source
<Source source="useSyncObservableArray"/>

## Type declaration
```ts
import { ObservableArray } from "@nativescript/core";
import { Ref } from "nativescript-vue";
/**
 * Reactive synchronization between a reactive array with ObservableArray.
 *
 * @param arrayWatchTarge
 * @param options
 */

export declare function useSyncObservableArray<T>(arrayRef: Ref<T[]> | T[], options?: {
    addRemoveByField?: string;
    excludeCompareFields?: string[];
    watchUpdates?: boolean;
    checkRemoved?: boolean;
    checkAdded?: boolean;
    checkUpdated?: boolean;
}): {
    sync: (newArray?: Ref<T[]> | T[]) => void;
    observableArray: ObservableArray<T>;
};
```