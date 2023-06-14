
# onApplicationMounted

Secure hook to access the native main view.
<br />

There are times when we want to access the main view of the application or access the native side when starting the application or we want to have global functions that can be used when starting the application or at another point. `onApplicationMounted` ensures that the application is mounted, if it hasn't been mounted yet it will wait until you do and if it is mounted it will execute your code right away.

## Problem

```ts
// app.ts / main.ts
import { createApp } from 'nativescript-vue';
import { Application, Utils } from "@nativescript/core";

if(global.isAndroid){
  const activity = Utils.android.getCurrentActivity(); // 💀 will be undefined
}

// Or for iOS and Android
const viewRoot = Application.getRootView(); // 💀 will be undefined
const frame = Frame.topmost(); // 💀 will be undefined

createApp(Home).start();
```
<br />

## Solution

```ts
// app.ts / main.ts
import { createApp } from 'nativescript-vue';
import { Application, Utils } from "@nativescript/core";
import { onApplicationMounted } from '@vallemar/nativescript-vueuse';

onApplicationMounted(() => { // 👏 fixed with this
  if(global.isAndroid){
    const activity = Utils.android.getCurrentActivity(); 
  }

  // Or for iOS and Android
  const viewRoot = Application.getRootView(); 
  const frame = Frame.topmost(); 
})

createApp(Home).start();
```
<br />



## Type declaration
```ts
export declare const onApplicationMounted: (
  callback: () => void, 
  immediateCallback?: () => void // Optional. It will be executed immediately if the application is mounted, if it is not mounted it will not be called
) => void;

```
