declare type ShellExecResult = {
    code: number;
    stdout: string;
    stderr: string;
};
/** current work path exists a git repo */
declare const existGitRepo: (workPath: string) => Promise<boolean>;
/** git branch --show-current */
declare const gitBranchCurrent: (workPath: string) => Promise<string>;
declare const gitRemoteV: (workPath: string) => Promise<ShellExecResult>;
declare const gitRemoteAdd: (workPath: string, targetRepo: string) => Promise<ShellExecResult>;
declare const gitRemoteRemove: (workPath: string, targetRepo?: string) => Promise<ShellExecResult>;
declare const gitFetchRepo: (workPath: string, targetRepo?: string) => Promise<ShellExecResult>;
declare const gitCheckoutB: (workPath: string, localBranch: string, targetBranch: string) => Promise<ShellExecResult>;
declare const gitPushOrigin: (workPath: string, branch?: string) => Promise<ShellExecResult>;
declare const gitPushOriginU: (workPath: string, branch?: string) => Promise<ShellExecResult>;
declare const gitAddAll: (workPath: string) => Promise<ShellExecResult>;
declare const gitCommitM: (workPath: string, msg: string) => Promise<ShellExecResult>;
declare const gitBranchR: (workPath: string) => Promise<ShellExecResult>;
declare const gitBranchLocal: (workPath: string) => Promise<ShellExecResult>;
declare const gitCheckoutSpawn: (workPath: string, localBranch: string) => Promise<unknown>;
declare const gitCheckoutBSpawn: (workPath: string, localBranch: string, targetBRanch: string) => Promise<unknown>;
declare const gitMergeTargetToLocal: (workPath: string, targetBranch: string) => Promise<unknown>;
/** get local git origin */
declare const gitLocalOriginURI: (workPath: string) => Promise<string>;

export { existGitRepo, gitAddAll, gitBranchCurrent, gitBranchLocal, gitBranchR, gitCheckoutB, gitCheckoutBSpawn, gitCheckoutSpawn, gitCommitM, gitFetchRepo, gitLocalOriginURI, gitMergeTargetToLocal, gitPushOrigin, gitPushOriginU, gitRemoteAdd, gitRemoteRemove, gitRemoteV };
