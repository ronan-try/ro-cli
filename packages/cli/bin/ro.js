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
  .description(`添加本地项目到Cli/ add project's local path`)
  .action(() => require('../lib/pro-add')());

program
  .command('list')
  .description('查看Cli所有本地项目/ table the cached projects')
  .action(() => require('../lib/pro-list')());

program
  .command('delete')
  .description(`删除Cli中的本地项目/ delete project's local path`)
  .action(() => require('../lib/pro-del')());

program
  .command('update')
  .description(`更新Cli中的本地项目/ update such project's config`)
  .action(() => require('../lib/pro-update')());

program
  .command('fork')
  .description('Fork目标仓库分支到本地项目/ new a local-repo branch from a target-repo branch')
  .action(() => require('../lib/git-fork')());

program
  .command('sync')
  .description('同步目标仓库分支到本地分支/ sync the target branch to local branch')
  .action(() => require('../lib/git-sync')());

program
  .command('pr')
  .description('发起Pull request/ make a pr to target-repo')
  .action(() => require('../lib/git-pr')());

program
  .command('mr')
  .description('发起Merge request/ make a pr to target-repo')
  .action(() => require('../lib/git-pr')());

program
  .command('start')
  .description('启动本地项目/ new terminal to start your project')
  .action(() => require('../lib/pro-start')());

program
  .command('open')
  .description('打开本地项目(-fd or -vs)/ open a project folder/vs code')
  .option('-fd, --folder', '使用资源目录打开/ open with folder')
  .option('-vs, --vscode', '使用VSCode打开/ open with vscode')
  .action(() => require('../lib/pro-open')());

program
  .command('diff <file-0> <file-1>', 'Compare two files with each other.');

program
  .command('ui')
  .description('ui可视化点点点/ ui operation')
  .action(() => require('../lib/git-ui')());

program
  .command('ng1')
  .description('ng1:本地打包test/master，发布test/master')
  .option('-t, --test', 'merge feature to test, build, push test')
  .option('-m, --master', 'merge feature to master, build, push master')
  .action(() => require('../lib/pro-ng1')());

program
  .command('nginx')
  .description('nginx start or stop')
  .option('--start', 'nginx start')
  .option('--stop', 'nginx start')
  .action(() => require('../lib/cli-nginx'));

program.parse(process.argv);
