/** ro cli git upstream: ro_cli_upstream */
declare const ROCLI_GIT_UPSTREAM = "ro_cli_upstream";
/** git default upstream: origin */
declare const ORIGIN_GIT_UPSTREAM = "origin";

/** websockt 文件路径 */
declare const WS_PATH = "/cli-ws";

/** git 平台 */
declare const GIT_PLATFORMS: {
    GitHub: string;
    GitLab: string;
    Gitee: string;
};
/** 操作系统平台 */
declare const OS_PLATFORMS: {
    Win32: string;
    Darwin: string;
    Linux: string;
};

/** ui 端口 */
declare const UI_PORT = 54181;
/** ws 端口 */
declare const WS_PORT = 54180;

/** 字符串 分割符 */
declare const SPLIT_CHAR = "~~~~";

export { GIT_PLATFORMS, ORIGIN_GIT_UPSTREAM, OS_PLATFORMS, ROCLI_GIT_UPSTREAM, SPLIT_CHAR, UI_PORT, WS_PATH, WS_PORT };
