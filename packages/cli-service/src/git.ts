import shelljs from 'shelljs';
import { ROCLI_GIT_UPSTREAM } from '@ronan-try/cli-const';
import { shellSpawn } from '@ronan-try/cli-shared-utils/src/shellUtils';

type ShellExecResult = { code: number, stdout: string, stderr: string }

/** 当前路径是否存在git？ */
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

/** 当前git状态分支(git branch --show-current) */
export const gitBranchCurrent = async (workPath: string) => {
  const { code, stdout, stderr } = await factoryGitShell(workPath, 'git branch --show-current');
  if (code === 0) return stdout.trim();

  process.exit(1);
};

/** 查看所有远程分支(git remote -v) */
export const gitRemoteV = async (workPath: string) => factoryGitShell(workPath, 'git remote -v');
/** 添加远程分支(git remote add ) */
export const gitRemoteAdd = async (workPath: string, targetRepo: string) => factoryGitShell(workPath, `git remote add ${ROCLI_GIT_UPSTREAM} ${targetRepo}`)
/** 删除远程分支(git remote remove) */
export const gitRemoteRemove = async (workPath: string, targetRepo = ROCLI_GIT_UPSTREAM) => factoryGitShell(workPath, `git remote remove ` + targetRepo)
/** 获取远程分支(git fetch) */
export const gitFetchRepo = async (workPath: string, targetRepo = ROCLI_GIT_UPSTREAM) => factoryGitShell(workPath, `git fetch ` + targetRepo)
/** 创建本地分支(git checkout -b) */
export const gitCheckoutB = async (workPath: string, localBranch: string, targetBranch: string) => factoryGitShell(workPath, `git checkout -b ${localBranch} ${targetBranch}`)
/** 推送分支到origin(git push origin) */
export const gitPushOrigin = async (workPath: string, branch = '') => factoryGitShell(workPath, `git push origin ${branch}`,);
/** 推送分支 并建立关联 */
export const gitPushOriginU = async (workPath: string, branch = '') => factoryGitShell(workPath, `git push -u origin ${branch}`,);
/** git add . */
export const gitAddAll = async (workPath: string) => factoryGitShell(workPath, 'git add .',);
/** git commit -m */
export const gitCommitM = async (workPath: string, msg: string) => factoryGitShell(workPath, 'git commit -m ' + msg,);
/** 查看远程分支(git branch -r) */
export const gitBranchR = async (workPath: string) => factoryGitShell(workPath, 'git branch -r',);
/** 查看本地分支 */
export const gitBranchLocal = async (workPath: string) => factoryGitShell(workPath, 'git branch',);

/** shell Spawn 执行checkout */
export const gitCheckoutSpawn = async (workPath: string, localBranch: string) => new Promise(resolve => {
  const sp = shellSpawn(`git checkout ${localBranch}`, workPath);
  sp.on('close', code => {
    resolve(code);
  })
});
/** shell Spawn 执行checkout -b */
export const gitCheckoutBSpawn = async (workPath: string, localBranch: string, targetBRanch: string) => new Promise(resolve => {
  const sp = shellSpawn(`git checkout -b ${localBranch}  ${targetBRanch}`, workPath);
  sp.on('close', code => {
    resolve(code);
  })
});

/** shell Spawn 执行git merge */
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

