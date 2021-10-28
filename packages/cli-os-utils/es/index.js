import os from 'os';
import { textRed } from '@ronan-try/cli-shared-utils';
import { OS_PLATFORMS } from '@ronan-try/cli-const';
import child_process from 'child_process';
import path from 'path';
import appPath from 'app-path';
import shelljs from 'shelljs';

function openWithVSCode$3(fullPath) {
  (async () => {
    const identifier = 'com.microsoft.VSCode';
    const installPath = await appPath(identifier);
    const excutableShim = path.join(installPath, 'Contents', 'Resources', 'app', 'bin', 'code');
    child_process.spawn(excutableShim, [fullPath]);
  })();
}
function openWithFolder$3(fullPath = '.') {
  shelljs.exec('open ' + fullPath);
}
function openWithBroswer$2(url) {
  shelljs.exec('open ' + url);
}

function openWithBroswer$1(url) {
  shelljs.exec('code ' + url);
}
function openWithVSCode$2(fullPath) {// to do
}
function openWithFolder$2(fullPath = '.') {
  // to do
  shelljs.exec('open ' + fullPath);
}

function openWithBroswer(url) {
  shelljs.exec(`start ${url}`);
}
function openWithVSCode$1(fullPath) {
  // to do
  shelljs.exec('code ' + fullPath);
}
function openWithFolder$1(fullPath = '.') {
  // to do
  shelljs.exec('start ' + fullPath);
}

function openWithVSCode(fullPath) {
  const platform = os.platform();
  console.log('.....', platform);

  if (platform === OS_PLATFORMS.Darwin) {
    return openWithVSCode$3(fullPath);
  }

  if (platform === OS_PLATFORMS.Win32) {
    console.log('.....', 'in win32');
    return openWithVSCode$1(fullPath);
  }

  if (platform === OS_PLATFORMS.Linux) {
    // to do
    return openWithVSCode$2();
  }

  throw textRed('unexpected os platform');
}
function openWithFolder(fullPath) {
  const platform = os.platform();

  if (platform === OS_PLATFORMS.Darwin) {
    return openWithFolder$3(fullPath);
  }

  if (platform === OS_PLATFORMS.Win32) {
    return openWithFolder$1(fullPath);
  }

  if (platform === OS_PLATFORMS.Linux) {
    // to do
    return openWithFolder$2(fullPath);
  }

  throw textRed('unexpected os platform');
}
function openWithBrowser(url) {
  const platform = os.platform();

  if (platform === OS_PLATFORMS.Darwin) {
    return openWithBroswer$2(url);
  }

  if (platform === OS_PLATFORMS.Win32) {
    return openWithBroswer(url);
  }

  if (platform === OS_PLATFORMS.Linux) {
    // to do
    return openWithBroswer$1(url);
  }

  throw textRed('unexpected os platform');
}

export { openWithBrowser, openWithFolder, openWithVSCode };
