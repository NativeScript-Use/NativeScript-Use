import { Utils } from '@nativescript/core';
import { LOG_PREFIX } from './constant';

export const warn = (text: any) => console.warn(`${LOG_PREFIX}${text}`);

export function toDeviceIndependent(size: any /* CoreTypes.dip | CoreTypes.LengthDipUnit | CoreTypes.LengthPxUnit */) {
  if (Utils.isNumber(size)) {
    return size;
  } else if (size?.unit) {
    if (size.unit === 'dip') return size;
    else if (size.unit === 'px') return Utils.layout.toDeviceIndependentPixels(size.value);
  }
  warn(`Impossible to extract the value in DPI`);
  return size;
}
