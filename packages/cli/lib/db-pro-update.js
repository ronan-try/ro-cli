#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

// 交互模块
const ora = require('ora');
const inquirer = require('inquirer');

// 内部依赖
const { logStep } = require('@ronan-try/cli-shared-utils');
/** cached project */
const { getRawCacheData, toRewriteCacheData } = require('@ronan-try/cli-cache');
const CACHE_PROJECT_FILE_NAME = 'projects';
const cacheProjects = getRawCacheData(CACHE_PROJECT_FILE_NAME);

module.exports = async () => {
  logStep`step1: select such project`;
  const { selectedIdx, selectedProject } = await require('./inquirers/selectCacheProject')();

  logStep`step2: update project's config`;
  {
    const questions = Object.entries(selectedProject).map(([key, value]) => {
      return {
        type: 'input',
        message: 'to update ' + key,
        default: value,
        name: key
      };
    });

    const answers = await inquirer.prompt(questions);

    Object.assign(cacheProjects[selectedIdx], answers);
  }

  logStep`step3: write cache`;
  const spinner = ora('updating the projects cache file');
  spinner.start();
  await toRewriteCacheData(CACHE_PROJECT_FILE_NAME, cacheProjects);
  spinner.succeed();


  require('./db-pro-list')();
};
