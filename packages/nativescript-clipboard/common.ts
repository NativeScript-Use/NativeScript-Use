
export abstract class ClipboardBase {
    protected listener: any
    abstract onCopy(callback: (text: string) => void): void
    abstract offCopy(): void
    abstract copy(text: string): boolean
    abstract read(): string
}