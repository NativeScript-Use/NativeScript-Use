import { createNativeView, ref } from 'nativescript-vue';
import { RootLayoutOptions, ViewBase, getRootLayout } from '@nativescript/core';

/**
 * Utility for the RootLayout view.
 *
 * @param component
 * @param options
 */
export function useRootLayout(
  component: any,
  options?: {
    props?: any;
    on?: Record<string, (...args: any[]) => any>;
    rootLayoutOption?: RootLayoutOptions;
    onClose?: () => void;
    closeTimerMillis?: number;
  }
) {
  const isShow = ref(false);

  const listeners = Object.entries(options?.on ?? {}).reduce((listeners, [key, value]) => {
    listeners['on' + key.charAt(0).toUpperCase() + key.slice(1)] = value;
    return listeners;
  }, {} as { [key: string]: (...args: any[]) => any });

  const propsAndListeners = Object.assign(options?.props ?? {}, listeners);

  const node = createNativeView(component, propsAndListeners);
  node.mount();
  const view = node.nativeView;

  view.on(ViewBase.unloadedEvent, () => {
    isShow.value = false;
    if (options?.onClose) options.onClose();
  });

  function show() {
    isShow.value = true;
    if (options?.closeTimerMillis) {
      setTimeout(() => {
        getRootLayout().close(view, options?.rootLayoutOption?.animation?.exitTo);
      }, options.closeTimerMillis);
    }
    return getRootLayout().open(view, options?.rootLayoutOption);
  }

  function close() {
    getRootLayout().close(view);
  }

  return {
    show,
    close,
    isShow,
    view,
  };
}
