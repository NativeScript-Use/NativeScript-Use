const webpack = require("@nativescript/webpack");

module.exports = (env) => {
    webpack.init(env);

    webpack.chainWebpack((config) => {
       // config.resolve.alias.set('@lib', '@vallemar/nativescript-vueuse')
    });

    return webpack.resolveConfig();
};
