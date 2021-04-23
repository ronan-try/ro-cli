import shelljs from 'shelljs';
import { spawn } from 'child_process';

export const shellCd = (fullPath: string) => {
  shelljs.cd(fullPath);
}

export const execAsync = async (path: string, cmd: string, silent = false) => new Promise(resolve => {
  shelljs.exec(
    cmd,
    { cwd: path, silent },
    (code, stdout, stderr) => resolve({ code, stdout, stderr })
  )
});

export const shellSpawn = (cmd: string, cwdPath: string) => spawn(cmd, { cwd: cwdPath, shell: true, stdio: 'inherit' });
