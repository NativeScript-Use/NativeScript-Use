export declare interface MediaQueryList {
  readonly matches: boolean;
  readonly media: string;
  onchange: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null;
  addListener(listener: MediaQueryListListener): void;
  removeListener(listener: MediaQueryListListener): void;
}

export declare type MediaQueryListListener = (mql: MediaQueryList) => void;

export declare interface MediaQueryListEvent {
  readonly matches: boolean;
  readonly media: string;
}

export declare function matchMedia(mediaQueryString: string): MediaQueryList;
