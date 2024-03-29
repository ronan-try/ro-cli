#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

 const { getRawCacheData } = require('@ronan-try/cli-cache');

const { textGray, textGreen, logStep } = require('@ronan-try/cli-shared-utils');

const CACHE_PROJECT_FILE_NAME = 'projects';

const cacheProjects = getRawCacheData(CACHE_PROJECT_FILE_NAME);

function logProject (i) {
  console.log();
  console.log(textGreen(i.projectName), ':', i.localPath);
  console.log(textGray('TargetGit'), ':', textGray(i.targetRepo));
}

module.exports = () => {
  console.log();
  console.log(textGreen`最新项目集合：`);

  [].forEach.call(cacheProjects, (i) => {
    logProject(i);
  });
  logStep`the end`;
}
