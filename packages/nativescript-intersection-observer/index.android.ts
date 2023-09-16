import { ScrollView, Utils, View } from '@nativescript/core';
import { IntersectionObserverCommon } from './common';

export class IntersectionObserver extends IntersectionObserverCommon {
  displayMetrics: android.util.DisplayMetrics;

  constructor() {
    super();
    this.displayMetrics = new android.util.DisplayMetrics();
    Utils.android.getCurrentActivity().getWindowManager().getDefaultDisplay().getMetrics(this.displayMetrics);
  }

  isVisible(nsView: View, parentView?: ScrollView): boolean {
    const view: android.view.View = nsView.android;
    if (view == null) {
      return false;
    }
    if (!view.isShown()) {
      return false;
    }

    let actualPosition = new android.graphics.Rect();
    view.getGlobalVisibleRect(actualPosition);
    let screen = new android.graphics.Rect(0, 0, this.displayMetrics.widthPixels, this.displayMetrics.heightPixels);
    return actualPosition.intersect(screen);
  }
}

/* const scrollRef = ref()
const hola = ref()


useEventListener(scrollRef, {
    scroll: (data) => {
        if (data.scrollY > 0) {
            if (data.object.getActualSize().height != 0)
                console.log(isVisible(unrefView(hola)));
        }
    }
})

function isVisible(view: View) {
    if (view) {
        if (isAndroid) {
            view = view.android
            if (view == null) {
                return false;
            }
            if (!view.isShown()) {
                return false;
            }
            let displayMetrics = new android.util.DisplayMetrics();
            Utils.android.getCurrentActivity().getWindowManager()
                .getDefaultDisplay()
                .getMetrics(displayMetrics);
            let actualPosition = new android.graphics.Rect();
            view.getGlobalVisibleRect(actualPosition);
            let screen = new android.graphics.Rect(0, 0, displayMetrics.widthPixels, displayMetrics.heightPixels);
            return actualPosition.intersect(screen);
        } else {
            const myView = view.ios as UIView
            const scrollView = unrefView(scrollRef).ios as UIScrollView

            const thePosition = myView.frame;
            const container = CGRectMake(scrollView.contentOffset.x, scrollView.contentOffset.y, scrollView.frame.size.width, scrollView.frame.size.height)

            if (CGRectIntersectsRect(thePosition, container)) {
                console.log("HEREE HEREEHEREEHEREEHEREEHEREEHEREEHEREE");
                return true
            }

            return false
        }
    }

} */
