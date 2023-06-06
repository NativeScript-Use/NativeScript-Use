import { View } from "@nativescript/core"
import { ViewRef } from "../types"

/**
 * Utility. Get View from Ref.
 *
 * @param target
 */
export function unrefView<T = View>(
    target: ViewRef<T>,
) {
    return target.value?.nativeView
}
