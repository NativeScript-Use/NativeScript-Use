import { createNativeView, ref } from 'nativescript-vue';
import { Frame, RootLayoutOptions, View, ViewBase, getRootLayout } from '@nativescript/core';
import { onApplicationMounted } from '../onApplicationMounted';
import { warn } from '../utils';

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

  let view: View | null = null;

  function buildView() {
    const node = createNativeView(component, propsAndListeners);
    node.mount();
    view = node.nativeView;

    view.on(ViewBase.unloadedEvent, () => {
      isShow.value = false;
      if (options?.onClose) options.onClose();
    });
  }

  onApplicationMounted(() => {
    if (!view) buildView();
  });

  function _show(resolve, reject) {
    isShow.value = true;
    if (options?.closeTimerMillis) {
      setTimeout(() => {
        getRootLayout().close(view, options?.rootLayoutOption?.animation?.exitTo);
      }, options.closeTimerMillis);
    }
    getRootLayout()
      .open(view, options?.rootLayoutOption)
      .then((params) => {
        resolve(params);
      })
      .catch((error) => {
        reject(error);
      });
  }

  function show() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!view && Frame.topmost()) {
          buildView();
          _show(resolve, reject);
        } else if (view) {
          _show(resolve, reject);
        } else {
          reject();
          warn('[useRootLayout] If you are using show() in your main view call show() inside the onApplicationMounted hook or onMounted');
        }
      }, 0);
    });
    return promise;
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
