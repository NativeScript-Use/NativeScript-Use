import { View } from '@nativescript/core';
import { ViewRef } from '../types';

/**
 * Utility. Get View from Ref.
 *
 * @param target
 */
export function unrefView<T = View>(ref: T | any /*  ViewRef<T> */): T | undefined {
  if (ref?.value?.nativeView) return ref?.value.nativeView;
  if (ref?.value?.$el?.nativeView) return ref?.value?.$el?.nativeView;
  if (ref?.nativeView) return ref?.nativeView;
  if (ref?.$el?.nativeView) return ref?.$el?.nativeView;
  if (ref?.value instanceof View) return ref?.value;
  if (ref instanceof View) return ref as T;
  // @ts-ignore
  if (Array.isArray(ref?.value)) return (ref?.value as any[]).map((view) => unrefView(view)) as T[];
  // @ts-ignore
  if (Array.isArray(ref)) return (ref as any[]).map((view) => unrefView(view)) as T[];

  return undefined;
}
