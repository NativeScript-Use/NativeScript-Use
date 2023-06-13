
export declare class Keyboard {
    onChangeVisibility(callback: (isOpen: boolean) => void): void
    offChangeVisibility(): void
    isOpen(): boolean
    open(view: View): void
    close(): void
}