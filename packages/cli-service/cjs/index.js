'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shelljs = require('shelljs');
var cliConst = require('@ronan-try/cli-const');
var child_process = require('child_process');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var shelljs__default = /*#__PURE__*/_interopDefaultLegacy(shelljs);
var child_process__default = /*#__PURE__*/_interopDefaultLegacy(child_process);

const shellSpawn = (cmd, cwdPath) => child_process__default['default'].spawn(cmd, {
  cwd: cwdPath,
  shell: true,
  stdio: 'inherit'
});

/** 当前路径是否存在git？ */

const existGitRepo = workPath => new Promise(resolve => {
  shelljs__default['default'].exec('git status', {
    cwd: workPath,
    silent: true
  }, code => resolve(code === 0));
});

const factoryGitShell = (workPath, cmd) => new Promise(resolve => {
  shelljs__default['default'].exec(cmd, {
    cwd: workPath,
    silent: true
  }, (code, stdout, stderr) => resolve({
    code,
    stdout,
    stderr
  }));
});
/** 当前git状态分支(git branch --show-current) */


const gitBranchCurrent = async workPath => {
  const {
    code,
    stdout,
    stderr
  } = await factoryGitShell(workPath, 'git branch --show-current');
  if (code === 0) return stdout.trim();
  process.exit(1);
};
/** 查看所有远程分支(git remote -v) */

const gitRemoteV = async workPath => factoryGitShell(workPath, 'git remote -v');
/** 添加远程分支(git remote add ) */

const gitRemoteAdd = async (workPath, targetRepo) => factoryGitShell(workPath, `git remote add ${cliConst.ROCLI_GIT_UPSTREAM} ${targetRepo}`);
/** 删除远程分支(git remote remove) */

const gitRemoteRemove = async (workPath, targetRepo = cliConst.ROCLI_GIT_UPSTREAM) => factoryGitShell(workPath, `git remote remove ` + targetRepo);
/** 获取远程分支(git fetch) */

const gitFetchRepo = async (workPath, targetRepo = cliConst.ROCLI_GIT_UPSTREAM) => factoryGitShell(workPath, `git fetch ` + targetRepo);
/** 创建本地分支(git checkout -b) */

const gitCheckoutB = async (workPath, localBranch, targetBranch) => factoryGitShell(workPath, `git checkout -b ${localBranch} ${targetBranch}`);
/** 推送分支到origin(git push origin) */

const gitPushOrigin = async (workPath, branch = '') => factoryGitShell(workPath, `git push origin ${branch}`);
/** 推送分支 并建立关联 */

const gitPushOriginU = async (workPath, branch = '') => factoryGitShell(workPath, `git push -u origin ${branch}`);
/** git add . */

const gitAddAll = async workPath => factoryGitShell(workPath, 'git add .');
/** git commit -m */

const gitCommitM = async (workPath, msg) => factoryGitShell(workPath, 'git commit -m ' + msg);
/** 查看远程分支(git branch -r) */

const gitBranchR = async workPath => factoryGitShell(workPath, 'git branch -r');
/** 查看本地分支 */

const gitBranchLocal = async workPath => factoryGitShell(workPath, 'git branch');
/** shell Spawn 执行checkout */

const gitCheckoutSpawn = async (workPath, localBranch) => new Promise(resolve => {
  const sp = shellSpawn(`git checkout ${localBranch}`, workPath);
  sp.on('close', code => {
    resolve(code);
  });
});
/** shell Spawn 执行checkout -b */

const gitCheckoutBSpawn = async (workPath, localBranch, targetBRanch) => new Promise(resolve => {
  const sp = shellSpawn(`git checkout -b ${localBranch}  ${targetBRanch}`, workPath);
  sp.on('close', code => {
    resolve(code);
  });
});
/** shell Spawn 执行git merge */

const gitMergeTargetToLocal = async (workPath, targetBranch) => new Promise(resolve => {
  const sp = shellSpawn(`git merge ${targetBranch}`, workPath);
  sp.on('close', code => {
    resolve(code);
  });
});
/** get local git origin */

const gitLocalOriginURI = async workPath => {
  const {
    code,
    stderr,
    stdout
  } = await gitRemoteV(workPath);

  if (code !== 0) {
    console.log(stderr);
    process.exit(1);
  }

  const gitOrigin = stdout.split(' ')[0].split('\t')[1];
  return gitOrigin;
};

exports.existGitRepo = existGitRepo;
exports.gitAddAll = gitAddAll;
exports.gitBranchCurrent = gitBranchCurrent;
exports.gitBranchLocal = gitBranchLocal;
exports.gitBranchR = gitBranchR;
exports.gitCheckoutB = gitCheckoutB;
exports.gitCheckoutBSpawn = gitCheckoutBSpawn;
exports.gitCheckoutSpawn = gitCheckoutSpawn;
exports.gitCommitM = gitCommitM;
exports.gitFetchRepo = gitFetchRepo;
exports.gitLocalOriginURI = gitLocalOriginURI;
exports.gitMergeTargetToLocal = gitMergeTargetToLocal;
exports.gitPushOrigin = gitPushOrigin;
exports.gitPushOriginU = gitPushOriginU;
exports.gitRemoteAdd = gitRemoteAdd;
exports.gitRemoteRemove = gitRemoteRemove;
exports.gitRemoteV = gitRemoteV;
