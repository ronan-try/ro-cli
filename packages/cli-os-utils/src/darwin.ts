import child_process from 'child_process';
import path from 'path';
import appPath from 'app-path';
import shelljs from 'shelljs';

export function openWithVSCode(fullPath: string) {
  (async () => {
    const identifier = 'com.microsoft.VSCode';
    const installPath = await appPath(identifier);

    const excutableShim = path.join(
      installPath,
      'Contents',
      'Resources',
      'app',
      'bin',
      'code'
    );
    child_process.spawn(excutableShim, [fullPath]);
  })();
}

export function openWithFolder (fullPath: string = '.') {
  shelljs.exec('open ' + fullPath);
}

export function openWithBroswer (url: string) {
  shelljs.exec('open ' + url);
}
