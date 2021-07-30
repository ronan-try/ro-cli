#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

 const { getRawCacheData } = require('@ronan-try/cli-cache');

const { textGray, textGreen } = require('@ronan-try/cli-shared-utils');

const CACHE_PROJECT_FILE_NAME = 'projects';

const cacheProjects = getRawCacheData(CACHE_PROJECT_FILE_NAME);

function logProject (i) {
  console.log();
  console.log(textGreen(i.projectName), ':', i.localPath);
  console.log(textGray('git'), ':', textGray(i.targetRepo));
}

module.exports = () => {
  [].forEach.call(cacheProjects, (i) => {
    logProject(i);
  });
}
