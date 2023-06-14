import { Application } from "@nativescript/core";
import { ClipboardBase } from "./core-common";


export class Clipboard extends ClipboardBase {

    onCopy(callback: (text: string) => void): void {
        this.offCopy();
        this.listener = Application.ios.addNotificationObserver(UIPasteboardChangedNotification, () => {
            callback(this.read());
        })
    }

    offCopy(): void {
        if (this.listener)
            Application.ios.removeNotificationObserver(this.listener, UIPasteboardChangedNotification)
    }
    
    copy(text: string): boolean {
        const pasteboard = UIPasteboard.generalPasteboard;
        pasteboard.setValueForPasteboardType(text, 'public.utf8-plain-text');
        return true;
    }

    read(): string {
        const content = UIPasteboard.generalPasteboard.string || UIPasteboard.generalPasteboard.valueForPasteboardType(kUTTypePlainText);
        return content || "";
    }
}