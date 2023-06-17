# @vallemar/nativescript-keyboard

```javascript
npm install @vallemar/nativescript-keyboard
```

## Usage

```ts
import { Keyboard } from "@vallemar/nativescript-keyboard"

const keyboard = new Keyboard();

// Open keyboard with focus
keyboard.keyboard(myView);

// Close keyboard
keyboard.close();

// Add listener
keyboard.onChangeVisibility((isOpen: boolean) =>{
  console.log(isOpen)
});
// Remove listener
keyboard.offChangeVisibility();
```

Type declaration
```ts
export declare class Keyboard {
  onChangeVisibility(callback: (isOpen: boolean) => void): void
  offChangeVisibility(): void
  isOpen(): boolean
  open(view: View): void
  close(): void
}
```

## License

Apache License Version 2.0

