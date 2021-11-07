const { ROCLI_GIT_UPSTREAM } = require('@ronan-try/cli-const')

/** 缓存 fork分支信息
 * 
 * @param {string} targetRepo 目标仓库的repo
 * @param {string} localBranchName 私人本地分支名
 * @param {string} targetBranchName 目标仓库分支名
 */
exports.cacheBranchInfo = (targetRepo, localBranchName, targetBranchName) => {
  try {
    require('@ronan-try/cli-cache').BranchMap.insertOrUpdate(targetRepo, localBranchName, targetBranchName.replace(ROCLI_GIT_UPSTREAM + '/', ''));
  } catch {}
}
