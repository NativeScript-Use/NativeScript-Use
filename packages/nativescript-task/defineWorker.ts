import { JSONfn } from './JSONfn';

export const defineWorker = (options: { imports?: {} } = {}) => {
  self.onmessage = function (msg: any) {
    var request: { func: { body: string; attachToContextFunctions?: any }; state: any; imports?: string[] } = JSON.parse(msg.data);

    var func = JSONfn.parse(request.func.body);

    var attachToContextFunctions = {};

    if (request.func.attachToContextFunctions && Object.keys(request.func.attachToContextFunctions).length > 0) {
      attachToContextFunctions = Object.keys(request.func.attachToContextFunctions).reduce((resultObject: any, keyFunction: string) => {
        resultObject[keyFunction] = JSONfn.parse(request.func.attachToContextFunctions[keyFunction]);
        return resultObject;
      }, {});
    }

    var result;
    if (func) {
      result = func({
        state: request.state,
        ...options?.imports,
        ...attachToContextFunctions,
        onProgressUpdate: (dataUpdate: any) => self.postMessage(JSON.stringify({ dataUpdate: dataUpdate ?? null, onProgressUpdate: true })),
      });
    }

    if (result) {
      result = JSON.stringify(result);
    }
    self.postMessage(result);
  };
};
