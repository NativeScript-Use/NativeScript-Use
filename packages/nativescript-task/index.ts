import { Observable } from '@nativescript/core';
import { JSONfn } from './JSONfn';
export * from './defineWorker';

/**
 * Describes a task function.
 *
 * @param {TState} [state] The optional value to submit to the function.
 *
 * @return {TResult} The result of the function.
 */
export type TaskFunc<TState, TResult, TUpdate> = (ctx: TaskContext<TState, TUpdate>) => TResult;
export type TaskFuncUpdate<TUpdate> = (update: { data: TUpdate }) => void;

export interface OnData<Data> {
  data: Data;
}
/**
 * Describes a task context.
 */
export interface TaskContext<TState = any, TUpdate = any> {
  state: TState;
  onProgressUpdate: (dataUpdate: TUpdate) => void;
  [key: string]: any;
}

/**
 * Describes a result of a task.
 */
export interface TaskResult<TState, TResult> {
  /**
   * The result data (on success)
   */
  data?: TResult;

  /**
   * The error (if occurred)
   */
  error?: any;

  /**
   * The submitted value.
   */
  state?: TState;
}

export interface TaskUpdate<TUpdate> {
  /**
   * The update data (on update)
   */
  data: TUpdate;
}

/**
 * List of task states.
 */
export enum TaskStatus {
  Starting,
  /**
   * The task has been initialized but has not yet been invoked.
   */
  Created,

  /**
   * The task completed due to an unhandled exception.
   */
  Faulted,

  /**
   * The task completed execution successfully.
   */
  RanToCompletion,

  /**
   * The task is running but has not yet completed.
   */
  Running,

  /**
   * The task has been scheduled for execution but has not yet begun executing.
   */
  WaitingToRun,
}
type GeneralCallback = ((data: any | undefined) => void) | undefined;
export type GlobalWorkerConfiguration = { stickyWorker?: boolean; moduleWorker?: boolean; newWorkerIfGlobalIsUsed?: boolean; startGlobalWorker?: boolean };
export type DataWorker = { worker?: Worker; isGlobal: boolean; running: boolean; globalResolve?: { [key: string]: GeneralCallback }; globalReject?: { [key: string]: GeneralCallback }; globalOnUpdate?: { [key: string]: GeneralCallback } };
let dataGlobalWorker: DataWorker = { worker: null!, isGlobal: true, running: false, globalResolve: {}, globalReject: {}, globalOnUpdate: {} };
let globalConfiguration: GlobalWorkerConfiguration = { stickyWorker: true, newWorkerIfGlobalIsUsed: true, moduleWorker: false, startGlobalWorker: true };

/**
 * A task.
 */
export class Task<TState, TResult, TUpdate> extends Observable {
  /**
   * Stores the function to invoke.
   */
  protected readonly _FUNC: TaskFunc<TState, TResult, TUpdate>;
  protected readonly _FUNC_UPDATE?: TaskFuncUpdate<TUpdate>;
  /**
   * Stores the error of the last execution.
   */
  protected _error: any;
  /**
   * Stores the current task state.
   */
  protected _status: TaskStatus = TaskStatus.Starting;

  protected dataWorker: DataWorker = { worker: null!, isGlobal: false, running: false };
  protected id = '';
  /**
   * Initializes a new instance of that class.
   *
   * @param {TaskFunc<TState, TResult>} func The function to invoke.
   */
  constructor(func: TaskFunc<TState, TResult, TUpdate>, funcUptade?: TaskFuncUpdate<TUpdate>) {
    super();
    if (func !== null && func !== undefined) {
      if (typeof func !== 'function') {
        throw "'func' must be a function!";
      }
    }

    this._FUNC = func;
    this._FUNC_UPDATE = funcUptade;

    this.updateStatus(TaskStatus.Created);
  }

  public static globalWorkerConfig(options: GlobalWorkerConfiguration) {
    globalConfiguration = { ...globalConfiguration, ...options };
    if (globalConfiguration.startGlobalWorker) {
      Task.initGlobalWorker({ moduleWorker: globalConfiguration.moduleWorker ?? false });
    }
  }

  public static initGlobalWorker(options: { moduleWorker: boolean } = { moduleWorker: false }): Worker {
    if (dataGlobalWorker.worker == null) {
      if (options.moduleWorker === true) {
        dataGlobalWorker.worker = new Worker('./worker');
      } else {
        dataGlobalWorker.worker = new Worker('@/globalWorker');
      }
    }
    return dataGlobalWorker.worker;
  }

  public static finishGlobalWorker() {
    dataGlobalWorker.worker?.terminate();
    dataGlobalWorker.worker = null!;
    dataGlobalWorker.running = false;
  }

