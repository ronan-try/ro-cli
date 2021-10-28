import shelljs from 'shelljs';

function openWithBroswer(url) {
  shelljs.exec(`start "${url}"`);
}
function openWithVSCode(fullPath) {
  // to do
  shelljs.exec('code ' + fullPath);
}
function openWithFolder(fullPath = '.') {
  // to do
  shelljs.exec('start ' + fullPath);
}

export { openWithBroswer, openWithFolder, openWithVSCode };
