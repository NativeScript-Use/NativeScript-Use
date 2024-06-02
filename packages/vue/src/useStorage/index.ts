import localStorage, { LocalStorage } from '@nativescript-use/nativescript-localstorage';
import { useStorage as useStorageCore, UseStorageOptions } from '@vueuse/core';

function createStorage<T, K extends string = string>(key: string, initialValue: T, storage: LocalStorage<K>, options?: UseStorageOptions<T>) {
  return useStorageCore<T>(
    key,
    initialValue,
    storage,
    Object.assign(options ?? {}, {
      listenToStorageChanges: false,
      window: null,
    })
  );
}

export function useStorage<T = any, K extends string = string>(key: K, initialValue: T, storage?: LocalStorage<K>, options?: UseStorageOptions<T>) {
  return createStorage<T>(key, initialValue, storage ?? localStorage, options);
}
