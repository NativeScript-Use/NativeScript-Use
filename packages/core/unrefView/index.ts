import { View } from "@nativescript/core"
import { ViewRef } from "../types"

/**
 * Utility. Get View from Ref.
 *
 * @param target
 */
export function unrefView<T extends View>(
    target: ViewRef,
) {
    return target.value?.nativeView
}

