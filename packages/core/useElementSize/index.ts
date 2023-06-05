import { Size, View } from "@nativescript/core"
import { ref, onMounted, Ref } from "nativescript-vue"

/**
 * Reactive size of a NativeScript element.
 *
 * @see 
 * @param target
 * @param options
 */
export function useElementSize<T extends View>(
    target: Ref<{ nativeView: T }>,
    options?: { onChange?: (size: Size) => void, initialSize?: Size },
) {
    const {
        initialSize = { width: 0, height: 0 },
    } = options ?? {}

    const width = ref(initialSize.width)
    const height = ref(initialSize.height)

    function layoutChanged() {
        const size = target.value.nativeView.getActualSize();
        width.value = size.width;
        height.value = size.height;
        if (options?.onChange) {
            options.onChange(size);
        }
    }
    onMounted(() => {
        target.value.nativeView.on("layoutChanged", layoutChanged)
        target.value.nativeView.on("unloaded", () => {
            target.value.nativeView.off("layoutChanged", layoutChanged)
        })
    })

    return {
        width,
        height,
    }
}

