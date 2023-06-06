import { Size, View } from "@nativescript/core"
import { ref, onMounted } from "nativescript-vue"
import {unrefView, ViewRef} from "../"

/**
 * Reactive size of a NativeScript element.
 *
 * @param target
 * @param options
 */
export function useElementSize<T extends View>(
    target: ViewRef,
    options?: { onChange?: (size: Size) => void, initialSize?: Size },
) {
    const {
        initialSize = { width: 0, height: 0 },
    } = options ?? {}

    const width = ref(initialSize.width)
    const height = ref(initialSize.height)

    function layoutChanged() {
        const size = unrefView(target)?.getActualSize();
        if(size){
            width.value = size.width;
            height.value = size.height;
            if (options?.onChange) {
                options.onChange(size);
            }
        }
    }

    onMounted(() => {
        const view = unrefView(target);
        if(view){
            view.on("layoutChanged", layoutChanged)
            view.on("unloaded", () => {
                view.off("layoutChanged", layoutChanged)
            })
        }
    })

    return {
        width,
        height,
    }
}

