import { View } from '@nativescript/core';
import { Ref, ShallowRef } from 'nativescript-vue';

type NativeElement<T> = {
  nativeView?: T;
  $el?: {
    nativeView: T;
  };
};

export type ViewRef<T = View> = T | Ref<T | NativeElement<T>> | Readonly<ShallowRef<T | NativeElement<T>>>;
