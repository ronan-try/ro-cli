(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('shelljs')) :
  typeof define === 'function' && define.amd ? define(['exports', 'shelljs'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.index = {}, global.shelljs));
}(this, (function (exports, shelljs) { 'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () {
              return e[k];
            }
          });
        }
      });
    }
    n['default'] = e;
    return Object.freeze(n);
  }

  var shelljs__namespace = /*#__PURE__*/_interopNamespace(shelljs);

  /** current work path exists a git repo */

  const existGitRepo = workPath => new Promise(resolve => {
    shelljs__namespace.exec('git status', {
      cwd: workPath,
      silent: true
    }, code => resolve(code === 0));
  });

  const factoryGitShell = (workPath, cmd) => new Promise(resolve => {
    shelljs__namespace.exec(cmd, {
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

  exports.existGitRepo = existGitRepo;
  exports.gitBranchCurrent = gitBranchCurrent;
  exports.gitLocalOriginURI = gitLocalOriginURI;
  exports.gitRemoveV = gitRemoveV;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
