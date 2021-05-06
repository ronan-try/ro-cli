const inquirer = require('inquirer');
const { getRawCacheData } = require('@ronan-try/cli-cache');
const __projects__ = getRawCacheData('projects')

async function selectCacheProjects() {
  return new Promise(async resolve => {
    const SPLITCHAR = require('@ronan-try/cli-const').SPLIT_CHAR;

    const questions = [{
      type: 'list',
      message: 'Which local project',
      name: 'inputSelected',
      choices: [].map.call(__projects__, i => (`${i.projectName}${SPLITCHAR}${i.localPath}`))
    }];

    const { inputSelected } = await inquirer.prompt(questions);

    const selectedIdx = [].findIndex.call(__projects__, i => i.localPath === ''.split.call(inputSelected, SPLITCHAR)[1]);
    if (selectedIdx < 0) {
      throw 'your selected do not find, please use `ro list` to confirm the cache';
    }

    const selectedProject = __projects__[selectedIdx];
  
    resolve({ selectedProject, selectedIdx });
  });
}

module.exports = selectCacheProjects;
