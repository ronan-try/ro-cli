#!/usr/bin/env node
/**
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

// 交互模块
const inquirer = require('inquirer');
// tools
const { textRedBright, textGreen, } = require('@ronan-try/cli-shared-utils')
const { logStep } = require('@ronan-try/cli-shared-utils');
// service
const { existGitRepo, gitBranchCurrent, gitLocalOriginURI, } = require('@ronan-try/cli-service');

async function sureToMakeMRForTheBranch (branchName) {
  const questions = [{
    type: 'confirm',
    message: 'Sure to Make a MR/PR for the branch: ' + textGreen(branchName),
    name: 'yeah'
  }];
  const { yeah } = await inquirer.prompt(questions);
  return yeah;
}

async function openBroswerWithMrUrl (workPath, branchName) {
  const originUrl = await gitLocalOriginURI(workPath);
  // 默认git地址
  let url = `${originUrl}`
    .replace('.com:', '.com/')
    .replace('git@', 'https://')
    .replace('.git', '/merge_requests/new?')
    + 'merge_request%5Bsource_branch%5D='
    + branchName;

  if (originUrl.includes('github.com')) {
    url = `${originUrl}`.replace('.git', '/compare/main...' + originUrl.replace('https://github.com/', '').replace(/(\/(\S*))/, '') + ':' + branchName);
  }
  if (originUrl.includes('gitee.com')) {
    url = `${originUrl}`.replace('.git', '/compare/main...' + originUrl.replace('https://gitee.com/', '').replace(/(\/(\S*))/, '') + ':' + branchName);
  }
  if (originUrl.includes('gitlab') && originUrl.includes('om.com')) {
    // 通过当前的workPath 获取 targetGit
    // require('@ronan-try/cli-cache').BranchMap.get
    const targetBranch = require('@ronan-try/cli-cache').BranchMap.getTargetBranchByWorkPath(workPath, branchName);
    url = targetBranch ? url + '"&"merge_request%5Btarget_branch%5D=' + targetBranch : url;
  }

  require('@ronan-try/cli-os-utils').openWithBrowser(url);
}

module.exports = async () => {
  logStep`Hi, Here is MR `;

  const curWorkPath = process.cwd();

  logStep`step1: 识别当前执行环境，是否含Git Repo`;
  const existedGitRepo = await existGitRepo(curWorkPath);
  if (!existedGitRepo) {
    console.log(textRedBright`当前路径：`, curWorkPath);
    console.log(textRedBright`不存在 git repo`);

    logStep('step2: 不含Git Repo');
    logStep('step3: 选择Git Repo');
    logStep('step4: 选择branch');
    logStep('step5: 发起MR');
    process.exit(1);
  }

  logStep`step2: 含Git repo`;
  logStep`step3: 当前Gir repo 是否在config中？`;
  // 当前仅考虑内部使用，所以跳过step3
  logStep('step4: 当前branch是否为要MR的branch？');
  {
    const curBranchName = await gitBranchCurrent(curWorkPath);
    const yeah = await sureToMakeMRForTheBranch(curBranchName);
    if (yeah) {
      logStep('step5: 就是当前的branch，发起MR');

      openBroswerWithMrUrl(curWorkPath, curBranchName);
    } else {
      // to do
    }
  }
};
