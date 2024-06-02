# @nativescript-use/nativescript-localstorage

```javascript
npm install @nativescript-use/nativescript-localstorage
```

Use localStorage like in the browser. 
This library uses [ApplicationSettings](https://docs.nativescript.org/core/application-settings) from NativeScript behind it.

## Usage
```ts
import localStorage from '@nativescript-use/nativescript-localstorage';

localStorage.setItem('myKey', "myValue");
localStorage.getItem('myKey'); // -> "myValue"
localStorage.has('myKey');
localStorage.removeItem('myKey');
localStorage.length();
localStorage.clear();
```

## Extend LocalStorage class

You can define a storage with a prefix for all entries in ApplicationSettings like:

```ts
// BusinessStorage.ts
import { LocalStorage } from '@nativescript-use/nativescript-localstorage';

export enum BusinessKeys {
  NAME = 'name',
}

class BusinessStorage extends LocalStorage<BusinessKeys> {
  prefix = '_businnes_.';
}
const businessStorage = new BusinessStorage();
export default businessStorage;
```

And use it like.
```ts
import businessStorage, { BusinessKeys } from './BusinessStorage';

businessStorage.setItem(BusinessKeys.NAME, 'MyBusiness');
businessStorage.getItem(BusinessKeys.NAME);

```
This will generate the following entry in ApplicationSettings
```
_businnes_.name = 'MyBusiness'
```
## Type declaration
```ts
declare class LocalStorage<K extends string> {
    protected prefix: string;
    getItem<T>(key: K): T;
    setItem(key: K, data: any): void;
    has(key: K): boolean;
    removeItem(key: K): void;
    length(): number;
    clear(): void;
}
export declare const localStorage: LocalStorage<string>;
```
## License

Apache License Version 2.0
