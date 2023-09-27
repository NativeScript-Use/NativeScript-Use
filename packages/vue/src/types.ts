import { View } from '@nativescript/core';
import { Ref } from 'nativescript-vue';

export type ViewRef<T = View> = T | Ref<T | { nativeView?: T; $el?: { nativeView: T } }>;
