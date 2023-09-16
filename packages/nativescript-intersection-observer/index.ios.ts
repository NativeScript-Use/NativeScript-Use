import { Screen, ScrollView, View } from '@nativescript/core';
import { IntersectionObserverCommon } from './common';

export class IntersectionObserver extends IntersectionObserverCommon {
  topBarHeight = 0;

  constructor() {
    super();
    this.topBarHeight = UIApplication?.sharedApplication?.statusBarFrame?.size?.height ?? 0;
  }

  isVisible(nsView: View, parentView?: ScrollView): boolean {
    const view = nsView.ios as UIView;
    const scrollView = parentView?.ios as UIScrollView;

    const position = view?.frame;
    if (position && scrollView) {
      const container = CGRectMake(scrollView.contentOffset.x, scrollView.contentOffset.y, scrollView.bounds.size.width, scrollView.bounds.size.height);
      return container && CGRectIntersectsRect(position, container);
    }

    return false;
  }
}
