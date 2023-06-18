import { Screen, Application } from '@nativescript/core';

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

export const matchMedia = (mediaQueryString: string) => {
  const factory = MediaQueryListFactory.getInstance();
  const mql = factory.create(mediaQueryString);

  factory.updateMatches();
  return mql;
};

class MediaQueryListImpl implements MediaQueryList {
  private listeners: Set<MediaQueryListListener> = new Set();
  public matches: boolean = false;

  constructor(public media: string) {}

  public onchange: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null = null;

  public addListener(listener: MediaQueryListListener): void {
    this.listeners.add(listener);
  }

  public removeListener(listener: MediaQueryListListener): void {
    this.listeners.delete(listener);
  }

  public dispatchChangeEvent(): void {
    const event: MediaQueryListEvent = {
      matches: this.matches,
      media: this.media,
    };

    for (const listener of this.listeners) {
      listener(this);
    }

    if (typeof this.onchange === 'function') {
      this.onchange.call(this, event);
    }
  }

  public updateMatches(matches: boolean): void {
    if (this.matches !== matches) {
      this.matches = matches;
      this.dispatchChangeEvent();
    }
  }
}

class MediaQueryListFactory {
  private static instance: MediaQueryListFactory;
  private lists: MediaQueryListImpl[] = [];

  private constructor() {}

  public static getInstance(): MediaQueryListFactory {
    if (!MediaQueryListFactory.instance) {
      MediaQueryListFactory.instance = new MediaQueryListFactory();
      // Condition for update
      Application.on('orientationChanged', () => {
        setTimeout(() => {
          MediaQueryListFactory.instance.updateMatches();
        }, 10);
      });
    }
    return MediaQueryListFactory.instance;
  }

  public create(media: string): MediaQueryListImpl {
    const mql = new MediaQueryListImpl(media);
    this.lists.push(mql);
    return mql;
  }

  public remove(mql: MediaQueryListImpl): void {
    const index = this.lists.indexOf(mql);
    if (index > -1) {
      this.lists.splice(index, 1);
    }
  }

  public updateMatches(): void {
    for (const mql of this.lists) {
      const queryParts = this.extractQueryParts(mql.media);
      const matches = this.checkMediaQuery(queryParts);
      mql.updateMatches(matches);
    }
  }

  private extractQueryParts(mediaQuery: string): string[] {
    const query = mediaQuery.trim().slice(1, -1);
    const parts = query.split(' and ');
    return parts.map((part) => part.replace('(', '').replace(')', '').trim());
  }

  private checkMediaQuery(queryParts: string[]): boolean {
    return queryParts.map((part) => evaluatePart(part)).every(Boolean);
  }
}

function evaluatePart(part: string): boolean {
  const [property, value] = part.split(':');
  const trimmedProperty = property.trim();
  const trimmedValue = value.trim();
  if (trimmedProperty.includes('width') || trimmedProperty.includes('height')) {
    const realWidth = Screen.mainScreen.widthDIPs;
    const realHeight = Screen.mainScreen.heightDIPs;
    console.log(trimmedProperty);

    if (trimmedProperty === 'width') {
      return parseInt(realWidth.toString(), 10) === parseInt(trimmedValue, 10);
    } else if (trimmedProperty === 'min-width') {
      return realWidth >= parseInt(trimmedValue, 10);
    } else if (trimmedProperty === 'max-width') {
      return realWidth <= parseInt(trimmedValue, 10);
    } else if (trimmedProperty === 'height') {
      return parseInt(realHeight.toString(), 10) === parseInt(trimmedValue, 10);
    } else if (trimmedProperty === 'min-height') {
      return realHeight >= parseInt(trimmedValue, 10);
    } else if (trimmedProperty === 'max-height') {
      return realHeight <= parseInt(trimmedValue, 10);
    }
  } else if (trimmedProperty === 'orientation') {
    return Application.orientation() === trimmedValue;
  } else {
    // TBD
    return false;
  }
}
