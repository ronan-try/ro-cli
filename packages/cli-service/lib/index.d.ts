/** current work path exists a git repo */
declare const existGitRepo: (workPath: string) => Promise<boolean>;
/** git branch --show-current */
declare const gitBranchCurrent: (workPath: string) => Promise<string>;
/** get local git origin */
declare const gitLocalOriginURI: (workPath: string) => Promise<string>;

export { existGitRepo, gitBranchCurrent, gitLocalOriginURI };
