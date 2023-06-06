
# useStorage

Storage tool for NativeScript.
<br />

## Usage

```ts
import { useStorage } from '@vallemar/nativescript-vueuse'

const storage = useStorage();
storage.setObject("key", { foo: "bar" });
```
<br />

## Full methods

```ts
export declare const useStorage: () => {
    getObject: <T = any>(key: string, defaultValue?: T | undefined) => T;
    setObject: (key: string, value: any) => void;
    getString: (key: string, defaultValue?: string) => string;
    setString: (key: string, value: string) => void;
    getNumber: (key: string, defaultValue?: number) => number;
    setNumber: (key: string, value: number) => void;
    getBoolean: (key: string, defaultValue?: boolean) => boolean;
    setBoolean: (key: string, value: boolean) => void;
    remove: (key: string) => void;
    clear: () => void;
};

```