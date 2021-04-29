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

const extensions = ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'];

/** 告诉rollup 不要打包，而是作为外部依赖 */
const external = [
  'child_process',
  'path',
  'fs',
  'os',
  'app-path',
  'shelljs',
  'chalk',
  '@ronan-try/cli-shared-utils',
];

/** 告诉 rollup 全剧变量
 * 例如{jquery:$},就是高速rollup全剧变量$是jquery
 */
const globals = external.reduce((pre, curitem) => {
  pre[curitem] = curitem;
  return pre;
}, {});

const pathResolve = (...args) => path.resolve(...args);

function chunk (input, name) {
  // https://rollupjs.org/guide/en/#big-list-of-options
  const configs = [];

  // .d.ts 配置文件
  configs.push({
    input: pathResolve('./src/', `${input}.ts`),
    output: {
      file: pathResolve('./es/', `${name}.d.ts`),
      format: 'es',
      globals,
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
        file: pathResolve('./cjs/', `${name}.js`),
        format: 'cjs', // Type of output (amd, cjs, es, iife, umd, system)
        name,
        globals, // Comma-separate list of `moduleID:Global` pairs
      },
      {
        file: pathResolve('./cjs/mini/', `${name}.mini.js`),
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
        file: pathResolve('./es/', `${name}.js`),
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
// cleandir('./cjs');
del.sync('./lib');
del.sync('./cjs');
del.sync('./es');

export default [
  ...configFiles,
  {
    input: path.resolve(`./index.ts`),
    output: {
      file: path.resolve(`./es/index.d.ts`),
      format: 'es',
      globals,
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
        file: path.resolve(`./cjs/index.js`),
        format: 'cjs',
        name: 'index',
        globals,
      },
      {
        file: path.resolve(`./cjs/mini/index.mini.js`),
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
        file: pathResolve('./es/', `index.js`),
        format: 'es', // Type of output (amd, cjs, es, iife, umd, system)
        name: 'index',
        globals, // Comma-separate list of `moduleID:Global` pairs
      },
    ],

  }
];
