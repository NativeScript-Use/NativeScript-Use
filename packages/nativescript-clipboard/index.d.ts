
export declare class Clipboard {
    abstract onCopy(callback: (text: string) => void): void
    abstract offCopy(): void
    abstract copy(text: string): boolean
    abstract read(): string
}
