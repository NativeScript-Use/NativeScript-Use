const webpack = require("@nativescript/webpack");
const {resolve} = require("path");

module.exports = (env) => {
    webpack.init(env);

    webpack.chainWebpack((config) => {
        const isPreview = !!env.preview;
        if(!isPreview){
            config.resolve.alias.set(
                '@vallemar/nativescript-vueuse',
                resolve(__dirname, '../publish')
            );
        }
    });

    return webpack.resolveConfig();
};
