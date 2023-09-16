import { View } from '@nativescript/core';
import { IntersectionObserverCommon } from './common';

export declare class IntersectionObserver extends IntersectionObserverCommon {
  track(view: View, parentView: ScrollView, callback: (isVisible: boolean) => void): void;
  stopTrack(): void;
  isVisible(view: View, parentView?: ScrollView): boolean;
}
