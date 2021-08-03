import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';

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
                outputStyle: 'compressed',
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
            }),
        ]
    }
];