import os from 'os';
import { textRed } from '@ronan-try/cli-shared-utils';
import { OS_PLATFORMS } from '@ronan-try/cli-const';

// 内部资源
import * as Darwin from './src/darwin';
import * as Linux from './src/linux';
import * as Win23 from './src/win32';

export function openWithVSCode (fullPath: string) {
  const platform = os.platform();

  if (platform === OS_PLATFORMS.Darwin) {
    return Darwin.openWithVSCode(fullPath);
  }

  if (platform === OS_PLATFORMS.Win32) {
    return Win23.openWithVSCode(fullPath);
  }

  if (platform === OS_PLATFORMS.Linux) {
    // to do
    return Linux.openWithVSCode(fullPath);
  }

  throw textRed('unexpected os platform')
}

export function openWithFolder (fullPath: string) {
  const platform = os.platform();

  if (platform === OS_PLATFORMS.Darwin) {
    return Darwin.openWithFolder(fullPath);
  }

  if (platform === OS_PLATFORMS.Win32) {
    return Win23.openWithFolder(fullPath);
  }

  if (platform === OS_PLATFORMS.Linux) {
    // to do
    return Linux.openWithFolder(fullPath);
  }

  throw textRed('unexpected os platform')
}

export function openWithBrowser (url: string) {
  const platform = os.platform();

  if (platform === OS_PLATFORMS.Darwin) {
    return Darwin.openWithBroswer(url);
  }

  if (platform === OS_PLATFORMS.Win32) {
    return Win23.openWithBroswer(url);
  }

  if (platform === OS_PLATFORMS.Linux) {
    // to do
    return Linux.openWithBroswer(url);
  }

  throw textRed('unexpected os platform')
}
