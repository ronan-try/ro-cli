#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

// 交互模块

// 内部依赖
const { logStep } = require('@ronan-try/cli-shared-utils');
const { openWithFolder, openWithVSCode } = require('@ronan-try/cli-os-utils');
const inquirer = require('inquirer');

module.exports = async () => {
  logStep`step1: select project`;
  const { selectedProject } = await require('./inquirers/selectCacheProject')();

  logStep`step2: how to open`;
  {
    const ENUM_FUNS = [
      { key:'vscode', fun: openWithVSCode },
      { key:'folder', fun: openWithFolder },
    ];
    const questions = [{
      type: 'list',
      message: 'how to open with',
      name: 'howToOpenWith',
      choices: ENUM_FUNS.map(i => i.key),
    }];
    const { howToOpenWith } = await inquirer.prompt(questions);
    console.log(howToOpenWith);

    const finded = ENUM_FUNS.find(i => i.key === howToOpenWith);
    finded.fun(selectedProject.localPath);

    console.log(selectedProject.localPath);
  }

  logStep`the end`;

};
