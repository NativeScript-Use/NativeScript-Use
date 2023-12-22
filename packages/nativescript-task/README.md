# @nativescript-use/nativescript-task

```javascript
npm install @nativescript-use/nativescript-task
```

A [NativeScript](https://nativescript.org/) module for simply handling background tasks via web workers. 

This module will initialize a worker that will be available during the lifetime of your application and will be able to execute any task on it.

This lib provides online workers with promises and updates.

## Examples
### Without using dependencies

```ts
import { Task } from "@nativescript-use/nativescript-task";

// TS <number, string, boolean> = <InitialData, ReturnData, OnProgressData>
Task.start<number, string, boolean>((ctx) => {
  // ⚡ This function runs in the background
  ctx.onProgressUpdate(false);
  return ctx.state === 1000 ? "YES" : "NO";
}, {
    state: 1000,
    onProgressUpdate(update) {
      console.log(update.data);
    }
})
  .then((result) => {
    console.log('Result: ' + result.data);  // "YES"
  })
  .catch((result) => {
    console.log('ERROR: ' + result.error);
    // result.state = 1000
  });
```

### Using inline functions

We can add local functions to run inside the worker using `attachToContextFunctions`.

```ts
import { Task, TaskContext } from "@nativescript-use/nativescript-task";

const myFunction = (ctx: TaskContext) => 5 + ctx.state;
const myOtherFunction = (ctx: TaskContext) => 20 + ctx.state;

Task.start((ctx) => {
            return ctx.myFunction(ctx) + ctx.myOtherFunction(ctx);
        }, {
            state: 10,
            attachToContextFunctions: { myFunction, myOtherFunction }
        })
```


### Using dependencies

We initialize our worker with the `moduleWorker: true` flag, this will cause the library to import the worker that is defined in the next step.

```ts
// app.ts | main.ts (entry file app)

import { Task } from "@nativescript-use/nativescript-task";

Task.initGlobalWorker({ moduleWorker: true });

// run app
```

We need to define a worker with the imports that we want to have defined in our tasks. We define the file `globalWorker.ts|js` in the `src|app` folder of our project, import the modules that we want to have available and pass them to the `defineWorker` function that this library provides.

```ts
// /app/globalWorker.ts

import { defineWorker } from "@nativescript-use/nativescript-task";
import '@nativescript/core/globals';

import { myUtils } from '@utils';
import { otherLib } from 'other-lib';

defineWorker({ imports: { otherLib } });
```

Now access the modules defined in the globalWorker file from the context.
```ts
import { Task } from "@nativescript-use/nativescript-task";

Task.start((ctx) => {
  // access imported modules
  return ctx.myUtils.someFunction(1000) + ctx.otherLib.otherFunction(ctx.state);
}, { state: 1000 })
  .then((result) => {
    console.log('Result: ' + result.data); 
  })
```

TIP: If you want to have TS typing you can do it as shown below
```ts
import { Task } from "@nativescript-use/nativescript-task";
import { myUtils } from '@utils';
import { otherLib } from 'other-lib';

Task.start((ctx) => {
  const utils = ctx.myUtils as typeof myUtils; // <-- THIS
  const lib = ctx.otherLib as typeof otherLib; // <-- THIS
  return utils.someFunction(1000) + lib.otherFunction(ctx.state);
}, { state: 1000 })
```



## Limitations

* Only submit and return serializable objects and values.
* All task functions are 'closures', what means that you CANNOT access variables outside such functions. All functions are serialized as strings and submitted to the [worker script](https://github.com/mkloubert/nativescript-tasks/blob/master/plugin/worker.js) where "external stuff" is NOT available! The only way to share data with the functions is to submit an optional and serializable "state value".

Read the [official documentation](https://docs.nativescript.org/guide/multithreading) to get more information.


For more information you can enter the [NativeScript discord server](https://discord.com/invite/RgmpGky9GR)!

This plugin is largely based on https://github.com/mkloubert/nativescript-tasks

## License

Apache License Version 2.0

<h3 align="center">Made with ❤️</h3>


