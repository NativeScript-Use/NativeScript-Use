import typescript from "rollup-plugin-ts";
import copy from "rollup-plugin-copy";
import terser from '@rollup/plugin-terser';
const dts = require('rollup-plugin-dts')


const config = [
    {
        external: ['@nativescript/core'],
        input: "packages/core/index.ts",
        plugins: [typescript("es6"),
        copy({
            targets: [
                { src: 'package.json', dest: 'publish' }
            ]
        })], //, terser()],
        output: [
            {
                file: "./publish/lib/index.js",
                format: "es"
            },
        ],
    },
    {
        external: ['@nativescript/core'],
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
        external: ['@nativescript/core'],
        input: "dist/index.d.ts",
        output: [{ file: "publish/lib/index.d.ts", format: "es" }],
        plugins: [dts.default()],
    },
];

export default config;