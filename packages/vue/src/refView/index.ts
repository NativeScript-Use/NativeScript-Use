import type { View } from '@nativescript/core';
import { Ref, customRef } from 'nativescript-vue';
import { unrefView } from '../unrefView';

/**
 * Utility. Typed Ref of View.
 */
export function refView<T = View>(): Ref<T> {
  return customRef((track, trigger) => {
    let view = undefined;
    return {
      get() {
        track();
        return view;
      },
      set(newValue: any) {
        view = unrefView(newValue);
        watchPushIfIsArray(view);
        trigger();
      },
    };
  });
}

function watchPushIfIsArray(view: any) {
  if (view && Array.isArray(view)) {
    view.push = function (data) {
      const newItem = unrefView(data);
      return Array.prototype.push.apply(this, Array.isArray(newItem) ? newItem : [newItem]);
    };
  }
}
