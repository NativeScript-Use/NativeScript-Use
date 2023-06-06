import {View} from "@nativescript/core";
import {Ref} from "nativescript-vue"

export type ViewRef<T extends View = View> = Ref<{ nativeView?: T }>
