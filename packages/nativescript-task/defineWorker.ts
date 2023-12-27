import { JSONfn } from './JSONfn';

const DEFAULT_PARAM_NAME = 'internalCtx';

export const defineWorker = (options: { imports?: {} } = {}) => {
  self.onmessage = function (msg: any) {
    const request: { id: string; func: { body: string; attachToContextFunctions?: any }; state: any; imports?: string[] } = JSON.parse(msg.data);
    try {
      //console.time('defineWorker');
      //console.timeEnd('defineWorker');
      let { paramUserName, functionString } = extractContextParamName(request.func.body);
      const { functionStrToAttach, attachToContextFunctions } = parseAttachToContextFunctions(request.func.attachToContextFunctions, paramUserName);

      functionString = injectContext(functionString, functionStrToAttach, paramUserName);
      const func = JSONfn.parse(functionString);
      let result;
      if (func) {
        result = func({
          state: request.state,
          ...options?.imports,
          ...attachToContextFunctions,
          onProgressUpdate: (dataUpdate: any) => self.postMessage(JSON.stringify({ dataUpdate: dataUpdate ?? null, id: request.id, onProgressUpdate: true })),
        });
      }

      if (result) {
        result = JSON.stringify({ ...{ id: request.id }, ...{ result: result } });
      }
      self.postMessage(result);
    } catch (error: any) {
      throw new Error(JSON.stringify({ id: request.id, error: error.toString() }));
    }
  };
};

function injectImports(functionString: string, paramUserName: string) {
  functionString = functionString.replaceAll(/([0-9],_.*?)(.*?__WEBPACK_IMPORTED_MODULE_.*?)(__.?)/g, paramUserName + '.');
  functionString = functionString.replaceAll(/( _.*?)(.*?__WEBPACK_IMPORTED_MODULE_.*?)(__.?)/g, ' ' + paramUserName + '.');
  return functionString;
}

function injectFunctionToAttach(functionString: string, functionStrToAttach: string[], paramUserName: string) {
  return functionString.replace(`_NuFrRa_(${paramUserName}) => {`, `_NuFrRa_(${paramUserName}) => {${functionStrToAttach.join(' ')}`);
}

function injectContext(functionString: string, functionStrToAttach: string[], paramUserName: string) {
  return injectFunctionToAttach(injectImports(functionString, paramUserName), functionStrToAttach, paramUserName);
}

function extractContextParamName(functionString: string) {
  const querySearchParam = functionString.match(/(?<=\_NuFrRa_\()(.*?)(?=\))/);
  let paramUserName = DEFAULT_PARAM_NAME;

  if (querySearchParam && querySearchParam.length > 0 && querySearchParam[0] !== '') {
    paramUserName = querySearchParam[0];
  } else {
    // If the user has not defined the context parameter, it is added
    functionString = functionString.replace('_NuFrRa_()', `_NuFrRa_(${DEFAULT_PARAM_NAME})`);
  }
  return { paramUserName, functionString };
}

function parseAttachToContextFunctions(attachToContextFunctions: any, paramUserName: string) {
  const keyFunctionst = Object.keys(attachToContextFunctions);
  const functionStrToAttach: string[] = [];
  var attachToContextFunctionsResult = {};
  if (attachToContextFunctions && keyFunctionst.length > 0) {
    attachToContextFunctionsResult = keyFunctionst.reduce((resultObject: any, keyFunction: string) => {
      let attachFunction = injectImports(attachToContextFunctions[keyFunction], paramUserName);
      const parseFunctionToInject = attachFunction.replace('_NuFrRa_', `const ${keyFunction} = `);
      functionStrToAttach.push(parseFunctionToInject.substring(1, parseFunctionToInject.length - 1));
      resultObject[keyFunction] = JSONfn.parse(attachFunction);
      return resultObject;
    }, {});
  }
  return { functionStrToAttach, attachToContextFunctions: attachToContextFunctionsResult };
}
