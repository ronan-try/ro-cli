(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('shelljs')) :
  typeof define === 'function' && define.amd ? define(['exports', 'shelljs'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.win32 = {}, global.shelljs));
}(this, (function (exports, shelljs) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var shelljs__default = /*#__PURE__*/_interopDefaultLegacy(shelljs);

  function openWithBroswer(url) {
    shelljs__default['default'].exec('start ' + url);
  }
  function openWithVSCode(fullPath) {// to do
  }
  function openWithFolder(fullPath = '.') {
    // to do
    shelljs__default['default'].exec('start ' + fullPath);
  }

  exports.openWithBroswer = openWithBroswer;
  exports.openWithFolder = openWithFolder;
  exports.openWithVSCode = openWithVSCode;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