  /**
   * Creates a new task.
   *
   * @param {TaskFunc<TResult>} func The function to invoke.
   *
   * @return {Task<TResult>} The new task.
   */
  public static newTask<TResult, TUpdate>(func: TaskFunc<any, TResult, TUpdate>, onProgressUpdate?: TaskFuncUpdate<TUpdate>): Task<any, TResult, TUpdate> {
    return new Task<any, TResult, TUpdate>(func, onProgressUpdate);
  }

  /**
   * Creates and starts a new task.
   *
   * @param {TaskFunc<TResult>} func The function to invoke.
   * @param {TState} [state] The optional value / object for the execution.
   *
   * @return {Promise<TResult>} The promise.
   */
  public static start<TState, TResult, TUpdate>(func: TaskFunc<TState, TResult, TUpdate>, options?: { state?: TState; onProgressUpdate?: TaskFuncUpdate<TUpdate>; attachToContextFunctions?: {}; performance?: boolean }): Promise<TaskResult<TState, TResult>> {
    return Task.newTask<TResult, TUpdate>(func, options?.onProgressUpdate).start(options);
  }

  /**
   * Gets the error of the last execution.
   */
  public get error(): any {
    return this._error;
  }

  /**
   * Gets the underyling function to invoke.
   */
  public get func(): TaskFunc<TState, TResult, TUpdate> {
    return this._FUNC;
  }

  /**
   * Gets the underyling upudate function to invoke.
   */
  public get funcUpdate(): TaskFuncUpdate<TUpdate> | undefined {
    return this._FUNC_UPDATE;
  }

  public getWorker(): DataWorker {
    if (globalConfiguration.newWorkerIfGlobalIsUsed && dataGlobalWorker.running) {
      return { worker: this.newWorker(), isGlobal: false, running: false };
    }

    if (dataGlobalWorker.worker === null) {
      dataGlobalWorker.worker = this.newWorker();
      return { worker: dataGlobalWorker.worker, isGlobal: true, running: false };
    } else {
      return { worker: dataGlobalWorker.worker, isGlobal: true, running: false };
    }
  }

  private newWorker() {
    if (globalConfiguration.moduleWorker === true) {
      return new Worker('./worker');
    } else if (!globalConfiguration.moduleWorker) {
      return new Worker('@/globalWorker');
    }
  }

  /**
   * Starts the task.
   *
   * @param {TState} [state] The optional value to submit to the function.
   *
   * @return {Promise<TaskResult<TState, TResult>>} The promise.
   */

  public start<TState>(options?: { state?: TState; attachToContextFunctions?: { [key: string]: any }; performance?: boolean }): Promise<TaskResult<TState, TResult>> {
    this.id = Date.now().toString();
    let me = this;

    return new Promise<TaskResult<TState, TResult>>((resolve, reject) => {
      let completed = (id: string, err: any, data?: TResult) => {
        if (err) {
          const rejectFunction = me.getReject(id, reject);
          if (rejectFunction) {
            rejectFunction({
              error: err,
              state: options?.state,
            });
          }
        } else {
          const resolveFunction = me.getResolve(id, resolve);
          if (resolveFunction) {
            resolveFunction({
              data: data,
              state: options?.state,
            });
          }
        }
        if (options?.performance) {
          console.timeEnd('RunWorker');
        }
        me.removeGlobalCallback(id);
        me.checkTerminateWorker(data);
        me.updateError(err);
      };

      switch (me._status) {
        case TaskStatus.Created:
        case TaskStatus.Faulted:
        case TaskStatus.RanToCompletion:
          break;

        default:
          completed('', new Error(`Cannot start while in '${TaskStatus[me._status]}' state!`));
          return;
      }

      try {
        me.updateStatus(TaskStatus.WaitingToRun);
        me.dataWorker = me.getWorker();
        const worker: Worker = me.dataWorker.worker as Worker;
        me.dataWorker.running = true;
        if (me.dataWorker.isGlobal && dataGlobalWorker.globalResolve && dataGlobalWorker.globalReject && dataGlobalWorker.globalOnUpdate) {
          dataGlobalWorker.running = true;
          dataGlobalWorker.globalResolve[me.id] = resolve;
          dataGlobalWorker.globalReject[me.id] = reject;
          dataGlobalWorker.globalOnUpdate[me.id] = me._FUNC_UPDATE;
        }

        worker.onmessage = function (msg) {
          let message = msg.data;
          let executionId = '';
          if (message) {
            message = JSON.parse(message);
            executionId = message.id;
          }

          if (message?.onProgressUpdate === true) {
            const onUpdateFuncion = me.getOnUpdate(executionId);
            if (onUpdateFuncion) {
              onUpdateFuncion({ data: message.dataUpdate });
            }
          } else {
            me.updateStatus(TaskStatus.RanToCompletion);
            completed(executionId, null, message.result);
          }
        };

        worker.onerror = function (err) {
          const idExecution = JSON.parse(err.message.replace('Uncaught Error: ', ''))?.id;
          me.updateStatus(TaskStatus.Faulted);
          completed(idExecution, err);
        };

        let func: any;

        if (me._FUNC) {
          func = {};
          func.body = JSONfn.stringify(me._FUNC);
          if (options?.attachToContextFunctions && Object.keys(options?.attachToContextFunctions).length > 0) {
            // @ts-ignore
            const functionsToAttach = Object.keys(options.attachToContextFunctions).reduce((resultObject: any, keyFunction: string) => {
              // @ts-ignore
              resultObject[keyFunction] = JSONfn.stringify(options.attachToContextFunctions[keyFunction]);
              return resultObject;
            }, {});
            func.attachToContextFunctions = functionsToAttach;
          }
        }

        if (options?.performance) {
          console.time('RunUI');
          // @ts-ignore
          me._FUNC({ state: options?.state, ...options?.attachToContextFunctions });
          console.timeEnd('RunUI');
          console.time('RunWorker');
        }
        me.updateStatus(TaskStatus.Running);
        worker.postMessage(
          JSON.stringify({
            id: me.id,
            func: func,
            state: options?.state,
          })
        );
      } catch (e) {
        console.log(e);
        me.updateStatus(TaskStatus.Faulted);
        completed(me.id, e);
      }
    });
  }

