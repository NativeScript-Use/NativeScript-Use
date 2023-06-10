import { ref, readonly } from "nativescript-vue"
import { CoreTypes } from "@nativescript/core";
import { orientationCore } from "./core";


/**
 * Reactive screen orientation and utilities to manage the orientation.
 *
 * @param target
 * @param options
 */
export function useScreenOrientation(
    options?: { onChange?: (orientation: CoreTypes.DeviceOrientationType) => void },
) {
    const orientation = ref(orientationCore.getOrientation());

    let tryCount = 0;
    function tryOrientation() {
        if (orientation.value === CoreTypes.DeviceOrientation.unknown) {
            if (tryCount < 4) {
                setTimeout(() => {
                    tryCount++;
                    tryOrientation();
                }, 100);
            }
        } else {
            orientation.value = orientationCore.getOrientation();
            if (options?.onChange)
                options.onChange(orientation.value)
        }
    }
    if (orientation.value === CoreTypes.DeviceOrientation.unknown) tryOrientation();

    orientationCore.onChangedOrientation((newValue: CoreTypes.DeviceOrientationType) => {
        orientation.value = newValue;
        if (options?.onChange)
            options.onChange(orientation.value)
    })

    return {
        orientation: readonly(orientation),
        setOrientation: orientationCore.setOrientation,
        enableRotation: orientationCore.enableRotation,
        disableRotation: orientationCore.disableRotation
    }
}
