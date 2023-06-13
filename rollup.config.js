import typescript from "rollup-plugin-ts";
import copy from "rollup-plugin-copy";
import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
const dts = require('rollup-plugin-dts')
const requireFromUrl = require('require-from-url/sync');
import cleanNativeExtension from "./scripts/cleanNativeExtension"

const externals = ['nativescript-vue', '@nativescript/core', '@nativescript/core/application', '@nativescript/shared-notification-delegate']
const tsPlugin = typescript({
    transformers: {
        before: requireFromUrl('https://cdn.jsdelivr.net/npm/@nativescript/webpack@5.0.15/dist/transformers/NativeClass/index.js').default
    }
});

const DIST_FOLDER = 'publish';

const defaultConfig = (options) => ({
    external: externals,
    input: "packages/core/index.ts",
    treeshake: false,
    plugins: [
        copy({
            targets: [
                { src: 'package.json', dest: DIST_FOLDER },
                // { src: 'node_modules', dest: DIST_FOLDER },
                { src: 'packages/core/platforms', dest: DIST_FOLDER }
            ]
        }),

        nodeResolve({
            extensions: [...['.tsx', '.ts', '.jsx', '.js'], ...options.extensions],
        }),
        tsPlugin,
        cleanNativeExtension(DIST_FOLDER)
    ],
    output: [
        {
            dir: DIST_FOLDER,
            format: "es",
            preserveModules: true,
        },
    ],
})
const config = [
    defaultConfig({ extensions: ['.android.ts'] }),
    defaultConfig({ extensions: ['.ios.ts'] }),
    {
        external: externals,
        input: "packages/core/index.ts",
        output: [{
            dir: DIST_FOLDER, format: "es",
            preserveModules: true,
        }],
        plugins: [dts.default()],
    }
    /* {
        external: externals,
        input: "packages/core/index.ts",
        plugins: [tsPlugin, terser()],
        output: [
            {
                dir: DIST_FOLDER,
                preserveModules: true,
                format: "es"
            },
        ],
    }, */

];



export default config;