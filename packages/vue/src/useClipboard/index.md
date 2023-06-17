
# useClipboard

Reactive Clipboard API. Provides the ability to respond to clipboard commands.

## Usage

```vue
<script lang="ts" setup>

const {
  text, // Reactive current clipboard value (disabled by default)
  copied,
  copy,
  read
} = useClipboard({ sync: true });

</script>

<template>
  <Page>
    <StackLayout>
      <FlexboxLayout>
        <Label v-if="!copied">Reactive clipboard</Label>
        <Label v-else> Copied {{ text }}! </Label>
      </FlexboxLayout>
      <Button @tap="copy('Example copy text')" text="Copy"></Button>
    </StackLayout>
  </Page>
</template>
```
<br />

::: warning
By default clipboard synchronization is disabled, which means that if the user copies something within your application this function will not detect it. To enable synchronization and for the reactive variable `text` to be synchronized with the clipboard, you must enable `{ sync: true }`.
:::


## Type declaration
```ts
import { Ref } from "nativescript-vue";

/**
 * Reactive Clipboard API.
 */
export declare function useClipboard(options?: {
    sync?: boolean;
}): {
    text: Ref<string>;
    copied: Ref<boolean>;
    copy: (text: string) => void;
    read: () => string;
};
```
