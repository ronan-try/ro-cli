#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

const { program } = require('commander');

function  padRight (descChiness, descEnglish, len = 20) {
  return `${descChiness}`.padEnd(len, ' ') + '// ' + descEnglish;
}

program
  .version(`${require('../package.json').version}`)
  .usage('<command> [options]');

program
  .command('add')
  .description(padRight('新增-本地项目信息', 'add new local projects'))
  .action(() => require('../lib/db-pro-add')());

program
  .command('list')
  .description(padRight('查看-本地项目信息', 'table the local projects'))
  .action(() => require('../lib/db-pro-list')());

program
  .command('delete')
  .description(padRight('删除-本地项目信息', 'delete one local project'))
  .action(() => require('../lib/db-pro-del')());

program
  .command('update')
  .description(padRight('更新-本地项目信息', 'update such a local project'))
  .action(() => require('../lib/db-pro-update')());

program
  .command('fork')
  .description(padRight('fork目标分支 -> 个人分支', 'new a local-repo branch from a target-repo branch'))
  .action(() => require('../lib/git-fork')());

program
  .command('sync')
  .description(padRight('同步目标分支 -> 个人分支', 'sync the target branch to local branch'))
  .action(() => require('../lib/git-sync')());

program
  .command('pr')
  .description(padRight('发起 PR', 'make a PR to target-repo'))
  .action(() => require('../lib/git-pr')());

program
  .command('mr')
  .description(padRight('发起 MR', 'make a MR to target-repo'))
  .action(() => require('../lib/git-pr')());

program
  .command('start')
  .description('启动本地项目 // new terminal to start your project')
  .action(() => require('../lib/cli-start')());

program
  .command('open')
  .description('打开本地项目(-fd or -vs) // open a project folder/vs code')
  .option('-fd, --folder', '使用资源目录打开/ open with folder')
  .option('-vs, --vscode', '使用VSCode打开/ open with vscode')
  .action(() => require('../lib/cli-open')());

program
  .command('diff <file-0> <file-1>', '利用vscode 对比文件');

program
  .command('ui')
  .description('ui可视化点点点 // ui operation')
  .action(() => require('../lib/git-ui')());

program
  .command('ng1')
  .description('ng1:本地打包test/master，发布test/master')
  .option('-t, --test', 'merge feature to test, build, push test')
  .option('-m, --master', 'merge feature to master, build, push master')
  .action(() => require('../lib/cli-ng1')());

program
  .command('nginx')
  .description('nginx start or stop')
  .option('--start', 'nginx start')
  .option('--stop', 'nginx start')
  .action(() => require('../lib/cli-nginx'));

program.parse(process.argv);
