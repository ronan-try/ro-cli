import fs from 'fs';
import path from 'path';

import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
// 压缩
import { terser } from 'rollup-plugin-terser';
import sourcemaps from 'rollup-plugin-sourcemaps';
import del from 'del';
// 生成 .d.ts 好像自动可以生成
// 将tsconfig.json中的"declaration": true, 干掉
import dts from 'rollup-plugin-dts';
// config
import { extensions, external, globals } from '../scripts/rollupBuildConfig.ts';

const pathResolve = (...args) => path.resolve(...args);

function chunk (input, name) {
  // https://rollupjs.org/guide/en/#big-list-of-options
  const configs = [];

  // .d.ts 配置文件
  configs.push({
    input: pathResolve('./src/', `${input}.ts`),
    output: {
      file: pathResolve('./lib/es/', `${name}.d.ts`),
      format: 'es',
    },
    plugins: [dts()],
  });

  // 编译打包配置
  configs.push({
    external,
    input: pathResolve('./src/', `${input}.ts`),
    plugins: [
      typescript(),
      nodeResolve(
        {
          extensions,
          modulesOnly: true,
          preferBuiltins: false
        }
      ),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        extensions,
        babelHelpers: 'bundled',
      }),
      sourcemaps(),
      // dts(),
    ],
    output: [
      {
        file: pathResolve('./lib/cjs/', `${name}.js`),
        format: 'cjs', // Type of output (amd, cjs, es, iife, umd, system)
        name,
        globals, // Comma-separate list of `moduleID:Global` pairs
      },
      {
        file: pathResolve('./lib/cjs/mini/', `${name}.mini.js`),
        format: 'cjs',
        name,
        compact: true,
        plugins: [
          terser(),
        ],
        sourcemap: true,
        globals,
      },
      {
        file: pathResolve('./lib/es/', `${name}.js`),
        format: 'es', // Type of output (amd, cjs, es, iife, umd, system)
        name,
        globals, // Comma-separate list of `moduleID:Global` pairs
      },
    ],
  });

  return configs;
}

const configFiles = [];
((configFiles = []) => {
  const srcFiles = fs.readdirSync(pathResolve('./src/'));

  srcFiles.forEach(fileName => {
    const name = fileName.replace('.ts', '');
    [].push.apply(configFiles, chunk(name, name));
  });
})(configFiles);


// 这是比较坑的地方，原来每个config 都clear一边
// cleandir('./lib');
del.sync('./lib');

export default [
  ...configFiles,
  {
    input: path.resolve(`./index.ts`),
    output: {
      file: path.resolve(`./lib/es/index.d.ts`),
      format: 'es',
    },
    plugins: [dts()],
  },
  {
    external,
    input: path.resolve(`./index.ts`),
    plugins: [
      typescript(),
      nodeResolve(
        {
          extensions,
          modulesOnly: true,
          preferBuiltins: false
        }
      ),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        extensions,
        babelHelpers: 'bundled',
      }),
      sourcemaps(),
      // dts(),
    ],
    output: [
      {
        file: path.resolve(`./lib/cjs/index.js`),
        format: 'cjs',
        name: 'index',
        globals,
      },
      {
        file: path.resolve(`./lib/cjs/mini/index.mini.js`),
        format: 'cjs',
        name: 'index',
        compact: true,
        plugins: [
          terser(),
        ],
        sourcemap: true,
        globals,
      },
      {
        file: pathResolve('./lib/es/', `index.js`),
        format: 'es', // Type of output (amd, cjs, es, iife, umd, system)
        name: 'index',
        globals, // Comma-separate list of `moduleID:Global` pairs
      },
    ],

  }
];
