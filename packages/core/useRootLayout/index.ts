import { createNativeView, ref } from "nativescript-vue"
import { RootLayoutOptions, ViewBase, getRootLayout } from "@nativescript/core"

/**
 * Utility for the RootLayout view.
 *
 * @param component
 * @param options
 */
export function useRootLayout(
    component: any,
    options?: { props?: any, rootLayoutOption?: RootLayoutOptions, onClose?: () => void },
) {
    const isShow = ref(false);
    const node = createNativeView(component, options?.props);
    node.mount();
    const view = node.nativeView;

    view.on(ViewBase.unloadedEvent, () => {        
        isShow.value = false;
        if (options?.onClose)
            options.onClose();
    });

    function show() {
        isShow.value = true;
        return getRootLayout().open(view, options?.rootLayoutOption);
    }

    function close() {
        getRootLayout().close(view);
    }
    
    return {
        show,
        close,
        isShow,
        view
    }
}

