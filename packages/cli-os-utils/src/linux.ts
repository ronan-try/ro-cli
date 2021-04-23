import shelljs from 'shelljs';

export function openWithBroswer(url: string) {
  shelljs.exec('code ' + url);
}

export function openWithVSCode(fullPath: string) {
  // to do
}

export function openWithFolder (fullPath: string = '.') {
  // to do
  shelljs.exec('open ' + fullPath);
}