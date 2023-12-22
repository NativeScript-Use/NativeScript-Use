// https://dev.to/localazy/how-to-pass-function-to-web-workers-4ee1
// https://github.com/vkiryukhin/jsonfn

export const JSONfn = {
  stringify(obj: any) {
    return JSON.stringify(obj, function (key, value) {
      var fnBody;
      if (value instanceof Function || typeof value == 'function') {
        fnBody = value.toString();

        if (fnBody.length < 8 || fnBody.substring(0, 8) !== 'function') {
          //this is ES6 Arrow Function
          return '_NuFrRa_' + fnBody;
        }
        return fnBody;
      }
      if (value instanceof RegExp) {
        return '_PxEgEr_' + value;
      }
      return value;
    });
  },
  parse(str: any, date2obj?: any) {
    var iso8061 = date2obj ? /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/ : false;

    return JSON.parse(str, function (key, value) {
      var prefix;

      if (typeof value != 'string') {
        return value;
      }
      if (value.length < 8) {
        return value;
      }

      prefix = value.substring(0, 8);

      // @ts-ignore
      if (iso8061 && value.match(iso8061)) {
        return new Date(value);
      }
      if (prefix === 'function') {
        return eval('(' + value + ')');
      }
      if (prefix === '_PxEgEr_') {
        return eval(value.slice(8));
      }
      if (prefix === '_NuFrRa_') {
        return eval(value.slice(8));
      }

      return value;
    });
  },
  clone(obj: any, date2obj?: any) {
    return JSONfn.parse(JSONfn.stringify(obj), date2obj);
  },
};
