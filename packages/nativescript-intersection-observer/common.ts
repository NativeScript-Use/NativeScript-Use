import { Observable, ScrollEventData, ScrollView, View } from '@nativescript/core';

export abstract class IntersectionObserverCommon extends Observable {
  view: View;
  parentView: ScrollView;
  callback: (isVisible: boolean) => void;
  track(view: View, parentView: ScrollView, callback: (isVisible: boolean) => void) {
    this.view = view;
    this.parentView = parentView;
    this.callback = callback;
    parentView.on('scroll', this.onTrack.bind(this));
  }

  stopTrack() {
    this.parentView.off('scroll', () => this.onTrack);
  }

  private onTrack(data: ScrollEventData) {
    if (data.scrollY >= 0 && (data.object as View).getActualSize().height != 0) {
      this.callback(this.isVisible(this.view, this.parentView));
    }
  }

  abstract isVisible(view: View, parentView?: View): boolean;
}
