import shelljs from 'shelljs';
import { spawn } from 'child_process';

const shellCd = fullPath => {
  shelljs.cd(fullPath);
};
const execAsync = async (path, cmd, silent = false) => new Promise(resolve => {
  shelljs.exec(cmd, {
    cwd: path,
    silent
  }, (code, stdout, stderr) => resolve({
    code,
    stdout,
    stderr
  }));
});
const shellSpawn = (cmd, cwdPath) => spawn(cmd, {
  cwd: cwdPath,
  shell: true,
  stdio: 'inherit'
});

export { execAsync, shellCd, shellSpawn };
