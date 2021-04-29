import shelljs from 'shelljs';

function openWithBroswer(url) {
  shelljs.exec('code ' + url);
}
function openWithVSCode(fullPath) {// to do
}
function openWithFolder(fullPath = '.') {
  // to do
  shelljs.exec('open ' + fullPath);
}

export { openWithBroswer, openWithFolder, openWithVSCode };
