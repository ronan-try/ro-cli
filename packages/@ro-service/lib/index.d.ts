declare type ShellExecResult = {
    code: number;
    stdout: string;
    stderr: string;
};
/** current work path exists a git repo */
declare const existGitRepo: (workPath: string) => Promise<boolean>;
/** git branch --show-current */
declare const gitBranchCurrent: (workPath: string) => Promise<string>;
declare const gitRemoveV: (workPath: string) => Promise<ShellExecResult>;
/** get local git origin */
declare const gitLocalOriginURI: (workPath: string) => Promise<string>;

export { existGitRepo, gitBranchCurrent, gitLocalOriginURI, gitRemoveV };
