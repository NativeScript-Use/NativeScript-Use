# @vallemar/nativescript-clipboard

```javascript
npm install @vallemar/nativescript-clipboard
```

## Usage

```ts
import { Clipboard } from "@vallemar/nativescript-clipboard"

const clipboard = new Clipboard();

// Copy text
clipboard.copy("My text");

// Read Clipboard
const currentClipboardValue = clipboard.read();

// Add listener
clipboard.onCopy((textCopied: string) =>{
  console.log(textCopied)
});
// Remove listener
clipboard.offCopy();
```

Type declaration
```ts
export declare class Clipboard {
    abstract onCopy(callback: (text: string) => void): void
    abstract offCopy(): void
    abstract copy(text: string): boolean
    abstract read(): string
}
```

## License

Apache License Version 2.0
