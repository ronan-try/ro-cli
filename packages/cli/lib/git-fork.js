#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

const ora = require('ora');
// 交互模块
const inquirer = require('inquirer');
// tools
const { textCyan, textYellow, textGreen, logStep } = require('@ronan-try/cli-shared-utils')
// service
const {
  gitBranchR,
  gitLocalOriginURI,
  gitFetchRepo,
  gitRemoteAdd,
  gitRemoteRemove,
  gitPushOriginU,
  gitCheckoutBSpawn
} = require('@ronan-try/cli-service');
// const
const { ORIGIN_GIT_UPSTREAM, ROCLI_GIT_UPSTREAM } = require('@ronan-try/cli-const');

module.exports = async () => {
  logStep('step1: select project');

  const { selectedProject } = await require('./inquirers/selectCacheProject')();

  const personalRepo = await gitLocalOriginURI(selectedProject.localPath);

  logStep`step2: user check repos`;
  {
    const questions = [
      {
        type: 'confirm',
        default: false,
        message: 'Is personal repo: ' + textCyan(personalRepo),
        name: 'inputIsPersonal'
      },
      {
        type: 'confirm',
        default: false,
        message: 'Is target repo: ' + textCyan(selectedProject.targetRepo),
        name: 'inputIsTarget'
      }
    ];
    const { inputIsPersonal, inputIsTarget } = await inquirer.prompt(questions);

    if (!(inputIsPersonal && inputIsTarget)) {
      console.log();
      console.log(textYellow('repo 存在质疑，可通过\'ro update\' 更新'));
      process.exit(1);
    }
  }

  logStep`step3: add upstream`;
  {
    const spinner = ora('add upstream...');
    spinner.start();

    await gitRemoteRemove(selectedProject.localPath);

    const res = await gitRemoteAdd(selectedProject.localPath, selectedProject.targetRepo);

    if (res.code !== 0 && !res.stderr.includes('already exists')) {
      spinner.fail(res.stderr);
      throw res.stderr && process.exit(1);
    }
    spinner.succeed();
  }

  logStep`step4: fetch upstream`;
  {
    const spinner = ora('fetch upstream...');
    spinner.start();

    const res = await gitFetchRepo(selectedProject.localPath);
    if (res.code !== 0) {
      spinner.fail(res.stderr);
      throw res.stderr && process.exit(1);
    }
    spinner.succeed();
  }

  logStep`step4: get branch -v`;
  const TargetBranches = [];
  {
    const spinner = ora('get branch -v...');
    console.log(selectedProject.localPath);

    const res = await gitBranchR(selectedProject.localPath);
    console.log(res);
    if (res.code !== 0) {
      spinner.fail(res.stderr);
      throw res.stderr;
    }

    [].push.apply(TargetBranches, res.stdout.split('\n').map(i => i.trim()).filter(i => i.includes(ROCLI_GIT_UPSTREAM)));

    console.log();
    TargetBranches.forEach(i => console.log(textGreen(i)));
    spinner.succeed();
  }

  logStep`step6: select to fork`;
  let theTargetBranch, theNewLocalBranch;
  {
    const questions = [
      {
        type: 'list',
        message: 'Which target branches: ',
        name: 'inputTargetBranch',
        choices: TargetBranches,
      },
      {
        type: 'input',
        message: 'What\'s local branch name: ',
        name: 'inputLocalBranch',
        validate: (val) => {
          const str = `${val}`.trim();
          if (!str) return 'must required';

          return true;
        }
      }
    ];
    const { inputTargetBranch, inputLocalBranch } = await inquirer.prompt(questions);

    theTargetBranch = inputTargetBranch;
    theNewLocalBranch = inputLocalBranch;
  }

  logStep`step7: forking`;
  {
    const spinner = ora('foking ...');
    console.log();
    spinner.start();

    console.log(textGreen(selectedProject.localPath));
    console.log(textGreen(theNewLocalBranch));
    console.log(textGreen(theTargetBranch));
    const res = await gitCheckoutBSpawn(selectedProject.localPath, theNewLocalBranch, theTargetBranch);

    if (res !== 0) {
      spinner.fail(res.stderr);
      throw res.stderr;
    }

    spinner.succeed();
  }

  logStep`step8: tracking`;
  {
    const spinner = ora('tracking...');
    spinner.start();
    try {
      await gitRemoteRemove(selectedProject.localPath);
    } catch {
      // to do
    }

    const res = await gitPushOriginU(selectedProject.localPath, theNewLocalBranch);

    if (res.code !== 0) {
      spinner.fail(res.stderr);
      throw res.stderr;
    }

    spinner.succeed();
  }

  logStep`step9: open with vscode`;
  require('@ronan-try/cli-os-utils').openWithVSCode(selectedProject.localPath);

  logStep`step: the end`;

};
