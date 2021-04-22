import shelljs from 'shelljs';

export function openWithBroswer(url: string) {
  shelljs.exec('start ' + url);
}

export function openWithVSCode(fullPath: string) {
  // to do
}

export function openWithFolder (fullPath: string = '.') {
  // to do
  shelljs.exec('start ' + fullPath);
}