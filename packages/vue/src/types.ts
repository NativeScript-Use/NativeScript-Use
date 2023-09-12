import { View } from '@nativescript/core';
import { Ref } from 'nativescript-vue';

//TODO: Refactor: export type ViewRef<T = View> = Ref<T | { nativeView?: T } | { $el?: { nativeView?: T } }>;
export type ViewRef<T = View> = Ref<T & { nativeView?: T } & { $el?: { nativeView?: T } }> | Ref<{ nativeView?: T } & T & { $el?: { nativeView?: T } }> | Ref<{ $el?: { nativeView?: T } } & T & { nativeView?: T }>;
