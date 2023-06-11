import typescript from "rollup-plugin-ts";
import copy from "rollup-plugin-copy";
import terser from '@rollup/plugin-terser';
var requireFromUrl = require('require-from-url/sync');

const dts = require('rollup-plugin-dts')
const externals = ['nativescript-vue', '@nativescript/core', '@nativescript/core/application', '@nativescript/shared-notification-delegate']

const tsPlugin = typescript({
    transformers: {
      //  before: require('@nativescript/webpack/dist/transformers/NativeClass').default
        before: requireFromUrl('https://cdn.jsdelivr.net/npm/@nativescript/webpack@5.0.15/dist/transformers/NativeClass/index.js').default
    }
});

const DIST_FOLDER = 'publish';

const config = [
    {
        external: externals,
        input: "packages/core/index.ts",
        plugins: [tsPlugin,
            copy({
                targets: [
                    { src: 'package.json', dest: DIST_FOLDER },
                   // { src: 'node_modules', dest: DIST_FOLDER },
                    { src: 'packages/core/platforms', dest: DIST_FOLDER }
                ]
            })],
        output: [
            {
                file: DIST_FOLDER + "/index.js",
                format: "es"
            },
        ],
    },
    {
        external: externals,
        input: "packages/core/index.ts",
        plugins: [tsPlugin, terser()],
        output: [
            {
                file: DIST_FOLDER + "/index.min.js",
                format: "es"
            },
        ],
    },
    {
        external: externals,
        input: "dist/index.d.ts",
        output: [{ file: DIST_FOLDER + "/index.d.ts", format: "es" }],
        plugins: [dts.default()],
    },
];

export default config;