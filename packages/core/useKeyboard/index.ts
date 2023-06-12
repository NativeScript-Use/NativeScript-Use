import { onMounted, onUnmounted, readonly, ref } from "nativescript-vue"
import { ViewRef } from "@nativescriptvueuse/core/types"
import { keyboardCore } from "./core";
import { unrefView } from "../unrefView";

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

    onMounted(() => {
        keyboardCore.onChangeVisibility((status: boolean) => {
            if (isOpen.value !== status) {
                isOpen.value = status;
                if (options?.onChange)
                    options.onChange(status);
            }
        });
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

