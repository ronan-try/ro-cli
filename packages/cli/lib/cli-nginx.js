#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

// 交互模块
const { program } = require('commander');

// 内部依赖
const shellUtils = require('@ronan-try/cli-shared-utils/cjs/shellUtils');

(async () => {
  program
    .option('--start', 'nginx start')
    .option('--stop', 'nginx start')
    .parse(process.argv);
  const options = program.opts();

  options.start && shellUtils.execAsync('D:/SDE/nginx-1.19.4', 'start nginx.exe');
  options.stop && shellUtils.execAsync('D:/SDE/nginx-1.19.4', 'taskkill /f /t /im nginx.exe');

  // end
})();
