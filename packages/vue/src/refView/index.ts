import type { View } from '@nativescript/core';
import { Ref, customRef, ref } from 'nativescript-vue';
import { unrefView } from '../unrefView';

/**
 * Utility. Typed Ref of View.
 */
export function refView<T = View>(): Ref<T> {
  const refView = ref();
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return unrefView(refView);
      },
      set(newValue: any) {
        refView.value = newValue;
        trigger();
      },
    };
  });
}
