declare type ShellExecResult = {
    code: number;
    stdout: string;
    stderr: string;
};
/** 当前路径是否存在git？ */
declare const existGitRepo: (workPath: string) => Promise<boolean>;
/** 当前git状态分支(git branch --show-current) */
declare const gitBranchCurrent: (workPath: string) => Promise<string>;
/** 查看所有远程分支(git remote -v) */
declare const gitRemoteV: (workPath: string) => Promise<ShellExecResult>;
/** 添加远程分支(git remote add ) */
declare const gitRemoteAdd: (workPath: string, targetRepo: string) => Promise<ShellExecResult>;
/** 删除远程分支(git remote remove) */
declare const gitRemoteRemove: (workPath: string, targetRepo?: string) => Promise<ShellExecResult>;
/** 获取远程分支(git fetch) */
declare const gitFetchRepo: (workPath: string, targetRepo?: string) => Promise<ShellExecResult>;
/** 创建本地分支(git checkout -b) */
declare const gitCheckoutB: (workPath: string, localBranch: string, targetBranch: string) => Promise<ShellExecResult>;
/** 推送分支到origin(git push origin) */
declare const gitPushOrigin: (workPath: string, branch?: string) => Promise<ShellExecResult>;
/** 推送分支 并建立关联 */
declare const gitPushOriginU: (workPath: string, branch?: string) => Promise<ShellExecResult>;
/** git add . */
declare const gitAddAll: (workPath: string) => Promise<ShellExecResult>;
/** git commit -m */
declare const gitCommitM: (workPath: string, msg: string) => Promise<ShellExecResult>;
/** 查看远程分支(git branch -r) */
declare const gitBranchR: (workPath: string) => Promise<ShellExecResult>;
/** 查看本地分支 */
declare const gitBranchLocal: (workPath: string) => Promise<ShellExecResult>;
/** shell Spawn 执行checkout */
declare const gitCheckoutSpawn: (workPath: string, localBranch: string) => Promise<number | null>;
/** shell Spawn 执行checkout -b */
declare const gitCheckoutBSpawn: (workPath: string, localBranch: string, targetBRanch: string) => Promise<unknown>;
/** shell Spawn 执行git merge */
declare const gitMergeTargetToLocal: (workPath: string, targetBranch: string) => Promise<number | null>;
/** get local git origin */
declare const gitLocalOriginURI: (workPath: string) => Promise<string>;

export { existGitRepo, gitAddAll, gitBranchCurrent, gitBranchLocal, gitBranchR, gitCheckoutB, gitCheckoutBSpawn, gitCheckoutSpawn, gitCommitM, gitFetchRepo, gitLocalOriginURI, gitMergeTargetToLocal, gitPushOrigin, gitPushOriginU, gitRemoteAdd, gitRemoteRemove, gitRemoteV };
