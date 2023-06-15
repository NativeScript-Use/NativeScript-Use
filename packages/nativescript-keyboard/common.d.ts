import { View } from "@nativescript/core";
export declare abstract class KeyboardBase {
    abstract offChangeVisibility(): void;
    abstract onChangeVisibility(callback: (isOpen: boolean) => void): void;
    abstract isOpen(): boolean;
    open(view: View): void;
    close(): void;
}
