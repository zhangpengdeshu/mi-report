import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';


import pkg from './package.json';

export default [
  // UMD development
  {
    input: './lib/index.js',
    output: {
      name: pkg.name,
      file:  `dist/umd/${pkg.name}.js`,
      format: 'umd',
      indent: false,
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_module/**'
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ]
  },
  // UMD Production
  {
    input: './lib/index.js',
    output: {
      file: `dist/umd/${pkg.name}.min.js`,
      format: 'umd',
      name: pkg.name,
      indent: false
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]
  }
]
