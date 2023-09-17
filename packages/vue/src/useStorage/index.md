<script setup>
import Source from '../../.vitepress/theme/components/Source.vue'
</script>

# useStorage

Storage tool for NativeScript.

## Usage

```ts
import { useStorage } from '@nativescript-use/vue'

const storage = useStorage();
storage.setObject("key", { foo: "bar" });
```

## Source
<Source source="useStorage"/>

## Type declaration

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