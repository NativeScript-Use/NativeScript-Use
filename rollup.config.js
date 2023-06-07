import typescript from "rollup-plugin-ts";
import copy from "rollup-plugin-copy";
const dts = require('rollup-plugin-dts')

const config = [
    {
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
        input: "dist/index.d.ts",
        output: [{ file: "publish/lib/index.d.ts", format: "es" }],
        plugins: [dts.default()],
    },
];

export default config;