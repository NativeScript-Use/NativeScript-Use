# @nativescript-use/nativescript-media-query

```javascript
npm install @nativescript-use/nativescript-media-query
```

## Usage

```ts
import { matchMedia, MediaQueryList } from "@nativescript-use/nativescript-media-query"

const mql: MediaQueryList = matchMedia("(min-width: 400)");

if (mql.matches) {
  /* The screen is at least 400 dpi wide */
} else {
  /* The screen is less than 400 dpi wide */
}


// Add listener
mql.onchange = (event: MediaQueryListEvent) => {
      // some logic
}); 

const myListener = () => console.log("Change!");
    
mql.addListener(myListener);

// Remove listener
mql.removeListener(myListener);

```

Type declaration
```ts
export interface MediaQueryList {
    readonly matches: boolean;
    readonly media: string;
    onchange: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null;
    addListener(listener: MediaQueryListListener): void;
    removeListener(listener: MediaQueryListListener): void;
}

export type MediaQueryListListener = (mql: MediaQueryList) => void;

export interface MediaQueryListEvent {
    readonly matches: boolean;
    readonly media: string;
}

export declare function matchMedia(mediaQueryString: string): MediaQueryList;

```

## License

Apache License Version 2.0



