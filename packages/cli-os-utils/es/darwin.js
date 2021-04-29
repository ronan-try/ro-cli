import child_process from 'child_process';
import path from 'path';
import appPath from 'app-path';
import shelljs from 'shelljs';

function openWithVSCode(fullPath) {
  (async () => {
    const identifier = 'com.microsoft.VSCode';
    const installPath = await appPath(identifier);
    const excutableShim = path.join(installPath, 'Contents', 'Resources', 'app', 'bin', 'code');
    child_process.spawn(excutableShim, [fullPath]);
  })();
}
function openWithFolder(fullPath = '.') {
  shelljs.exec('open ' + fullPath);
}
function openWithBroswer(url) {
  shelljs.exec('open ' + url);
}

export { openWithBroswer, openWithFolder, openWithVSCode };
