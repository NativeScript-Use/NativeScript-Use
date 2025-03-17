import { ObservableArray } from '@nativescript/core';
import { Ref, isReactive, isRef, toRaw, watch } from 'nativescript-vue';

export enum OnPreUpdateType {
  Add,
  Update,
  Delete,
}
/* export enum OnPreSycType {
  Initial,
  Update
} */

type NotAnyResult<TypeToCheck, J> = [J] extends [undefined] ? TypeToCheck : J;

type preUpdate<ReactiveItem, OAItem> = (item: ReactiveItem, index: number, updateType: OnPreUpdateType) => OAItem;

const baseExcludeCompareFields = { startingSide: null, menuOpened: null };

/**
 * Reactive synchronization between a reactive array with ObservableArray.
 *
 * @param arrayWatchTarge
 * @param options
 */
export function useSyncObservableArray<ReactiveItem, OAItem = any>(
  arrayRef: Ref<ReactiveItem[]> | ReactiveItem[],
  options: {
    addRemoveByField?: string;
    excludeCompareFields?: string[];
    watchUpdates?: boolean;
    checkRemoved?: boolean;
    checkAdded?: boolean;
    checkUpdates?: boolean;
    initialDelay?: number;
    /**
     * @deprecated ObservableArray will sync without checking for differences if it is empty. Applied since v0.0.46
     */
    pushAllInFirstSync?: boolean;
    //   onPreSync?: preSync<T, J>,
    onPushInitialData?: () => void;
    onPreUpdate?: preUpdate<ReactiveItem, OAItem>;
  } = { addRemoveByField: '' }
) {
  const { initialDelay = 0, checkRemoved = true, pushAllInFirstSync = false, watchUpdates = false, checkAdded = true, checkUpdates = true, excludeCompareFields = undefined, addRemoveByField /* , onPreSync = undefined */, onPreUpdate = undefined, onPushInitialData = undefined } = options;

  const excludeFields = {
    ...baseExcludeCompareFields,
    ...excludeCompareFields?.reduce((a: any, b) => {
      a[b] = null;
      return a;
    }, {}),
  };
  let firstSync = true;
  //TODO: runOnPreSync
  //let clearArray = runOnPreSync(onPreSync, getClearArray(arrayRef), OnPreSycType.Initial);
  let clearArray = getClearArray(arrayRef);
  if (onPreUpdate) {
    clearArray = clearArray.map((item: ReactiveItem, index: number) => {
      return runOnPreUpdate(onPreUpdate, item, index, OnPreUpdateType.Add);
    });
  }

  const observableArray = createAndPushInitialData<ReactiveItem, OAItem>(clearArray, initialDelay, onPushInitialData) as ObservableArray<NotAnyResult<ReactiveItem, OAItem>>;

  if (watchUpdates && (isReactive(arrayRef) || isRef(arrayRef))) {
    watch(arrayRef, () => sync(), { deep: true });
  }

  function sync(newArray?: any) {
    const itemList = newArray ? getClearArray(newArray) : getClearArray(arrayRef);
    //console.time("TIME_[useSyncObservableArray.sync]");
    //TODO: runOnPreSync
    //const clearArray = newArray ? getClearArray(newArray) : getClearArray(arrayRef);
    //const itemList = runOnPreSync(onPreSync, clearArray,  OnPreSycType.Update);
    //console.log('Processing_[useSyncObservableArray.sync.itemList.length] ' + itemList.length);
    if (observableArray.length === 0 || (pushAllInFirstSync && firstSync)) {
      firstSync = false;
      observableArray.push(...itemList);
      return;
    }

    // If the array is empty, we will clear the observableArray
    if (itemList.length === 0 && observableArray.length !== 0) {
      observableArray.splice(0, observableArray.length);
      return;
    }

    if (checkRemoved) {
      const indexRemoved: number[] = [];
      observableArray.forEach((itemObservable: any, index: number) => {
        const findItem = addRemoveByField ? itemList.find((item: any) => item[addRemoveByField] === itemObservable[addRemoveByField]) : itemList.find((item: any) => isEqualObject(item, itemObservable, excludeFields));
        if (!findItem) {
          indexRemoved.push(index);
        }
      });

      indexRemoved.forEach((index) => {
        runOnPreUpdate(onPreUpdate, itemList[index], index, OnPreUpdateType.Delete);
        observableArray.splice(index, 1);
      });
    }

    if (checkAdded) {
      const indexAdd: number[] = [];
      itemList.forEach((item: any, index: number) => {
        const findItem = addRemoveByField ? observableArray.find((itemObservable: any) => itemObservable[addRemoveByField] === item[addRemoveByField]) : observableArray.find((itemObservable: any) => isEqualObject(itemObservable, item, excludeFields));
        if (!findItem) {
          indexAdd.push(index);
        }
      });
      indexAdd.forEach((index) => {
        itemList[index] = runOnPreUpdate(onPreUpdate, itemList[index], index, OnPreUpdateType.Add);
        observableArray.splice(index, 0, itemList[index]);
      });
    }

    if (checkUpdates) {
      itemList.forEach((item: any, index: number) => {
        const itemObservable = observableArray.getItem(index);
        if (!isEqualObject(itemObservable, item, excludeFields)) {
          item = runOnPreUpdate(onPreUpdate, item, index, OnPreUpdateType.Add);
          observableArray.setItem(index, item);
        }
      });
    }
    //console.timeEnd("TIME_[useSyncObservableArray.sync]");
  }

  return {
    sync,
    observableArray,
  };
}

function createAndPushInitialData<ReactiveItem, OAItem>(clearArray: NotAnyResult<ReactiveItem, OAItem>[], initialDelay: number, onPushInitialData: () => void) {
  let observableArray = new ObservableArray<NotAnyResult<ReactiveItem, OAItem>>([]);
  if (initialDelay != 0) {
    setTimeout(() => {
      observableArray.push(...clearArray);
      if (onPushInitialData) {
        onPushInitialData();
      }
    }, initialDelay);
  } else {
    observableArray.push(...clearArray);
    if (onPushInitialData) {
      onPushInitialData();
    }
  }
  return observableArray;
}
/* function runOnPreSync<T, J>(onPreSync: preSync<T, J>, items: T[], type: OnPreSycType): T[] | J[] {
  if (onPreSync) return onPreSync(items, type);
  return items;
} */

function runOnPreUpdate<ReactiveItem, OAItem>(onPreUpdated: preUpdate<ReactiveItem, OAItem> | undefined, item: ReactiveItem, index: number, type: OnPreUpdateType): ReactiveItem | OAItem {
  if (onPreUpdated) return onPreUpdated(item, index, type);
  return item;
}

function getClearArray<ReactiveItem>(array: Ref<ReactiveItem[]> | ReactiveItem[]) {
  return cloneObject(extractArray(array));
}

function extractArray<T>(array: Ref<T[]> | T[]) {
  return isRef(array) ? array.value : array;
}

function isEqualObject(a: any, b: any, excludeFields: any) {
  const aObject = { ...a, ...excludeFields };
  const bObject = { ...b, ...excludeFields };
  return JSON.stringify(aObject) === JSON.stringify(bObject);
}

function cloneObject(object: any) {
  return JSON.parse(JSON.stringify(toRaw(object)));
}
