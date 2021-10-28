// tools
const { textCyanBright, textRed } = require('@ronan-try/cli-shared-utils');
const { openWithFolder, openWithVSCode } = require('@ronan-try/cli-os-utils');
// enums
const WS_MSG_TYPE = require('@ronan-try/cli-const/cjs/wsMessageType');
const { WS_PATH, WS_PORT, ROCLI_GIT_UPSTREAM, ORIGIN } = require('@ronan-try/cli-const');
const CACHE_PROJECT_FILE_NAME = 'projects';
// service
const {
  gitBranchR,
  gitLocalOriginURI,
  gitFetchRepo,
  gitRemoteAdd,
  gitRemoteRemove,
  gitPushOriginU,
  gitCheckoutBSpawn,
  gitCheckoutB,
} = require('@ronan-try/cli-service');
// websocket
const WebSocket = require('ws');
const WsInstance = new WebSocket.Server({ port: WS_PORT, path: WS_PATH });

WsInstance.on('connection', connection);
console.log(textCyanBright(`ws://localhost:${WS_PORT}${WS_PATH}`), 'is working');

function connection(ws) {
  const { stringify: toJSONString, parse: toJSONParse } = JSON;
  const send = data => ws.send(toJSONString(data));

  send({ type: WS_MSG_TYPE.CONNECTED });
  send({ type: WS_MSG_TYPE.TEST, data: '1234 check check' });

  ws.on('message', async msg => {
    try {
      // console.log('recived: $s', toJSONString(msg));

      const objMsg = typeof msg === 'string' ? toJSONParse(msg) : toJSONParse(msg);

      if (objMsg.type === WS_MSG_TYPE.TEST) {
        return send({ type: WS_MSG_TYPE.TEST, data: 'test' });
      }

      if (objMsg.type === WS_MSG_TYPE.CACHE_PROJECTS) {
        return send({ type: WS_MSG_TYPE.CACHE_PROJECTS, data: require('@ronan-try/cli-cache').getRawCacheData(CACHE_PROJECT_FILE_NAME)});
      }

      if (objMsg.type === WS_MSG_TYPE.ADD_TARGET_UPSTREAM) {
        const project = objMsg.data;
        await gitRemoteRemove(project.localPath);

        const res = await gitRemoteAdd(project.localPath, project.targetRepo);
        if (res.code !== 0 && !res.stderr.includes('already exists')) {
          // to do failed
          return send({ type: WS_MSG_TYPE.ADD_TARGET_UPSTREAM, data: { success: false } });
        }
        return send({ type: WS_MSG_TYPE.ADD_TARGET_UPSTREAM, data: { success: true } });
      }

      if (objMsg.type === WS_MSG_TYPE.FETCH_ROCLI_UPSTREAM) {
        const project = objMsg.data;
        const fetchUpsreamName = ROCLI_GIT_UPSTREAM;
        const res = await gitFetchRepo(project.localPath, fetchUpsreamName);

        if (res.code !== 0) {
          return send({ type: WS_MSG_TYPE.FETCH_ROCLI_UPSTREAM, data: { success: false } });
        }

        return send({ type: WS_MSG_TYPE.FETCH_ROCLI_UPSTREAM, data: { success: true } });
      }

      if (objMsg.type === WS_MSG_TYPE.GIT_BRANCH_R) {
        const res = await gitBranchR(objMsg.data.localPath);

        if (res.code !== 0) {
          return send({ type: WS_MSG_TYPE.GIT_BRANCH_R, data: { success: false } });
        }

        const fetchUpsreamName = ROCLI_GIT_UPSTREAM;
        const originUpstreamName = ORIGIN;
        return send({
          type: WS_MSG_TYPE.GIT_BRANCH_R,
          data: {
            success: true,
            branches: res.stdout.split('\n').map(i => i.trim()).filter(i => i.includes(fetchUpsreamName)),
            originBranches: res.stdout.split('\n').map(i => i.trim()).filter(i => i.includes(originUpstreamName)),
          },
        });
      }

      if (objMsg.type === WS_MSG_TYPE.GIT_FORK) {
        const { data } = objMsg;
        textRed('111');
        const res = await gitCheckoutB(data.project.localPath, data.localBranch, data.targetBranch)
        // const res = await gitCheckoutBSpawn(data.project.localPath, data.localBranch, data.targetBranch);
        textRed('2222');

        textRed(toJSONString(res));
        if (res.code !== 0) {
          return send({ type: WS_MSG_TYPE.GIT_FORK, data: { success: false, }, });
        }

        return send({ type: WS_MSG_TYPE.GIT_FORK, data: { success: true, }, });
      }

      if (objMsg.type === WS_MSG_TYPE.GIT_TRACK) {
        const { project, localBranch } = objMsg.data
        try {
          const res = await gitRemoteRemove(project.localPath);
          console.log(res);
        } catch {
          // to do
        }

        const res = await gitPushOriginU(project.localPath, localBranch);

        if (res.code !== 0) {
          return send({ type: WS_MSG_TYPE.GIT_TRACK, data: { success: false } });
        }

        return send({ type: WS_MSG_TYPE.GIT_TRACK, data: { success: true } });
      }

      if (objMsg.type === WS_MSG_TYPE.OPEN_WITH_VSCODE) {
        openWithVSCode(objMsg.data.localPath);
        return;
      }

      if (objMsg.type === WS_MSG_TYPE.openWithFolder) {
        openWithFolder(objMsg.data.localPath);
        return;
      }
    } catch (error) {
      console.log(textRed('error:'), error);
    }
  });
}
