'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var os = require('os');
var cliSharedUtils = require('@ronan-try/cli-shared-utils');
var cliConst = require('@ronan-try/cli-const');
var child_process = require('child_process');
var path = require('path');
var appPath = require('app-path');
var shelljs = require('shelljs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var os__default = /*#__PURE__*/_interopDefaultLegacy(os);
var child_process__default = /*#__PURE__*/_interopDefaultLegacy(child_process);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var appPath__default = /*#__PURE__*/_interopDefaultLegacy(appPath);
var shelljs__default = /*#__PURE__*/_interopDefaultLegacy(shelljs);

function openWithVSCode$3(fullPath) {
  (async () => {
    const identifier = 'com.microsoft.VSCode';
    const installPath = await appPath__default['default'](identifier);
    const excutableShim = path__default['default'].join(installPath, 'Contents', 'Resources', 'app', 'bin', 'code');
    child_process__default['default'].spawn(excutableShim, [fullPath]);
  })();
}
function openWithFolder$3(fullPath = '.') {
  shelljs__default['default'].exec('open ' + fullPath);
}
function openWithBroswer$2(url) {
  shelljs__default['default'].exec('open ' + url);
}

function openWithBroswer$1(url) {
  shelljs__default['default'].exec('code ' + url);
}
function openWithVSCode$2(fullPath) {// to do
}
function openWithFolder$2(fullPath = '.') {
  // to do
  shelljs__default['default'].exec('open ' + fullPath);
}

function openWithBroswer(url) {
  shelljs__default['default'].exec('start ' + url);
}
function openWithVSCode$1(fullPath) {
  // to do
  shelljs__default['default'].exec('code ' + fullPath);
}
function openWithFolder$1(fullPath = '.') {
  // to do
  shelljs__default['default'].exec('start ' + fullPath);
}

function openWithVSCode(fullPath) {
  const platform = os__default['default'].platform();
  console.log('.....', platform);

  if (platform === cliConst.OS_PLATFORMS.Darwin) {
    return openWithVSCode$3(fullPath);
  }

  if (platform === cliConst.OS_PLATFORMS.Win32) {
    console.log('.....', 'in win32');
    return openWithVSCode$1(fullPath);
  }

  if (platform === cliConst.OS_PLATFORMS.Linux) {
    // to do
    return openWithVSCode$2();
  }

  throw cliSharedUtils.textRed('unexpected os platform');
}
function openWithFolder(fullPath) {
  const platform = os__default['default'].platform();

  if (platform === cliConst.OS_PLATFORMS.Darwin) {
    return openWithFolder$3(fullPath);
  }

  if (platform === cliConst.OS_PLATFORMS.Win32) {
    return openWithFolder$1(fullPath);
  }

  if (platform === cliConst.OS_PLATFORMS.Linux) {
    // to do
    return openWithFolder$2(fullPath);
  }

  throw cliSharedUtils.textRed('unexpected os platform');
}
function openWithBrowser(url) {
  const platform = os__default['default'].platform();

  if (platform === cliConst.OS_PLATFORMS.Darwin) {
    return openWithBroswer$2(url);
  }

  if (platform === cliConst.OS_PLATFORMS.Win32) {
    return openWithBroswer(url);
  }

  if (platform === cliConst.OS_PLATFORMS.Linux) {
    // to do
    return openWithBroswer$1(url);
  }

  throw cliSharedUtils.textRed('unexpected os platform');
}

exports.openWithBrowser = openWithBrowser;
exports.openWithFolder = openWithFolder;
exports.openWithVSCode = openWithVSCode;
