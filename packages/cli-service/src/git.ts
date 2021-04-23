import { spawn } from 'child_process';
import shelljs from 'shelljs';
import { ROCLI_GIT_UPSTREAM } from '@ronan-try/cli-const';
import { shellSpawn } from '@ronan-try/cli-shared-utils/src/shellUtils';

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

  process.exit(1);
};

export const gitRemoteV = async (workPath: string) => factoryGitShell(workPath, 'git remote -v');
export const gitRemoteAdd = async (workPath: string, targetRepo: string) => factoryGitShell(workPath, `git remote add ${ROCLI_GIT_UPSTREAM} ${targetRepo}`)
export const gitRemoteRemove = async (workPath: string, targetRepo = ROCLI_GIT_UPSTREAM) => factoryGitShell(workPath, `git remote remove ` + targetRepo)
export const gitFetchRepo = async (workPath: string, targetRepo = ROCLI_GIT_UPSTREAM) => factoryGitShell(workPath, `git fetch ` + targetRepo)
export const gitCheckoutB = async (workPath: string, localBranch: string, targetBranch: string) => factoryGitShell(workPath, `git checkout -b ${localBranch} ${targetBranch}`)

export const gitPushOrigin =  async (workPath: string, branch = '') => factoryGitShell(`git push origin ${branch}`, workPath);
export const gitPushOriginU = async (workPath: string, branch = '') => factoryGitShell(`git push -u origin ${branch}`, workPath);
export const gitAddAll = async (workPath: string) => factoryGitShell('git add .', workPath);
export const gitCommitM = async (workPath: string, msg: string) => factoryGitShell('git commit -m ' + msg, workPath);
export const gitBranchR = async (workPath: string) => factoryGitShell('git banch -r', workPath);
export const gitBranchLocal = async (workPath: string) => factoryGitShell('git branch', workPath);


export const gitCheckoutSpawn = async (workPath: string, localBranch: string) => new Promise(resolve => {
  const sp = shellSpawn(`git checkout ${localBranch}`, workPath);
  sp.on('close', code => {
    resolve(code);
  })
});
export const gitCheckoutBSpawn = async (workPath: string, localBranch: string, targetBRanch: string) => new Promise(resolve => {
  const sp = shellSpawn(`git checkout -b ${localBranch}  ${targetBRanch}`, workPath);
  sp.on('close', code => {
    resolve(code);
  })
});
export const gitMergeTargetToLocal = async (workPath: string, targetBranch: string) => new Promise(resolve => {
  const sp = shellSpawn(`git merge ${targetBranch}`, workPath);
  sp.on('close', code => {
    resolve(code);
  })
});

/** get local git origin */
export const gitLocalOriginURI = async (workPath: string) => {
  const { code, stderr, stdout } = await gitRemoteV(workPath);
  if (code !== 0) {
    console.log(stderr);
    process.exit(1);
  }

  const gitOrigin = stdout.split(' ')[0].split('\t')[1];
  return gitOrigin;
};

