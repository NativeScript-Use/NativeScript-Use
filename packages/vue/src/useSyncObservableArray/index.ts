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

type NotAnyResult<TypeToCheck, J> = unknown extends TypeToCheck ? ([keyof TypeToCheck] extends [never] ? TypeToCheck : J) : TypeToCheck;

type preUpdate<T, J> = (item: T, index: number, updateType: OnPreUpdateType) => J;
//type preSync<T, J> = (items: T[], syncType: OnPreSycType) => J[];

const baseExcludeCompareFields = { startingSide: null, menuOpened: null };

/**
 * Reactive synchronization between a reactive array with ObservableArray.
 *
 * @param arrayWatchTarge
 * @param options
 */
export function useSyncObservableArray<T, J = any>(
  arrayRef: Ref<T[]> | T[],
  options: {
    addRemoveByField?: string;
    excludeCompareFields?: string[];
    watchUpdates?: boolean;
    checkRemoved?: boolean;
    checkAdded?: boolean;
    checkUpdates?: boolean;
    //   onPreSync?: preSync<T, J>,
    onPreUpdate?: preUpdate<T, J>;
  } = { addRemoveByField: '' }
) {
  const { checkRemoved = true, checkAdded = true, checkUpdates = true, excludeCompareFields = undefined, addRemoveByField /* , onPreSync = undefined */, onPreUpdate = undefined } = options;
  const excludeFields = {
    ...baseExcludeCompareFields,
    ...excludeCompareFields?.reduce((a: any, b) => {
      a[b] = null;
      return a;
    }, {}),
  };

  //TODO: runOnPreSync
  //let clearArray = runOnPreSync(onPreSync, getClearArray(arrayRef), OnPreSycType.Initial);
  let clearArray = getClearArray(arrayRef);
  if (onPreUpdate) {
    clearArray = clearArray.map((item: T, index: number) => {
      return runOnPreUpdate(onPreUpdate, item, index, OnPreUpdateType.Add);
    });
  }

  const observableArray = new ObservableArray<NotAnyResult<J, T>>(clearArray);

  if (options?.watchUpdates && (isReactive(arrayRef) || isRef(arrayRef))) {
    watch(arrayRef, () => sync(), { deep: true });
  }

  function sync(newArray?: any) {
    //console.time("TIME_[useSyncObservableArray.sync]");
    const itemList = newArray ? getClearArray(newArray) : getClearArray(arrayRef);
    //TODO: runOnPreSync
    //const clearArray = newArray ? getClearArray(newArray) : getClearArray(arrayRef);
    //const itemList = runOnPreSync(onPreSync, clearArray,  OnPreSycType.Update);
    //console.log('Processing_[useSyncObservableArray.sync.itemList.length] ' + itemList.length);
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

/* function runOnPreSync<T, J>(onPreSync: preSync<T, J>, items: T[], type: OnPreSycType): T[] | J[] {
  if (onPreSync) return onPreSync(items, type);
  return items;
} */

function runOnPreUpdate<T, J>(onPreUpdated: preUpdate<T, J> | undefined, item: T, index: number, type: OnPreUpdateType): T | J {
  if (onPreUpdated) return onPreUpdated(item, index, type);
  return item;
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
