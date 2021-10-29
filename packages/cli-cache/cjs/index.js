'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');
var path = require('path');

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

var fs__namespace = /*#__PURE__*/_interopNamespace(fs);
var path__namespace = /*#__PURE__*/_interopNamespace(path);

const CACHE_FILE_EXIT = '.cache.json';
/** 获取某缓存文件Path
 *
 * @param cacheName 缓存文件名
 * @returns 路径(string)
 */

const getXXFullPath = cacheName => {
  const _path = path__namespace.resolve(__dirname, '../local/' + cacheName + CACHE_FILE_EXIT);

  if (fs__namespace.existsSync(_path)) {
    return _path;
  }

  fs__namespace.writeFileSync(_path, JSON.stringify([]));
  return _path;
};
/** 获取某缓存文件Raw数据
 *
 * 采用require()方式拿取文件
 *
 * @param cacheName 缓存文件名
 * @returns 原始文件(文本形式)
 */

const getRawCacheData = cacheName => require(getXXFullPath(cacheName));
/** 写入缓存
 *
 * @param cacheName 缓存文件名
 * @param data 要写入的数据
 * @returns Promise
 */

const toRewriteCacheData = (cacheName, data) => new Promise(resolve => {
  fs__namespace.writeFile(getXXFullPath(cacheName), JSON.stringify(data), err => {
    if (err) throw err;
    resolve(true);
  });
});

const CACHE_NAME = 'branchMap';
class BranchMap {
  static async write() {
    await toRewriteCacheData(CACHE_NAME, this.raw);
    return true;
  }

  static getRaw() {
    this.raw = getRawCacheData(CACHE_NAME);
    return this.raw;
  }

  static async insertOrUpdate(targetGit, localBranch, targetBranch) {
    let curProject = this.getRaw().find(i => i.targetGit === targetGit); // 无当前项目配置

    if (!curProject) {
      curProject = {
        targetGit,
        map: [{
          localBranch,
          targetBranch
        }]
      };
      this.raw.push(curProject);
      return await this.write();
    }

    let curBranchInfo = curProject.map.find(i => i.localBranch === localBranch); // 无当前local分支信息

    if (!curBranchInfo) {
      curBranchInfo = {
        localBranch,
        targetBranch
      };
      curProject.map.push(curBranchInfo);
      return await this.write();
    }
  }

  static getTargetBranch(targetGit, localBranch) {
    const curProject = this.getRaw().find(i => i.targetGit === targetGit);
    if (!curProject) return false;
    const curBranchInfo = curProject.map.find(i => i.localBranch === localBranch);
    if (!curBranchInfo) return false;
    return curBranchInfo.targetBranch;
  }

  static getTargetBranchByWorkPath(workPath, localBranch) {
    const rawProjects = getRawCacheData('projects');
    const curPro = rawProjects.find(i => i.localPath === workPath);
    const targetGit = curPro.targetRepo;
    return this.getTargetBranch(targetGit, localBranch);
  }

}

exports.BranchMap = BranchMap;
exports.getRawCacheData = getRawCacheData;
exports.getXXFullPath = getXXFullPath;
exports.toRewriteCacheData = toRewriteCacheData;
