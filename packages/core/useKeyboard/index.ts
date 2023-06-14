import { onMounted, onUnmounted, readonly, ref } from "nativescript-vue"
import { ViewRef } from "../types"
import { unrefView } from "../unrefView";
import { Keyboard } from "./nsCore";
import { onApplicationMounted } from "../onApplicationMounted";

/**
 * Reactive size of a NativeScript element.
 *
 * @param target
 * @param options
 */
export function useKeyboard(
    options?: { onChange?: (isOpen: boolean) => void, defaultTarget?: ViewRef },
) {
    const isOpen = ref(false);
    const keyboardCore = new Keyboard();

    //TODO: fix this
    onMounted(() => {
        onApplicationMounted(() => {
            keyboardCore.onChangeVisibility((status: boolean) => {
                if (isOpen.value !== status) {
                    isOpen.value = status;
                    if (options?.onChange)
                        options.onChange(status);
                }
            });
        })
    })

    onUnmounted(() => {
        keyboardCore.offChangeVisibility();
    })

    const open = (target?: ViewRef) => {
        const viewTarget = unrefView(target!);
        const viewDefaultTarget = options?.defaultTarget ? unrefView(options?.defaultTarget!) : null;
        if (viewTarget) {
            keyboardCore.open(viewTarget);
        } else if (viewDefaultTarget) {
            keyboardCore.open(viewDefaultTarget);
        } else {
            console.log("Error. Need to define a view to apply focus.");
        }
    }
    return {
        isOpen: readonly(isOpen),
        open,
        close: keyboardCore.close,
    }
}

