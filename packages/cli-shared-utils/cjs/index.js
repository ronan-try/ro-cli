'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chalk = require('chalk');
var shelljs = require('shelljs');
var child_process = require('child_process');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var shelljs__default = /*#__PURE__*/_interopDefaultLegacy(shelljs);
var child_process__default = /*#__PURE__*/_interopDefaultLegacy(child_process);

const textRed = msg => chalk.red(msg);
const textCyan = msg => chalk.cyan(msg);
const textYellow = msg => chalk.yellow(msg);
const textGreen = msg => chalk.green(msg);
const textGray = msg => chalk.gray(msg);
const textRedBright = msg => chalk.redBright(msg);
const textCyanBright = msg => chalk.cyanBright(msg);

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
  shelljs__default['default'].cd(fullPath);
};
const execAsync = async (path, cmd, silent = false) => new Promise(resolve => {
  shelljs__default['default'].exec(cmd, {
    cwd: path,
    silent
  }, (code, stdout, stderr) => resolve({
    code,
    stdout,
    stderr
  }));
});
const shellSpawn = (cmd, cwdPath) => child_process__default['default'].spawn(cmd, {
  cwd: cwdPath,
  shell: true,
  stdio: 'inherit'
});

exports.execAsync = execAsync;
exports.logStep = logStep;
exports.shellCd = shellCd;
exports.shellSpawn = shellSpawn;
exports.textCyan = textCyan;
exports.textCyanBright = textCyanBright;
exports.textGray = textGray;
exports.textGreen = textGreen;
exports.textRed = textRed;
exports.textRedBright = textRedBright;
exports.textYellow = textYellow;
exports.trimOnlyEnd = trimOnlyEnd;