  private getReject(id: string, reject: (data: any) => void) {
    if (this.dataWorker.isGlobal) {
      return dataGlobalWorker.globalReject ? dataGlobalWorker.globalReject[id] : null;
    }
    return reject;
  }
  private getResolve(id: string, resolve: (data: any) => void) {
    if (this.dataWorker.isGlobal) {
      return dataGlobalWorker.globalResolve ? dataGlobalWorker.globalResolve[id] : null;
    }
    return resolve;
  }

  private getOnUpdate(id: string) {
    if (this.dataWorker.isGlobal) {
      return dataGlobalWorker.globalOnUpdate ? dataGlobalWorker.globalOnUpdate[id] : null;
    }
    return this._FUNC_UPDATE;
  }

  private removeGlobalCallback(id: string) {
    if (dataGlobalWorker.globalResolve && dataGlobalWorker.globalResolve[id]) delete dataGlobalWorker.globalResolve[id];
    if (dataGlobalWorker.globalReject && dataGlobalWorker.globalReject[id]) delete dataGlobalWorker.globalReject[id];
    if (dataGlobalWorker.globalOnUpdate && dataGlobalWorker.globalOnUpdate[id]) delete dataGlobalWorker.globalOnUpdate[id];
  }

  private checkTerminateWorker(result: any) {
    if ((!this.dataWorker.isGlobal && result?.onProgressUpdate !== true) || (!globalConfiguration.stickyWorker && dataGlobalWorker.isGlobal && dataGlobalWorker.globalResolve && Object.keys(dataGlobalWorker.globalResolve).length === 0)) {
      this.dataWorker.worker?.terminate();
      this.dataWorker.worker = null!;
      if (this.dataWorker.isGlobal) {
        Task.finishGlobalWorker();
      }
    }
    if (result?.onProgressUpdate !== true) {
      this.dataWorker.running = false;
      if (this.dataWorker.isGlobal && dataGlobalWorker.globalResolve && Object.keys(dataGlobalWorker.globalResolve).length === 0) dataGlobalWorker.running = false;
    }
  }

  /**
   * Gets the current status.
   */
  public get status(): TaskStatus {
    return this._status;
  }

  /**
   * Updates the error value.
   *
   * @param {TaskStatus} newValue The new value.
   *
   * @return {boolean} Property change has been raised for 'error' property or not.
   */
  protected updateError(newValue: any): boolean {
    if (newValue !== this._error) {
      this._error = newValue;

      this.notifyPropertyChange('error', newValue);
      return true;
    }

    return false;
  }

  /**
   * Updates the current status.
   *
   * @param {TaskStatus} newValue The new value.
   *
   * @return {boolean} Property change has been raised for 'status' property or not.
   */
  protected updateStatus(newValue: TaskStatus): boolean {
    if (newValue !== this._status) {
      this._status = newValue;

      this.notifyPropertyChange('status', newValue);
      return true;
    }

    return false;
  }
}
