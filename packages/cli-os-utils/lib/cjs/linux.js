'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shelljs = require('shelljs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var shelljs__default = /*#__PURE__*/_interopDefaultLegacy(shelljs);

function openWithBroswer(url) {
  shelljs__default['default'].exec('code ' + url);
}
function openWithVSCode(fullPath) {// to do
}
function openWithFolder(fullPath = '.') {
  // to do
  shelljs__default['default'].exec('open ' + fullPath);
}

exports.openWithBroswer = openWithBroswer;
exports.openWithFolder = openWithFolder;
exports.openWithVSCode = openWithVSCode;
