import { ref, readonly } from 'nativescript-vue';
import { unrefView } from '../unrefView';
import { ViewRef } from '../types';
import { ScrollView, View } from '@nativescript/core';
import { IntersectionObserver } from '@nativescript-use/nativescript-intersection-observer';
import { useEventListener } from '../useEventListener';

/**
 * Reactive detects that a target element visibility.
 *
 * @param target
 * @param options
 */
export function useIntersectionObserver(target: View | ViewRef, parentView: ViewRef<ScrollView>, options?: { onChange?: (isVisible: boolean) => void }) {
  let isVisibleInternal = false;
  let isVisible = ref(isVisibleInternal);
  let intersectionObserver: IntersectionObserver;

  useEventListener(parentView, {
    loaded: () => {
      setTimeout(() => {
        const view = unrefView(target);
        const parent = unrefView<ScrollView>(parentView);
        intersectionObserver = new IntersectionObserver();
        isVisibleInternal = intersectionObserver.isVisible(view, parent);
        isVisible.value = isVisibleInternal;

        intersectionObserver.track(view, parent, (visible) => {
          if (isVisibleInternal != visible) {
            isVisibleInternal = visible;
            isVisible.value = visible;
            if (options?.onChange) options.onChange(visible);
          }
        });
      }, 10);
    },
  });

  function stopTrack() {
    intersectionObserver.stopTrack();
  }

  return {
    isVisible: readonly(isVisible),
    stopTrack,
  };
}
