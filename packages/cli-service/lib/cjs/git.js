'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shelljs = require('shelljs');
var child_process = require('child_process');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var shelljs__default = /*#__PURE__*/_interopDefaultLegacy(shelljs);
var child_process__default = /*#__PURE__*/_interopDefaultLegacy(child_process);

/** ro cli git upstream: ro_cli_upstream */
const ROCLI_GIT_UPSTREAM = 'ro_cli_upstream';

const shellSpawn = (cmd, cwdPath) => child_process__default['default'].spawn(cmd, {
  cwd: cwdPath,
  shell: true,
  stdio: 'inherit'
});

/** current work path exists a git repo */

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
/** git branch --show-current */


const gitBranchCurrent = async workPath => {
  const {
    code,
    stdout,
    stderr
  } = await factoryGitShell(workPath, 'git branch --show-current');
  if (code === 0) return stdout.trim();
  process.exit(1);
};
const gitRemoteV = async workPath => factoryGitShell(workPath, 'git remote -v');
const gitRemoteAdd = async (workPath, targetRepo) => factoryGitShell(workPath, `git remote add ${ROCLI_GIT_UPSTREAM} ${targetRepo}`);
const gitRemoteRemove = async (workPath, targetRepo = ROCLI_GIT_UPSTREAM) => factoryGitShell(workPath, `git remote remove ` + targetRepo);
const gitFetchRepo = async (workPath, targetRepo = ROCLI_GIT_UPSTREAM) => factoryGitShell(workPath, `git fetch ` + targetRepo);
const gitCheckoutB = async (workPath, localBranch, targetBranch) => factoryGitShell(workPath, `git checkout -b ${localBranch} ${targetBranch}`);
const gitPushOrigin = async (workPath, branch = '') => factoryGitShell(`git push origin ${branch}`, workPath);
const gitPushOriginU = async (workPath, branch = '') => factoryGitShell(`git push -u origin ${branch}`, workPath);
const gitAddAll = async workPath => factoryGitShell('git add .', workPath);
const gitCommitM = async (workPath, msg) => factoryGitShell('git commit -m ' + msg, workPath);
const gitBranchR = async workPath => factoryGitShell('git banch -r', workPath);
const gitBranchLocal = async workPath => factoryGitShell('git branch', workPath);
const gitCheckoutSpawn = async (workPath, localBranch) => new Promise(resolve => {
  const sp = shellSpawn(`git checkout ${localBranch}`, workPath);
  sp.on('close', code => {
    resolve(code);
  });
});
const gitCheckoutBSpawn = async (workPath, localBranch, targetBRanch) => new Promise(resolve => {
  const sp = shellSpawn(`git checkout -b ${localBranch}  ${targetBRanch}`, workPath);
  sp.on('close', code => {
    resolve(code);
  });
});
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
