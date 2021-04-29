/** ro cli git upstream: ro_cli_upstream */
const ROCLI_GIT_UPSTREAM = 'ro_cli_upstream';
/** git default upstream: origin */

const ORIGIN_GIT_UPSTREAM = 'origin';

/** websockt 文件路径 */
const WS_PATH = '/cli-ws';

/** git 平台 */
const GIT_PLATFORMS = {
  GitHub: 'github',
  GitLab: 'gitlab',
  Gitee: 'gitee'
};
/** 操作系统平台 */

const OS_PLATFORMS = {
  Win32: 'win32',
  Darwin: 'darwin',
  Linux: 'linux'
};

/** ui 端口 */
const UI_PORT = 54181;
/** ws 端口 */

const WS_PORT = 54180;

/** 字符串 分割符 */
const SPLIT_CHAR = '~~~~';

export { GIT_PLATFORMS, ORIGIN_GIT_UPSTREAM, OS_PLATFORMS, ROCLI_GIT_UPSTREAM, SPLIT_CHAR, UI_PORT, WS_PATH, WS_PORT };
