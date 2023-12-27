<script setup>
import Source from '../../.vitepress/theme/components/Source.vue'
</script>

# useWorker

Reactive worker for multiprocessing.

This composable provides a module to use complete and easy-to-use multiprocessing ⚡. 

NativeScript runs in the main thread, just like native applications do. We also have the Workers module available to allow processing in a thread other than the user interface. This allows us to keep the UI thread free to hold animations and touch events and any interactions without any blocking.

This module facilitates the use of the workers module, launching the function that we pass to `useWorker` to a worker and thus keeping the main thread free for the user.

This module is based on [@nativescript-use/nativescript-task](https://github.com/NativeScript-Use/NativeScript-Use/tree/main/packages/nativescript-task).

## Understanding how the module works and configuration

With the default values this module will initialize a worker that will be available during the lifetime of the application, this is to save the worker startup time and launch the tasks to a worker that will always be available to execute tasks (in the documentation we will call it global worker or stickyWorker).

Additionally, this module manages the use of the global worker and if it is in use by a task, it will send its tasks to another worker that will create and terminate when said task is finished.

We can modify all this operation with the next configuration.

```ts
// app.ts | main.ts (entry file app)

import { Task } from "@nativescript-use/vue";

Task.globalWorkerConfig({
    stickyWorker: true,
    newWorkerIfGlobalIsUsed: true,
    startGlobalWorker: true
});

// run app
```

- `stickyWorker` - default `true`: When set to true the plugin always keeps a worker running to launch your tasks to this worker. This saves time when launching the task since initializing a worker takes time, by default it is true to launch each task as quickly as possible. If set to false the plugin will initialize a worker and terminate each task. 
- `newWorkerIfGlobalIsUsed` - default `true`: When `stickyWorker` is true and we have a worker always running, if we launch a task and the main worker is running with another task, a new worker will be created to launch this task and not wait for the previous task to finish. If you disable this flag and launch another task while one is running, it will have to wait until it reaches the beginning of the queue. 
- `startGlobalWorker` - default `true`: Initialize the global worker when the configuration is set, it will be available when you launch your first task. If disabled, when the first task is launched it will have the worker creation delay.

Note: when the worker execution time is mentioned we are talking about about 200ms (it is almost nothing). It's not much, but this plugin prioritizes speed, which is why we keep a `stickyWorker` always available.

## Basic Usage

```vue
<script lang="ts" setup>
import { useWorker } from "@nativescript-use/vue";
import { onMounted, ref, watch } from "nativescript-vue";

const myReactiveData = ref({ title: "Reactive data in background", value: 1000 });

const { 
  result, // reactive return value
  update, // reactive update value 
  isRunning, // reactive isRunning worker 
  isFinish, // reactive isFinish worker 
  error, // reactive string error value 
  runTask // function to run task
} = useWorker((ctx) => {
  console.log("Running in background with data: " + JSON.stringify(ctx.state));
  return ctx.state.value + 10;
}, { state: myReactiveData })

onMounted(() => {
  runTask();
})


watch(result, () => {
  //On change result
  console.log("New result from background " + result.value);
  setTimeout(() => {
    myReactiveData.value = { title: "New Reactive data in background", value: Math.floor(Math.random() * (10000 - 1 + 1) + 1) }
    runTask();
  }, 500);
})
</script>
```
## useWorker configuracion

```ts
{
    state?: Ref<TState> | TState,
    initialResult?: TResult,
    runOnChangeState?: boolean,
    attachToContextFunctions?: {},
    inmediate?: boolean,
    performance?: boolean,
    on?: {
        progressUpdate?: (update: { data: TUpdate }) => void
        completed?: (data: TResult) => void,
        error?: (error: string) => void,
    }
}
```

- `state`: data that will be passed to the context of the function to be executed.
- `initialResult`: is the default reactive object `result` that will be returned when implementing the `useWorker` composable.
- `runOnChangeState`: If set to true and `state` is Ref or Reactive the function will be executed with each change made to the object passed `state`.
- `attachToContextFunctions`: allows adding functions external to the worker to the worker context. See [inline-functions](#inline-functions).
- `inmediate`: If set to true the worker will run immediately.
- `performance`: Utility to check how long a function takes outside the worker and inside it. Useful to check the function execution time and whether you should send this task to the background or not. Use this only in development mode.
- `on:{ progressUpdate }`: Callback that we can invoke from the worker to send updates to the main thread before the worker has finished. See [onProgressUpdate](#onprogressupdate).
- `on:{ completed }`: Callback that will be executed when the task has finished successfully.
- `on:{ error }`: Callback that will be executed when the task has finished with an error.

## Inline functions

See `attachToContextFunctions` option. 
```vue
<script lang="ts" setup>
import { useWorker } from "@nativescript-use/vue";

function fibonacci(num: number): number {
    if (num <= 1) return 1;
    return fibonacci(num - 1) + fibonacci(num - 2);
}

const { runTask, result } = useWorker((ctx) => {
  return fibonacci(ctx.state);
}, { state: 43, attachToContextFunctions: { fibonacci } });

</script>
```

## `onProgressUpdate`

See `onProgressUpdate` option and reactive `update`. 
```vue
<script lang="ts" setup>
import { useWorker } from "@nativescript-use/vue";

const { runTask, update } = useWorker((ctx) => {
  // Action in background
  ctx.onProgressUpdate({ title: "Loading image", value: "10%" });
  // Continue action in background
  ctx.onProgressUpdate({ title: "Transforming image", value: "50%" });
  // Continue action in background
  ctx.onProgressUpdate({ title: "Saving image", value: "90%" });
  // Finish action in background
  return { finish: true };
}, {
  state: { file: "file.png" },
  on: {
    progressUpdate(updateData) {
      // This value would be the first execution:  { title: "Loading image", value: "10%" }
      console.log(updateData.data);
      // update.value is the reactive object that will also have the value { title: "Loading image", value: "10%" }
      console.log(update.value);
    }
  }
});

</script>
```

## Using dependencies

We need to define a worker with the imports that we want to have defined in our tasks. We define the file `globalWorker.ts|js` in the `src|app` folder of our project, import the modules that we want to have available and pass them to the `defineWorker` function that this library provides.

```ts
// /app/globalWorker.ts|js
import '@nativescript/core/globals';
import { defineWorker } from "@nativescript-use/vue";

import { myUtils } from '@utils';
import { otherLib } from 'other-lib';

defineWorker({ imports: { myUtils, otherLib } });
```

Now access the modules defined in the globalWorker file from the context.
```ts
import { useWorker } from "@nativescript-use/vue";
import { myUtils } from '@utils';
import { otherLib } from 'other-lib';

const { runTask, result } = useWorker((ctx) => {
  return myUtils.someFunction(1000) + otherLib.otherFunction(ctx.state);
}, { state: 100 })
```

## Source
<Source source="useWorker" demo="WorkerView.vue"/>

## Type declaration
```ts
import { Ref, ComputedRef } from "nativescript-vue";
import { TaskFunc } from '@nativescript-use/nativescript-task';
import { Ref, UnwrapRef, DeepReadonly } from 'nativescript-vue';
export * from "@nativescript-use/nativescript-task";

/**
 * Reactive worker for multiprocessing.
 */
export declare function useWorker<TState, TResult, TUpdate>(fun: TaskFunc<UnwrapRef<TState>, TResult, TUpdate>, options?: {
    state?: Ref<TState> | TState;
    initialResult?: TResult;
    runOnChangeState?: boolean;
    attachToContextFunctions?: {};
    inmediate?: boolean;
    performance?: boolean;
    on?: {
        progressUpdate?: (update: {
            data: TUpdate;
        }) => void;
        completed?: (data: TResult) => void;
        error?: (error: string) => void;
    };
}): {
    result: Readonly<Ref<DeepReadonly<UnwrapRef<TResult>>>>;
    update: Readonly<Ref< readonly data: DeepReadonly<TUpdate> }>>;
    isRunning: Readonly<Ref<boolean>>;
    isFinish: Readonly<Ref<boolean>>;
    error: Readonly<Ref<string>>;
    runTask: (newData?: Ref<TState> | TState) => void;
};

```

## Core dependency
[@nativescript-use/nativescript-task](https://github.com/NativeScript-Use/NativeScript-Use/tree/main/packages/nativescript-task)