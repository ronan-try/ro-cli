# @ro/cli-shared-utils
参考 lodash，将函数体平铺

## 打包后的文件在哪儿找
- umd (commjs, amd)，可以在`lib`文件夹中找到对应的
- es module 在哪儿？
- ts，可以在`src`文件夹中

## 目录结构

## 遗留问题
1. rollup 打包后，第三方包chalk被exclude，那么在其他人install这个包时，chalk怎么样呢

## 遇到难题
1. ts + rollup + commonjs(chalk.js) 
```js
  babelHelpers: 'bundled' option was used by default. It is recommended to configure this option explicitly, read more here: https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
  [!] Error: 'default' is not exported by ..\..\..\node_modules\.pnpm\chalk@4.1.0\node_modules\chalk\source\index.js, imported by src\chalk.ts
  https://rollupjs.org/guide/en/#error-name-is-not-exported-by-module
  src\chalk.ts (1:7)
  1: import chalk from 'chalk';
```
直接显式搞一下