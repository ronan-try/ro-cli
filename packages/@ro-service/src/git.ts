import * as shelljs from 'shelljs';

type ShellExecResult = { code: number, stdout: string, stderr: string }

/** current work path exists a git repo */
export const existGitRepo = (workPath: string): Promise<boolean> =>
  new Promise((resolve) => {
    shelljs.exec(
      'git status',
      { cwd: workPath, silent: true },
      (code: number) => resolve(code === 0)
    );
  });

const factoryGitShell = (workPath: string, cmd: string): Promise<ShellExecResult> => new Promise(resolve => {
  shelljs.exec(
    cmd,
    { cwd: workPath, silent: true },
    (code: number, stdout: string, stderr: string) => resolve({ code, stdout, stderr })
  )
});

/** git branch --show-current */
export const gitBranchCurrent = async (workPath: string) => {
  const { code, stdout, stderr } = await factoryGitShell(workPath, 'git branch --show-current');
  if (code === 0) return stdout.trim();

  console.log(stderr);
  process.exit(1);
};

export const gitRemoveV = async (workPath: string) => factoryGitShell(workPath, 'git remote -v');

/** get local git origin */
export const gitLocalOriginURI = async (workPath: string) => {
  const { code, stderr, stdout } = await gitRemoveV(workPath);
  if (code !== 0) {
    console.log(stderr);
    process.exit(1);
  }

  const gitOrigin = stdout.split(' ')[0].split('\t')[1];
  return gitOrigin;
};

