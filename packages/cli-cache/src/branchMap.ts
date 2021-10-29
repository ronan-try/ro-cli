import { toRewriteCacheData, getXXFullPath, getRawCacheData } from './base';

export type TypeBranchMap = {
  targetGit: string
  map: { localBranch: string, targetBranch: string }[]
}

const CACHE_NAME = 'branchMap';

export class BranchMap {
  private static raw: TypeBranchMap[];

  private static async write () {
    await toRewriteCacheData(CACHE_NAME, this.raw);
    return true;
  }

  static getRaw () {
    this.raw = getRawCacheData(CACHE_NAME);
    return this.raw;
  }

  static async insertOrUpdate (targetGit: string, localBranch: string, targetBranch: string) {
    let curProject = this.getRaw().find(i => i.targetGit === targetGit);
    // 无当前项目配置
    if (!curProject) {
      curProject = { targetGit, map: [ { localBranch, targetBranch } ] };
      this.raw.push(curProject);
      return await this.write();
    }

    let curBranchInfo = curProject.map.find(i => i.localBranch === localBranch);
    // 无当前local分支信息
    if (!curBranchInfo) {
      curBranchInfo = { localBranch, targetBranch };
      curProject.map.push(curBranchInfo);
      return await this.write();
    }
  }

  static getTargetBranch (targetGit: string, localBranch: string): string | false {
    const curProject = this.getRaw().find(i => i.targetGit === targetGit );
    if (!curProject) return false;

    const curBranchInfo = curProject.map.find(i => i.localBranch === localBranch);
    if (!curBranchInfo) return false;

    return curBranchInfo.targetBranch;
  }

}
