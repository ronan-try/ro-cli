import * as fs from 'fs';
import * as path from 'path';

const CACHE_FILE_EXIT = '.cache.json';
/** 获取某缓存文件Path
 *
 * @param cacheName 缓存文件名
 * @returns 路径(string)
 */

const getXXFullPath = cacheName => {
  const _path = path.resolve(__dirname, '../local/' + cacheName + CACHE_FILE_EXIT);

  if (fs.existsSync(_path)) {
    return _path;
  }

  fs.writeFileSync(_path, JSON.stringify([]));
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
  fs.writeFile(getXXFullPath(cacheName), JSON.stringify(data), err => {
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

}

export { BranchMap, getRawCacheData, getXXFullPath, toRewriteCacheData };
