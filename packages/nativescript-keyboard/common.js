import { Utils } from "@nativescript/core";
export class KeyboardBase {
    open(view) {
        if (view && view["focus"]) {
            view.focus();
        }
        else {
            console.log("Error open keyboard");
        }
    }
    close() {
        Utils.dismissKeyboard();
    }
}
//# sourceMappingURL=common.js.map