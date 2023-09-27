import { View } from '@nativescript/core';
import { ViewRef } from '../types';

/**
 * Utility. Get View from Ref.
 *
 * @param target
 */
export function unrefView<T extends View = View>(ref: T | ViewRef<T>): T | undefined {
  if (ref instanceof View) return ref;
  if (ref?.value instanceof View) return ref?.value;
  if (ref?.value?.nativeView) return ref?.value.nativeView;
  if (ref?.value?.$el?.nativeView) return ref?.value?.$el?.nativeView;

  return undefined;
}
