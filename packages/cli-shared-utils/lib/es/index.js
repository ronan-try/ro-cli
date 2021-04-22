import { red, cyan, yellow, green, gray, redBright, cyanBright } from 'chalk';

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

export { logStep, textCyan, textCyanBright, textGray, textGreen, textRed, textRedBright, textYellow, trimOnlyEnd };
