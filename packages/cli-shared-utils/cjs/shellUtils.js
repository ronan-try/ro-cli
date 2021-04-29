'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shelljs = require('shelljs');
var child_process = require('child_process');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var shelljs__default = /*#__PURE__*/_interopDefaultLegacy(shelljs);
var child_process__default = /*#__PURE__*/_interopDefaultLegacy(child_process);

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
exports.shellCd = shellCd;
exports.shellSpawn = shellSpawn;
