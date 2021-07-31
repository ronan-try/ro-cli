#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

const ora = require('ora');
// 交互模块
const inquirer = require('inquirer');
// 文件模块
const { textCyan, textYellow, textGreen, textRed, logStep } = require('@ronan-try/cli-shared-utils');
const {
  gitBranchR,
  gitBranchLocal,
  gitLocalOriginURI,
  gitRemoteAdd,
  gitFetchRepo,
  gitRemoteRemove,
  gitCheckoutSpawn,
  gitMergeTargetToLocal,
} = require('@ronan-try/cli-service');

const { ROCLI_GIT_UPSTREAM } = require('@ronan-try/cli-const');

module.exports = async () => {
  logStep`step1: select project`;
  const { selectedProject } = await require('./inquirers/selectCacheProject')();
  const workspacePath = selectedProject.localPath;

  logStep`step2: confirm the 2 repo`;
  let repoTarget = selectedProject.targetRepo;
  {
    const personalRepo = await gitLocalOriginURI(workspacePath);
    const { inputIsPersonal, inputIsTarget } = await inquirer.prompt([
      {
        type: 'confirm',
        message: 'Is personal repo: ' + textCyan(personalRepo),
        name: 'inputIsPersonal',
        default: false,
      },
      {
        type: 'confirm',
        message: 'Is target repo: ' + textCyan(repoTarget),
        name: 'inputIsTarget',
        default: false,
      }
    ]);

    if (!(inputIsPersonal && inputIsTarget)) {
      console.log();
      console.log(textYellow('repo 存在质疑，可通过\'ro update\' 更新'));
      process.exit(1);
    }
  }

  logStep`step3: confirm local branch`;
  let localBranch;
  {
    const res = await gitBranchLocal(workspacePath);
    if (res.code !== 0) {
      spinner.fail(res.stderr);
      throw res.stderr && process.exit(1);
    }

    const LocalBranches = [];
    [].push.apply(LocalBranches, res.stdout.split('\n').map(i => i.trim()));

    const { inputLocalBranch } = await inquirer.prompt([
      {
        type: 'list',
        message: 'Which local branch: ',
        name: 'inputLocalBranch',
        choices: LocalBranches,
      },
    ]);

    localBranch = ''.replace.call(inputLocalBranch, '*','');
  }

  logStep`step4: checkout local branch`;
  {
    const code = await gitCheckoutSpawn(workspacePath, localBranch);
    if (code !== 0) {
      throw process.exit(1);
    }
  }

  // 加载图标
  const spinnerFetch = ora('add && fetch target repo...');
  spinnerFetch.start();

  logStep`step5: add upstream`;
  {
    await gitRemoteRemove(workspacePath);

    const res = await gitRemoteAdd(workspacePath, repoTarget);
    if (res.code !== 0 && !res.stderr.includes('already exists')) {
      spinnerFetch.fail(res.stderr);
      throw res.stderr && process.exit(1);
    }

    console.log();
    console.log(textCyan('successfully added target repo'));
  }

  logStep`step6: fetch upstream`
  {
    const res = await gitFetchRepo(workspacePath, ROCLI_GIT_UPSTREAM);
    if (res.code !== 0) {
      spinnerFetch.fail(res.stderr);
      throw res.stderr && process.exit(1);
    }
  }
  const TargetBranches = [];
  {
    const res = await gitBranchR(workspacePath);;;
    if (res.code !== 0) {
      spinner.fail(res.stderr);
      throw res.stderr && process.exit(1);
    }

    [].push.apply(TargetBranches, res.stdout.split('\n').map(i => i.trim()).filter(i => i.includes(ROCLI_GIT_UPSTREAM)));

    // console.log();
    // TargetBranches.forEach(i => console.log(textGreen(i)));
  }
  spinnerFetch.succeed('git fetch successfully');

  logStep`step7: select target branch to sync`;
  let targetBranch;
  {
    const { inputTargetBranch } = await inquirer.prompt([{
      type: 'list',
      message: 'Which target branches to sync: ',
      name: 'inputTargetBranch',
      choices: TargetBranches,
    }]);
    targetBranch = inputTargetBranch;
  }

  const spinnerFlow = ora('syncing...');
  spinnerFlow.start();

  logStep`step8: syncing`;
  {
    const code = await gitMergeTargetToLocal(workspacePath, targetBranch);

    if (code !== 0) {
      spinnerFlow.fail(textRed`expected result, 耐心阅读message，打开vscode自行解决`);
      throw process.exit(1);
    }

    try {
      logStep`step7: git remote remove`;
      await gitRemoteRemove(workspacePath);
    } catch {
      // to do
      logStep`step7[unexpected]: git remote remove`;
    }
  }
  spinnerFlow.succeed('successfully');

  require('@ronan-try/cli-os-utils').openWithVSCode(workspacePath);
};
