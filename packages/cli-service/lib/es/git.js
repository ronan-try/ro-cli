import shelljs from 'shelljs';

/** current work path exists a git repo */

const existGitRepo = workPath => new Promise(resolve => {
  shelljs.exec('git status', {
    cwd: workPath,
    silent: true
  }, code => resolve(code === 0));
});

const factoryGitShell = (workPath, cmd) => new Promise(resolve => {
  shelljs.exec(cmd, {
    cwd: workPath,
    silent: true
  }, (code, stdout, stderr) => resolve({
    code,
    stdout,
    stderr
  }));
});
/** git branch --show-current */


const gitBranchCurrent = async workPath => {
  const {
    code,
    stdout,
    stderr
  } = await factoryGitShell(workPath, 'git branch --show-current');
  if (code === 0) return stdout.trim();
  console.log(stderr);
  process.exit(1);
};
const gitRemoveV = async workPath => factoryGitShell(workPath, 'git remote -v');
/** get local git origin */

const gitLocalOriginURI = async workPath => {
  const {
    code,
    stderr,
    stdout
  } = await gitRemoveV(workPath);

  if (code !== 0) {
    console.log(stderr);
    process.exit(1);
  }

  const gitOrigin = stdout.split(' ')[0].split('\t')[1];
  return gitOrigin;
};

export { existGitRepo, gitBranchCurrent, gitLocalOriginURI, gitRemoveV };
