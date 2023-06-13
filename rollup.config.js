#!/usr/bin/node --experimental-specifier-resolution=node

import typescript from "rollup-plugin-ts";
var fs = require('fs')
import copy from "rollup-plugin-copy";
import terser from '@rollup/plugin-terser';
var requireFromUrl = require('require-from-url/sync');
import { nodeResolve } from '@rollup/plugin-node-resolve';

const externals = ['nativescript-vue', '@nativescript/core', '@nativescript/core/application', '@nativescript/shared-notification-delegate']
const tsPlugin = typescript({
    transformers: {
        before: requireFromUrl('https://cdn.jsdelivr.net/npm/@nativescript/webpack@5.0.15/dist/transformers/NativeClass/index.js').default
    }
});

const DIST_FOLDER = 'publish';

const config = [
    {
        external: externals,
        input: "packages/core/index.ts",
        globals: {
            './core/index.android.js': './core'
        },
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

                extensions: ['.tsx', '.ts', '.jsx', '.js', '.android.ts', '.ios.ts',],
            }),
            tsPlugin,

        ],
        output: [
            {
                dir: DIST_FOLDER,
                format: "es",
                preserveModules: true,
            },
        ],
    },
    {
        external: externals,
        input: "packages/core/index.ts",
        globals: {
            './core/index.android.js': './core'
        },
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

                extensions: ['.tsx', '.ts', '.jsx', '.js', '.ios.ts',],

            }),
            tsPlugin,

            copyAndWatch('index.html', 'index.html')
        ],
        output: [
            {
                dir: DIST_FOLDER,
                format: "es",
                preserveModules: true,
            },
        ],
    },
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
    /*  {
         external: externals,
         input: "dist/index.d.ts",
         output: [{
             dir: DIST_FOLDER, format: "es",
             preserveModules: true,
         }],
         plugins: [dts.default()],
     }, */
];

function copyAndWatch(fileIn, fileOut) {
    return {
        name: 'copy-and-watch',
        async buildStart() {
        },
        async writeBundle(a, bundle) {
            console.log("fileOut");
            console.log();
            Object.keys(bundle).forEach(fileName => {
                fs.readFile("./publish/" + fileName, 'utf8', function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    let result = data.replace("/index.ios.js", '');
                    result = result.replace("/index.android.js", '');

                    fs.writeFile("./publish/" + fileName, result, 'utf8', function (err) {
                        if (err) return console.log(err);
                    });
                });

            })

        }
    }
}

export default config;