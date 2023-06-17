import { View } from '@nativescript/core';
import { Ref } from 'nativescript-vue';

export type ViewRef<T = View> = Ref<{ nativeView?: T }>;
