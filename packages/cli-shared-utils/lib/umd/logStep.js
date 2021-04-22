(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('chalk')) :
  typeof define === 'function' && define.amd ? define(['exports', 'chalk'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.logStep = {}, global.chalk));
}(this, (function (exports, chalk) { 'use strict';

  const textGray = msg => chalk.gray(msg);

  const logStep = msg => {
    console.log('\n', textGray(msg), '\n');
  };

  exports.logStep = logStep;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
