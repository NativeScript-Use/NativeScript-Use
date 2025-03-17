//@ts-ignore
const webpack = require('@nativescript/webpack');

module.exports = (env) => {
  const wepackTask = require('@nativescript-use/nativescript-task/nativescript.webpack.js');
  wepackTask(webpack);
};
