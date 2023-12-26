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

const myFunction = (myNumber: number) => 5 + myNumber;
const myOtherFunction = (myNumber: number) => 20 + myNumber;

Task.start((ctx) => {
    return myFunction(ctx.state) + myOtherFunction(ctx.state);
}, { state: 10, attachToContextFunctions: { myFunction, myOtherFunction }})
```


### Using dependencies

We need to define a worker with the imports that we want to have defined in our tasks. We define the file `globalWorker.ts|js` in the `src|app` folder of our project, import the modules that we want to have available and pass them to the `defineWorker` function that this library provides.

```ts
// /app/globalWorker.ts
import '@nativescript/core/globals';
import { defineWorker } from "@nativescript-use/nativescript-task";

import { myUtils } from '@utils';
import { otherLib } from 'other-lib';

defineWorker({ imports: { otherLib } });
```

Now access the modules defined in the globalWorker file from the context.

```ts
import { Task } from "@nativescript-use/nativescript-task";
import { myUtils } from '@utils';
import { otherLib } from 'other-lib';

Task.start((ctx) => {
  // access imported modules
  return myUtils.someFunction(1000) + otherLib.otherFunction(ctx.state);
}, { state: 1000 })
  .then((result) => {
    console.log('Result: ' + result.data); 
  })
```

## Global configuration

```ts
// app.ts | main.ts (entry file app)

import { Task } from "@nativescript-use/nativescript-task";

Task.globalWorkerConfig({
    stickyWorker: true,
    newWorkerIfGlobalIsUsed: true,
    startGlobalWorker: true
});

// run app
```

- `stickyWorker` - default `true`: When set to true the plugin always keeps a worker running to launch your tasks to this worker. This saves time when launching the task since initializing a worker takes time, by default it is true to launch each task as quickly as possible. If set to false the plugin will initialize a worker and terminate each task. 
- `newWorkerIfGlobalIsUsed` - default `true`: When stickyWorker is true and we have a worker always running, if we launch a task and the main worker is running with another task, a new worker will be created to launch this task and not wait for the previous task to finish. If you disable this flag and launch another task while one is running, it will have to wait until it reaches the beginning of the queue. 
- `startGlobalWorker` - default `true`: Initialize the global worker when the configuration is set, it will be available when you launch your first task. If disabled, when the first task is launched it will have the worker creation delay.

Note: when the worker execution time is mentioned we are talking about about 200ms (it is almost nothing). It's not much, but this plugin prioritizes speed, which is why we keep a `stickyWorker` always available.

## Limitations

* Only submit and return serializable objects and values.
* All task functions are 'closures', what means that you CANNOT access variables outside such functions. All functions are serialized as strings and submitted to the [worker script](https://github.com/mkloubert/nativescript-tasks/blob/master/plugin/worker.js) where "external stuff" is NOT available! The only way to share data with the functions is to submit an optional and serializable "state value".

Read the [official documentation](https://docs.nativescript.org/guide/multithreading) to get more information.


For more information you can enter the [NativeScript discord server](https://discord.com/invite/RgmpGky9GR)!

This plugin is largely based on https://github.com/mkloubert/nativescript-tasks

## License

Apache License Version 2.0

<h3 align="center">Made with ❤️</h3>


