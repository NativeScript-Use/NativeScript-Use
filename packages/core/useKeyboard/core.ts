import { Utils, isAndroid, isIOS, Application, View } from "@nativescript/core"

export const keyboardCore = {
    listenerCount: 0,
    androidListener: null as any,
    iosUnregistrarOpen: null as any,
    iosUnregistrarClose: null as any,
    offChangeVisibility() {
        keyboardCore.listenerCount--;
        if (keyboardCore.listenerCount === 0) {
            if (isAndroid) {
                const rootView: android.view.View = Utils.android.getCurrentActivity().getWindow().getDecorView();
                rootView.getViewTreeObserver().removeOnGlobalLayoutListener(keyboardCore.androidListener)
            }
            if (isIOS) {
                Application.ios.removeNotificationObserver(keyboardCore.iosUnregistrarOpen, UIKeyboardDidShowNotification)
                Application.ios.removeNotificationObserver(keyboardCore.iosUnregistrarClose, UIKeyboardDidHideNotification)
            }
        }
    },
    onChangeVisibility(callback: (isOpen: boolean) => void) {
        keyboardCore.listenerCount++;

        if (isAndroid) {
            let windowVisibleDisplayFrame = new android.graphics.Rect();
            let lastVisibleDecorViewHeight = -1;
            const rootView: android.view.View = Utils.android.getCurrentActivity().getWindow().getDecorView();

            keyboardCore.androidListener = new android.view.ViewTreeObserver.OnGlobalLayoutListener({
                onGlobalLayout() {
                    rootView.getWindowVisibleDisplayFrame(windowVisibleDisplayFrame);
                    const visibleDecorViewHeight = windowVisibleDisplayFrame.height();

                    if (lastVisibleDecorViewHeight != 0) {
                        if (lastVisibleDecorViewHeight > visibleDecorViewHeight + 100) {
                            callback(true);
                        } else if (lastVisibleDecorViewHeight + 100 < visibleDecorViewHeight) {
                            callback(false);
                        }
                    }
                    lastVisibleDecorViewHeight = visibleDecorViewHeight;
                }
            })
            rootView.getViewTreeObserver().addOnGlobalLayoutListener(keyboardCore.androidListener)
        }
        if (isIOS) {
            keyboardCore.iosUnregistrarOpen = Application.ios.addNotificationObserver(UIKeyboardDidShowNotification, () => {
                callback(true);
            })
            keyboardCore.iosUnregistrarClose = Application.ios.addNotificationObserver(UIKeyboardDidHideNotification, () => {
                callback(false);
            })
        }
    },
    open(view: View) {
        if (isAndroid) {
            const imm = Utils.android.getApplicationContext().getSystemService(android.app.Activity.INPUT_METHOD_SERVICE) as android.view.inputmethod.InputMethodManager;
            imm.showSoftInput(view.nativeViewProtected, 0);
        } else if (isIOS) {
            if (view && view["focus"]) {
                view.focus();
            } else {
                console.log("Error open keyboard");
            }
        }
    },
    close() {
        Utils.dismissKeyboard();
    },
    isOpen() {
        if (isAndroid) {
            const imm: android.view.inputmethod.InputMethodManager = Utils.android.getCurrentActivity().getSystemService(android.content.Context.INPUT_METHOD_SERVICE);
            return imm.isAcceptingText();
        } else if (isIOS) {
            //TODO: implement
               //@ts-ignore
            console.log(UIApplication.sharedApplication.windows.containsObject(NSClassFromString("UIRemoteKeyboardWindow")));
            
            //@ts-ignore
            return UIApplication.sharedApplication.windows.containsObject(NSClassFromString("UIRemoteKeyboardWindow"))
           //   NSClassFromString("UIRemoteKeyboardWindow"), (Frame.topmost().nativeViewProtected as UIView).window.contains(where: { $0.isKind(of: keyboardWindowClass) }) 
        }
        return false;
    },
}