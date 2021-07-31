import { red, cyan, yellow, green, gray, redBright, cyanBright } from 'chalk';
import shelljs from 'shelljs';
import child_process from 'child_process';

const textRed = msg => red(msg);
const textCyan = msg => cyan(msg);
const textYellow = msg => yellow(msg);
const textGreen = msg => green(msg);
const textGray = msg => gray(msg);
const textRedBright = msg => redBright(msg);
const textCyanBright = msg => cyanBright(msg);

const logStep = msg => {
  console.log('\n', textGray(msg), '\n');
};

/** 字符串trimEnd, 区别于lodash.trimEnd */
const trimOnlyEnd = (str, chars) => {
  if (str && chars === void 0) return str;
  if (!str) return str;
  const lastIndex = str.lastIndexOf(chars);
  return str.slice(0, lastIndex);
}; // export const trimOnlyEnd = (str, chars) => {
//   if (str && chars === void 0) return str;
//   if (!str) return str;
//   const strSplit = (str + '').split(chars);
//   const result = strSplit.reduce((pre, cur, curIndex, arr) => {
//     if (arr.length === curIndex + 1) {
//       return pre;
//     }
//     if (cur === '') {
//       return pre + chars + cur;
//     }
//     return pre + cur;
//   }, '');
//   return result;
// };

const shellCd = fullPath => {
  shelljs.cd(fullPath);
};
const execAsync = async (path, cmd, silent = false) => new Promise(resolve => {
  shelljs.exec(cmd, {
    cwd: path,
    silent
  }, (code, stdout, stderr) => resolve({
    code,
    stdout,
    stderr
  }));
});
const shellSpawn = (cmd, cwdPath) => child_process.spawn(cmd, {
  cwd: cwdPath,
  shell: true,
  stdio: 'inherit'
});

export { execAsync, logStep, shellCd, shellSpawn, textCyan, textCyanBright, textGray, textGreen, textRed, textRedBright, textYellow, trimOnlyEnd };
