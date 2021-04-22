#!/usr/bin/env node
/**
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

const { program } = require('commander');

program
  .version(`${require('../package.json').version}`)
  .usage('<command> [options]');

program
  .command('mr')
  .description('make a mr to target-repo')
  .action(() => require('../lib/pr.js')());

program.parse(process.argv);
