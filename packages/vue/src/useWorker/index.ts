import { OnData, Task, TaskFunc } from '@nativescript-use/nativescript-task';
import { Ref, UnwrapRef, isReactive, isRef, readonly, ref, shallowRef, unref, watch } from 'nativescript-vue';
export * from '@nativescript-use/nativescript-task';

/**
 * Reactive worker for multiprocessing.
 */
export function useWorker<TState, TResult, TUpdate>(
  vueFunction: TaskFunc<UnwrapRef<TState>, TResult, TUpdate>,
  options?: {
    state?: Ref<TState> | TState;
    initialResult?: TResult;
    runOnChangeState?: boolean;
    attachToContextFunctions?: {};
    inmediate?: boolean;
    performance?: boolean;
    on?: {
      progressUpdate?: (update: { data: TUpdate }) => void;
      completed?: (data: TResult) => void;
      error?: (error: string) => void;
    };
  }
) {
  const { initialResult = null, runOnChangeState = false, inmediate = false, performance = false } = options ?? {};

  let runningCount = 0;
  const result = ref<TResult | null>(initialResult);
  const update = ref<OnData<TUpdate>>();
  const isRunning = shallowRef(false);
  const isFinish = shallowRef(false);
  const error = shallowRef<string | null>(null);

  if (runOnChangeState === true && options?.state && (isRef(options.state) || isReactive(options.state))) {
    watch(options.state as Ref<any>, runTask, { deep: true });
  }

  function runTask(newData?: Ref<TState> | TState) {
    isRunning.value = true;
    isFinish.value = false;
    error.value = null;
    runningCount++;

    Task.start<UnwrapRef<TState>, TResult, TUpdate>(
      (ctx) => {
        return vueFunction(ctx);
      },
      {
        state: (unref(newData) ?? unref(options?.state)) as UnwrapRef<TState>,
        onProgressUpdate(updateData) {
          update.value = updateData;
          if (options?.on?.progressUpdate) {
            options.on.progressUpdate(updateData);
          }
        },
        attachToContextFunctions: { ...(options?.attachToContextFunctions ?? {}), ...{ vueFunction } },
        performance,
      }
    )
      .then((completed) => {
        result.value = completed.data as UnwrapRef<TResult>;
        if (options?.on?.completed) {
          options.on.completed(completed.data as TResult);
        }
      })
      .catch((result) => {
        error.value = JSON.stringify(result.error);
        if (options?.on?.error) {
          options.on.error(result.error);
        }
      })
      .finally(() => {
        runningCount--;

        if (runningCount == 0) {
          isRunning.value = false;
          isFinish.value = true;
        }
      });
  }
  if (inmediate === true) {
    runTask();
  }

  return {
    result: readonly(result),
    update: readonly(update),
    isRunning: readonly(isRunning),
    isFinish: readonly(isFinish),
    error: readonly(error),
    runTask,
  };
}
