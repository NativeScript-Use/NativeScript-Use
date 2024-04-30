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
  myArrayRef.value[0].foo = "lorem";
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
  myArrayRef.value[0].foo = "lorem";
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
  - Check for updates on items. Option `checkUpdates`.

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

### `pushAllInFirstSync`
A typical case is to declare a reactive array next to `useSyncObservableArray` and then make a request to a service to bring us all the information. In this scenario, the fastest thing is to directly synchronize the ObservableArray without checking for updates. With the property `pushAllInFirstSync: true` we indicate that the data is inserted in the first synchronization

## Hooks
### `onPreUpdate`
To have native performance in Lists/CollectionView, the recycling of items provided by Android/iOS is implemented. When we use these views from vue, the normal thing is to access calculated properties in our template, this causes a loss of performance when the calculation carried out is slow. To mitigate this we must calculate the field before adding it to the `ObservableArray`, for this we have the `onPreUpdate` hook, it allows the object to be mutated before adding it to the `ObservableArray` (this mutation will not affect its reactive object). 

Note that in this case the scrolling will be fast, but the initial loading of the data will be slower since it performs the calculation before inserting the elements.

❌ Don't do this
```vue
<script lang="ts" setup>
import { useSyncObservableArray } from "@nativescript-use/vue";
import TextService from "...";

const { observableArray } = useSyncObservableArray<MyType>(myArrayRef);

function getText(item: MyType){
  return TextService.buildTitleText(item);
}
</script>
<template>
  <CollectionView :items="observableArray">
    <template #default="{ item } : { item: MyType }">
      <Label :text="getText(item)" />
    </template>
  </CollectionView>
</template>
```

✅ Do this
```vue

<script lang="ts" setup>
import { useSyncObservableArray } from "@nativescript-use/vue";
import TextService from "...";

const { observableArray } = useSyncObservableArray<MyType, MyObservableType>(myArrayRef, {
    onPreUpdate(item: MyType, index: number, updateType: OnPreupdateType){
      item.title = TextService.buildTitleText(item);
      return item;
    }
  }
);
</script>
<template>
  <CollectionView :items="observableArray">
    <template #default="{ item } : { item: MyObservableType }">
      <Label :text="item.title" />
    </template>
  </CollectionView>
</template>
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
 * @param arrayWatchTarget
 * @param options
 */

export declare function useSyncObservableArray<T, J = any>(arrayRef: Ref<T[]> | T[], options?: {
   addRemoveByField?: string;
    excludeCompareFields?: string[];
    watchUpdates?: boolean;
    checkRemoved?: boolean;
    checkAdded?: boolean;
    checkUpdates?: boolean;
    pushAllInFirstSync?: boolean;
    initialDelay?: number;
    onPushInitialData?: () => void;
    onPreUpdate?: preUpdate<T, J>;
}): {
    sync: (newArray?: Ref<T[]> | T[]) => void;
    observableArray: ObservableArray<T>;
};
```