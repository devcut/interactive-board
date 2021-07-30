import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import postcss from 'postcss';
import scss from 'rollup-plugin-scss';
import autoprefixer from 'autoprefixer';

let outputFolder = 'lib/';
let inputFolder = 'src/';
let fileName = 'interactive-board';
let name = 'InteractiveBoard';

export default [
    {
        input: inputFolder + 'index.js',
        output: {
            file: outputFolder + fileName + '.min.js',
            format: 'umd',
            name: name
        },
        plugins: [
            scss({
                output: outputFolder + fileName + '.min.css',
                outputStyle: "compressed",
                processor: () => postcss([autoprefixer()]),
            }),
            resolve(),
            babel({
                exclude: 'node_modules/**'
            }),
            terser()
        ]
    },
    {
        input: inputFolder + 'index.js',
        output: {
            file: outputFolder + fileName + '.js',
            format: 'umd',
            name: name
        },
        plugins: [
            resolve(),
            babel({
                exclude: 'node_modules/**'
            }),
            scss({
                output: outputFolder + fileName + '.css',
                processor: () => postcss([autoprefixer()]),
            }),
        ]
    }
];