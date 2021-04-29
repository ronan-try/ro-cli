(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('child_process'), require('path'), require('app-path'), require('shelljs')) :
  typeof define === 'function' && define.amd ? define(['exports', 'child_process', 'path', 'app-path', 'shelljs'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.darwin = {}, global.child_process, global.path, global['app-path'], global.shelljs));
}(this, (function (exports, child_process, path, appPath, shelljs) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var child_process__default = /*#__PURE__*/_interopDefaultLegacy(child_process);
  var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
  var appPath__default = /*#__PURE__*/_interopDefaultLegacy(appPath);
  var shelljs__default = /*#__PURE__*/_interopDefaultLegacy(shelljs);

  function openWithVSCode(fullPath) {
    (async () => {
      const identifier = 'com.microsoft.VSCode';
      const installPath = await appPath__default['default'](identifier);
      const excutableShim = path__default['default'].join(installPath, 'Contents', 'Resources', 'app', 'bin', 'code');
      child_process__default['default'].spawn(excutableShim, [fullPath]);
    })();
  }
  function openWithFolder(fullPath = '.') {
    shelljs__default['default'].exec('open ' + fullPath);
  }
  function openWithBroswer(url) {
    shelljs__default['default'].exec('open ' + url);
  }

  exports.openWithBroswer = openWithBroswer;
  exports.openWithFolder = openWithFolder;
  exports.openWithVSCode = openWithVSCode;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
