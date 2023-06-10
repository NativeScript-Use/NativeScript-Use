import typescript from "rollup-plugin-ts";
import copy from "rollup-plugin-copy";
import terser from '@rollup/plugin-terser';

const dts = require('rollup-plugin-dts')
const externals = ['nativescript-vue', '@nativescript/core', '@nativescript/core/application']

const tsPlugin = typescript({
    transformers: {
        before: require('@nativescript/webpack/dist/transformers/NativeClass').default
    }
});

const config = [
    {
        external: externals,
        input: "packages/core/index.ts",
        plugins: [tsPlugin,
            copy({
                targets: [
                    { src: 'package.json', dest: 'publish' }
                ]
            })],
        output: [
            {
                file: "./publish/lib/index.js",
                format: "es"
            },
        ],
    },
    {
        external: externals,
        input: "packages/core/index.ts",
        plugins: [tsPlugin,
            terser(),
            copy({
                targets: [
                    { src: 'package.json', dest: 'publish' }
                ]
            })],
        output: [
            {
                file: "./publish/lib/index.min.js",
                format: "es"
            },
        ],
    },
    {
        external: externals,
        input: "dist/index.d.ts",
        output: [{ file: "publish/lib/index.d.ts", format: "es" }],
        plugins: [dts.default()],
    },
];

export default config;