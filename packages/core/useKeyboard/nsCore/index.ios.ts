import { Application } from "@nativescript/core";
import { KeyboardBase } from "./core-common";


export class Keyboard extends KeyboardBase {
    private openListener: any;
    private closeListener: any;

    onChangeVisibility(callback: (isOpen: boolean) => void) {
        this.openListener = Application.ios.addNotificationObserver(UIKeyboardDidShowNotification, () => {
            callback(true);
        })
        this.closeListener = Application.ios.addNotificationObserver(UIKeyboardDidHideNotification, () => {
            callback(false);
        })
    }
    offChangeVisibility() {
        Application.ios.removeNotificationObserver(this.openListener, UIKeyboardDidShowNotification)
        Application.ios.removeNotificationObserver(this.closeListener, UIKeyboardDidHideNotification)
    }
    isOpen() {
        //TODO: implement
        //@ts-ignore
        console.log(UIApplication.sharedApplication.windows.containsObject(NSClassFromString("UIRemoteKeyboardWindow")));

        //@ts-ignore
        return UIApplication.sharedApplication.windows.containsObject(NSClassFromString("UIRemoteKeyboardWindow"))
        //   NSClassFromString("UIRemoteKeyboardWindow"), (Frame.topmost().nativeViewProtected as UIView).window.contains(where: { $0.isKind(of: keyboardWindowClass) }) 
    };

}