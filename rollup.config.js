import typescript from "rollup-plugin-ts";
import copy from "rollup-plugin-copy";
import terser from '@rollup/plugin-terser';
const dts = require('rollup-plugin-dts')

const externals = ['nativescript-vue', '@nativescript/core', '@nativescript/core/application']
const config = [
    {
        external: externals,
        input: "packages/core/index.ts",
        plugins: [typescript("es6"),
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
        plugins: [typescript("es6"),
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