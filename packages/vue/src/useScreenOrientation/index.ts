import { ref, readonly, onUnmounted } from 'nativescript-vue';
import { CoreTypes } from '@nativescript/core';
import { Orientation } from '@nativescript-use/nativescript-orientation';

/**
 * Reactive screen orientation and utilities to manage the orientation.
 *
 * @param target
 * @param options
 */
export function useScreenOrientation(options?: { onChange?: (orientation: CoreTypes.DeviceOrientationType) => void }) {
  const orientationCore = new Orientation();
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
      if (options?.onChange) options.onChange(orientation.value);
    }
  }
  if (orientation.value === CoreTypes.DeviceOrientation.unknown) tryOrientation();

  orientationCore.onChangedOrientation((value: { newValue: CoreTypes.DeviceOrientationType }) => {
    orientation.value = value.newValue;
    if (options?.onChange) options.onChange(orientation.value);
  });

  onUnmounted(() => {
    orientationCore.offChangedOrientation();
  });
  const setOrientation = (value: 'landscape' | 'landscaperight' | 'landscapeleft' | 'portrait', animation: false) => orientationCore.setOrientation(value, animation);
  const enableRotation = () => orientationCore.enableRotation();
  const disableRotation = () => orientationCore.disableRotation();
  return {
    orientation: readonly(orientation),
    setOrientation,
    enableRotation,
    disableRotation,
  };
}
