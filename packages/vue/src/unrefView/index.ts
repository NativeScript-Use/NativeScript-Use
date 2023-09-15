import { View } from '@nativescript/core';
import { ViewRef } from '../types';

/**
 * Utility. Get View from Ref.
 *
 * @param target
 */
export function unrefView<T extends View = View>(ref: ViewRef<T>): T | undefined {
  return ref?.value instanceof View ? ref?.value : ref?.value?.$el?.nativeView ?? ref?.value?.nativeView ?? undefined;
}
