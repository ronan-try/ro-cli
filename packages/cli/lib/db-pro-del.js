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
const { logStep } = require('@ronan-try/cli-shared-utils');

// 内部依赖
/** cached project */
const { getRawCacheData, toRewriteCacheData } = require('@ronan-try/cli-cache');
const CACHE_PROJECT_FILE_NAME = 'projects';
const cacheProjects = getRawCacheData(CACHE_PROJECT_FILE_NAME);

module.exports = async () => {
  logStep`step1: select such project`;
  const { selectedIdx, selectedProject } = await require('./inquirers/selectCacheProject')();

  logStep`step2: delete the project`;
  {
    console.log();
    console.table(selectedProject);

    const questions = [{
      type: 'confirm',
      message: 'sure to delete the above project',
      default: false,
      name: 'inputSure'
    }];

    const { inputSure } = await inquirer.prompt(questions);
    inputSure && [].splice.call(cacheProjects, selectedIdx, 1);

    !inputSure && process.exit(1);
  }

  logStep`step3: write cache`;
  const spinner = ora('updating the projects cache file');
  console.log();
  spinner.start();

  await toRewriteCacheData(CACHE_PROJECT_FILE_NAME, cacheProjects);

  spinner.succeed();

  require('./db-pro-list')();
};
