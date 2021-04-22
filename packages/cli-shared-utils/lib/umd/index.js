(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('chalk')) :
  typeof define === 'function' && define.amd ? define(['exports', 'chalk'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.index = {}, global.chalk));
}(this, (function (exports, chalk) { 'use strict';

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

  exports.logStep = logStep;
  exports.textCyan = textCyan;
  exports.textCyanBright = textCyanBright;
  exports.textGray = textGray;
  exports.textGreen = textGreen;
  exports.textRed = textRed;
  exports.textRedBright = textRedBright;
  exports.textYellow = textYellow;
  exports.trimOnlyEnd = trimOnlyEnd;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
