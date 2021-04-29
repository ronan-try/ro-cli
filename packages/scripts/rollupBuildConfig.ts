export const extensions = ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'];

/** 告诉rollup 不要打包，而是作为外部依赖 */
export const external = [
  'child_process',
  'path',
  'fs',
  'os',
  'app-path',
  'shelljs',
  'chalk',
];

/** 告诉 rollup 全剧变量
 * 例如{jquery:$},就是高速rollup全剧变量$是jquery
 */
export const globals = external.reduce((pre, curitem) => {
  pre[curitem] = curitem;
  return pre;
}, {});