import { ref, onMounted } from 'nativescript-vue';
import { unrefView } from '../unrefView';
import { ViewRef } from '../types';
import { CoreTypes, View } from '@nativescript/core';

export type SizeDIP = {
  width: CoreTypes.dip;
  height: CoreTypes.dip;
};
/**
 * Reactive size of a NativeScript element.
 *
 * @param target
 * @param options
 */
export function useElementSize(target: View | ViewRef, options?: { onChange?: (size: SizeDIP) => void; initialSize?: SizeDIP }) {
  const { initialSize = { width: 0, height: 0 } } = options ?? {};

  const width = ref<CoreTypes.dip>(initialSize.width);
  const height = ref<CoreTypes.dip>(initialSize.height);

  function layoutChanged() {
    const size = unrefView(target)?.getActualSize() as SizeDIP;
    if (size) {
      width.value = size.width;
      height.value = size.height;
      if (options?.onChange) {
        options.onChange(size);
      }
    }
  }

  onMounted(() => {
    const view = unrefView(target);
    if (view) {
      view.on('layoutChanged', layoutChanged);
      view.on('unloaded', () => {
        view.off('layoutChanged', layoutChanged);
      });
    }
  });

  return {
    width,
    height,
  };
}
