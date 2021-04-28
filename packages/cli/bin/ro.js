#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

const { program } = require('commander');

program
  .version(`${require('../package.json').version}`)
  .usage('<command> [options]');

program
  .command('add')
  .description(`add project's local path`)
  .action(() => require('../lib/pro-add')());

program
  .command('list')
  .description('table the cached projects')
  .action(() => require('../lib/pro-list')());

program
  .command('delete')
  .description(`delete project's local path`)
  .action(() => require('../lib/pro-del')());

program
  .command('update')
  .description(`update such project's config`)
  .action(() => require('../lib/pro-update')());

program
  .command('fork')
  .description('new a local-repo branch from a target-repo branch')
  .action(() => require('../lib/git-fork')());

program
  .command('sync')
  .description('sync the target branch to local branch')
  .action(() => require('../lib/git-sync')());

program
  .command('pr')
  .description('make a pr to target-repo')
  .action(() => require('../lib/git-pr')());

program
  .command('mr')
  .description('make a pr to target-repo')
  .action(() => require('../lib/git-pr')());

program
  .command('start')
  .description('new terminal to start your project')
  .action(() => require('../lib/pro-start')());

program
  .command('open')
  .description('open a project folder/vs code')
  .option('-fd, --folder', 'open with folder')
  .option('-vs, --vscode', 'open with vscode')
  .action(() => require('../lib/pro-open')());

program
  .command('diff <file-0> <file-1>', 'Compare two files with each other.');

program
  .command('ui')
  .description('ui operation')
  .action(() => require('../lib/git-ui')());

program
  .command('ng1')
  .description('ng1:本地打包test/master，发布test/master')
  .option('-t, --test', 'merge feature to test, build, push test')
  .option('-m, --master', 'merge feature to master, build, push master')
  .action(() => require('../lib/pro-ng1')());

program.parse(process.argv);
