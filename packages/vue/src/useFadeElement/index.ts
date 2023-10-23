import { watch, ref } from 'nativescript-vue';
import { ViewRef } from '../types';
import { unrefView } from '../unrefView';
import { View, CoreTypes } from '@nativescript/core';
import { useEventListener } from '../useEventListener';

/**
 * Change opacity and visibility with animation of a NativeScript element.
 *
 * @param target
 * @param options
 */
export function useFadeElement(
  target: ViewRef,
  options: {
    initial?: { opacity: number; visibility: CoreTypes.VisibilityType };
    animationDuration?: number;
  }
) {
  const { animationDuration = 250 } = options ?? {};
  const { opacity = 0, visibility = CoreTypes.Visibility.collapsed } = options?.initial ?? {};

  const isVisible = ref(opacity !== 0);

  useEventListener(target, {
    loaded(args) {
      args.object.opacity = opacity;
      args.object.visibility = visibility;
    },
  });
  watch(isVisible, () => {
    apply(isVisible.value);
  });

  function apply(show: boolean) {
    return new Promise<void>((resolve) => {
      const view = unrefView<View>(target);
      if (view) {
        isVisible.value = show;
        if (show) {
          view.visibility = CoreTypes.Visibility.visible;
        }
        view
          ?.animate({
            opacity: show ? 1 : 0,
            duration: animationDuration,
          })
          .then(() => {
            if (!show) {
              view.visibility = CoreTypes.Visibility.collapsed;
            }
            resolve();
          });
      }
    });
  }

  return {
    isVisible,
    show: () => apply(true),
    hide: () => apply(false),
    toggle: () => apply(!isVisible.value),
  };
}
