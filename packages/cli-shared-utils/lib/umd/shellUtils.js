(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('shelljs'), require('child_process')) :
  typeof define === 'function' && define.amd ? define(['exports', 'shelljs', 'child_process'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.shellUtils = {}, global.shelljs, global.child_process));
}(this, (function (exports, shelljs, child_process) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var shelljs__default = /*#__PURE__*/_interopDefaultLegacy(shelljs);

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
  const shellSpawn = (cmd, cwdPath) => child_process.spawn(cmd, {
    cwd: cwdPath,
    shell: true,
    stdio: 'inherit'
  });

  exports.execAsync = execAsync;
  exports.shellCd = shellCd;
  exports.shellSpawn = shellSpawn;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
