import { Utils, View } from "@nativescript/core";



export abstract class KeyboardBase {

    abstract offChangeVisibility(): void
    abstract onChangeVisibility(callback: (isOpen: boolean) => void): void
    abstract isOpen(): boolean

    open(view: View) {
        if (view && view["focus"]) {
            view.focus();
        } else {
            console.log("Error open keyboard");
        }
    }

    close() {
        Utils.dismissKeyboard();
    }
}