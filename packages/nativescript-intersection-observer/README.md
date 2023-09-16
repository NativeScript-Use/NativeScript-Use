# @nativescript-use/nativescript-clipboard

```javascript
npm install @nativescript-use/nativescript-intersection-observer
```

## Usage

```ts
import { IntersectionObserver } from "@nativescript-use/nativescript-intersection-observer"

const intersectionObserver = new IntersectionObserver();

// Track if `targetView` is visible
intersectionObserver.track(targetView, scollView, (isVisible) => {
    console.log("isVisible: " + isVisible);
})

// Stop track
intersectionObserver.stopTrack();

// Check if is visible view
const isVisible = intersectionObserver.isVisible(targetView, scollView);


Type declaration
```ts
export declare class IntersectionObserver {
    track(view: View, parentView: ScrollView, callback: (isVisible: boolean) => void): void;
    topTrack(parentView: ScrollView): void
    isVisible(view: View, parentView?: View): boolean;
}
```

## License

Apache License Version 2.0
