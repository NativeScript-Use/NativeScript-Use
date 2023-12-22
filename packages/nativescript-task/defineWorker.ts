import { JSONfn } from './JSONfn';

export const defineWorker = (options: { imports?: {} } = {}) => {
  self.onmessage = function (msg: any) {
    var request: { func: { body: string }; state: any; imports?: string[] } = JSON.parse(msg.data);

    var func = JSONfn.parse(request.func.body);
    var result;
    if (func) {
      result = func({
        state: request.state,
        ...options?.imports,
        onProgressUpdate: (dataUpdate: any) => self.postMessage(JSON.stringify({ dataUpdate: dataUpdate ?? null, onProgressUpdate: true })),
      });
    }

    if (result) {
      result = JSON.stringify(result);
    }
    self.postMessage(result);
  };
};
