import { Utils } from '@nativescript/core';
import { KeyboardBase } from './common';

export class Keyboard extends KeyboardBase {
  private listener: any;

  onChangeVisibility(callback: (isOpen: boolean, params: { height: number }) => void) {
    /*         let windowVisibleDisplayFrame = new android.graphics.Rect();
                let lastVisibleDecorViewHeight: number; */
    //https://stackoverflow.com/questions/25216749/soft-keyboard-open-and-close-listener-in-an-activity-in-android
    const rootView: android.view.View = Utils.android.getCurrentActivity()?.getWindow()?.getDecorView();
    if (rootView) {
      this.listener = new android.view.ViewTreeObserver.OnGlobalLayoutListener({
        onGlobalLayout() {
          const r = new android.graphics.Rect();
          // rootView.getWindowVisibleDisplayFrame(r)
          const height = rootView.getHeight();
          const view = Utils.android.getCurrentActivity().getWindow().getDecorView();
          view.getWindowVisibleDisplayFrame(r);
          const screenHeight = view.getHeight();
          const heightDifference = screenHeight - (r.bottom - r.top);

          console.log('heightDifference');
          console.log(heightDifference);
          console.log(height);
          console.log(r.bottom);
          console.log(height - r.bottom);
          console.log(height * 0.1399);

          if (height - r.bottom > height * 0.1399) {
            callback(true, { height: 0 });
          } else {
            callback(false, { height: 0 });
          }
          /*  rootView.getWindowVisibleDisplayFrame(windowVisibleDisplayFrame);
                     const visibleDecorViewHeight = windowVisibleDisplayFrame.height();
                     if (lastVisibleDecorViewHeight == -1)
                         lastVisibleDecorViewHeight = visibleDecorViewHeight + 101;
                     if (lastVisibleDecorViewHeight != 0) {
                         if (lastVisibleDecorViewHeight > visibleDecorViewHeight + 100) {
                             callback(true);
                         } else if (lastVisibleDecorViewHeight + 100 < visibleDecorViewHeight) {
                             callback(false);
                         }
                     }
                     lastVisibleDecorViewHeight = visibleDecorViewHeight; */
        },
      });
      rootView.getViewTreeObserver().addOnGlobalLayoutListener(this.listener);
    } else {
      console.log('Error on get RootView onChangeVisibility');
    }
  }
  offChangeVisibility() {
    const rootView: android.view.View = Utils.android.getCurrentActivity()?.getWindow()?.getDecorView();
    rootView?.getViewTreeObserver().removeOnGlobalLayoutListener(this.listener);
  }
  isOpen() {
    const imm: android.view.inputmethod.InputMethodManager = Utils.android.getCurrentActivity().getSystemService(android.content.Context.INPUT_METHOD_SERVICE);
    return imm.isAcceptingText();
  }
}
