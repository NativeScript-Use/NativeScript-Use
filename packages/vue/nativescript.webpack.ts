//@ts-ignore
const webpack = require('@nativescript/webpack');

module.exports = (env) => {
  const wepackTask = require('@nativescript-use/nativescript-task/nativescript.webpack.js');
  wepackTask(webpack);
  webpack.chainWebpack((config) => {
    //@ts-ignore
    config.resolve.alias.set('vue-demi', require.resolve('vue-demi'));
  });
};
