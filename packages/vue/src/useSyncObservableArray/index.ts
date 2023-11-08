import { ObservableArray } from '@nativescript/core';
import { toRaw, watch, isReactive, isRef, Ref } from 'nativescript-vue';

const baseExcludeCompareFields = { startingSide: null, menuOpened: null };

/**
 * Reactive synchronization between a reactive array with ObservableArray.
 *
 * @param arrayWatchTarge
 * @param options
 */
export function useSyncObservableArray<T>(
  arrayRef: Ref<T[]> | T[],
  options: {
    addRemoveByField?: string;
    excludeCompareFields?: string[];
    watchUpdates?: boolean;
    checkRemoved?: boolean;
    checkAdded?: boolean;
    checkUpdates?: boolean;
  } = { addRemoveByField: '' }
) {
  const { checkRemoved = true, checkAdded = true, checkUpdates = true, excludeCompareFields = undefined, addRemoveByField } = options;
  const excludeFields = {
    ...baseExcludeCompareFields,
    ...excludeCompareFields?.reduce((a: any, b) => {
      a[b] = null;
      return a;
    }, {}),
  };
  const observableArray = new ObservableArray<T>(getClearArray(arrayRef));

  if (options?.watchUpdates && (isReactive(arrayRef) || isRef(arrayRef))) {
    watch(arrayRef, sync, { deep: true });
  }

  function sync(newArray?: any) {
    //console.time("TIME_[useSyncObservableArray.sync]");
    const itemList = newArray ? getClearArray(newArray) : getClearArray(arrayRef);
    console.log('Processing_[useSyncObservableArray.sync.itemList.length]' + itemList.length);

    if (checkRemoved) {
      const indexRemoved: number[] = [];
      observableArray.forEach((itemObservable: any, index: number) => {
        const findItem = addRemoveByField ? itemList.find((item: any) => item[addRemoveByField] === itemObservable[addRemoveByField]) : itemList.find((item: any) => isEqualObject(item, itemObservable, excludeFields));
        if (!findItem) {
          indexRemoved.push(index);
        }
      });
      indexRemoved.forEach((index) => observableArray.splice(index, 1));
    }

    if (checkAdded) {
      const indexAdd: number[] = [];
      itemList.forEach((item: any, index: number) => {
        const findItem = addRemoveByField ? observableArray.find((itemObservable: any) => itemObservable[addRemoveByField] === item[addRemoveByField]) : observableArray.find((itemObservable: any) => isEqualObject(itemObservable, item, excludeFields));
        if (!findItem) {
          indexAdd.push(index);
        }
      });
      indexAdd.forEach((index) => observableArray.splice(index, 0, itemList[index]));
    }

    if (checkUpdates) {
      itemList.forEach((item: any, index: number) => {
        const itemObservable = observableArray.getItem(index);
        if (!isEqualObject(itemObservable, item, excludeFields)) {
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

function getClearArray<T>(array: Ref<T[]> | T[]) {
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
