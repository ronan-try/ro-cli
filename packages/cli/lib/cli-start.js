#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

// 交互模块
const inquirer = require('inquirer');

const { textRedBright, shellSpawn } = require('@ronan-try/cli-shared-utils');
const { gitBranchCurrent } = require('@ronan-try/cli-service');

module.exports = async () => {
  const { selectedProject  } = await require('./inquirers/selectCacheProject')();
  const projectPath = selectedProject.localPath;

  // current git branch
  const branchName = await gitBranchCurrent(projectPath);

  const { confirmed } = await inquirer.prompt([{
    type: 'confirm',
    message: 'Are u sure the branch: ' + textRedBright(branchName),
    name: 'confirmed'
  }]);

  if (!confirmed) return process.exit(1);

  shellSpawn('npm start', projectPath);
  // end
};
