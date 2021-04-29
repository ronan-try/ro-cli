'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var child_process = require('child_process');
var path = require('path');
var appPath = require('app-path');
var shelljs = require('shelljs');

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
