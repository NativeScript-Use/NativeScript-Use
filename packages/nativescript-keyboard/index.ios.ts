import { Application } from '@nativescript/core';
import { KeyboardBase } from './common';

export class Keyboard extends KeyboardBase {
  private openListener: any;
  private closeListener: any;

  onChangeVisibility(callback: (isOpen: boolean, params: { height: number }) => void) {
    this.openListener = Application.ios.addNotificationObserver(UIKeyboardWillShowNotification, (notification) => {
      const keyboardRectangle = notification.userInfo.objectForKey('UIKeyboardFrameEndUserInfoKey') as NSValue;
      callback(true, { height: keyboardRectangle?.CGRectValue?.size?.height ?? 0 });
    });
    this.closeListener = Application.ios.addNotificationObserver(UIKeyboardWillHideNotification, () => {
      callback(false, { height: 0 });
    });
  }
  offChangeVisibility() {
    Application.ios.removeNotificationObserver(this.openListener, UIKeyboardWillShowNotification);
    Application.ios.removeNotificationObserver(this.closeListener, UIKeyboardWillHideNotification);
  }
  isOpen() {
    //TODO: implement
    //@ts-ignore
    console.log(UIApplication.sharedApplication.windows.containsObject(NSClassFromString('UIRemoteKeyboardWindow')));

    //@ts-ignore
    return UIApplication.sharedApplication.windows.containsObject(NSClassFromString('UIRemoteKeyboardWindow'));
    //   NSClassFromString("UIRemoteKeyboardWindow"), (Frame.topmost().nativeViewProtected as UIView).window.contains(where: { $0.isKind(of: keyboardWindowClass) })
  }
}
