(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.trimOnlyEnd = {}));
}(this, (function (exports) { 'use strict';

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

  exports.trimOnlyEnd = trimOnlyEnd;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
