import WebSocket from 'ws'
import { WS_PORT, WS_PATH, ROCLI_GIT_UPSTREAM, ORIGIN_GIT_UPSTREAM, } from '@ronan-try/cli-const'
import * as WS_MSG_TYPE from '@ronan-try/cli-const/src/wsMessageType'
import { textCyanBright, textRed } from '@ronan-try/cli-shared-utils'
import { openWithFolder, openWithBrowser, openWithVSCode } from '@ronan-try/cli-os-utils'
import { gitBranchR, gitCheckoutBSpawn, gitFetchRepo, gitPushOriginU, gitRemoteAdd, gitRemoteRemove } from '@ronan-try/cli-service/src/git';

type MsgEntity = { type: string, data?: any }

const ws = new WebSocket.Server({ port: WS_PORT, path: WS_PATH })
const toJSONStringify = JSON.stringify
const toJSONParse = JSON.parse

ws.on('connection', connected)
function connected (wsInstance: WebSocket) {
  console.log(textCyanBright(`ws://localhost:${WS_PORT}${WS_PATH}`), ' is working')

  const sendMsg = (type: string, data?: any) => wsInstance.send(toJSONStringify({ type, data }))
  sendMsg(WS_MSG_TYPE.CONNECTED)
  sendMsg(WS_MSG_TYPE.TEST, '1234 check check')

  wsInstance.on('message', async msg => {
    try {
      console.log('recieved: $s', toJSONStringify(msg))

      const objmsg: MsgEntity = typeof msg === 'string' && toJSONParse(msg)
      if (objmsg.type === WS_MSG_TYPE.TEST) {
        return sendMsg(WS_MSG_TYPE.TEST, 'checked checked')
      }

      if (objmsg.type === WS_MSG_TYPE.CACHE_PROJECTS) {
        return sendMsg(WS_MSG_TYPE.CACHE_PROJECTS, 'xxxxxxxxxxxxxxxxxxx??????????');
      }

      if (objmsg.type === WS_MSG_TYPE.ADD_TARGET_UPSTREAM) {
        const project = objmsg.data;
        await gitRemoteRemove(project.localPath);

        const res = await gitRemoteAdd(project.localPath, project.targetRepo);
        if (res.code !== 0 && !res.stderr.includes('already exists')) {
          return sendMsg(WS_MSG_TYPE.ADD_TARGET_UPSTREAM, { success: false })
        }
        return sendMsg(WS_MSG_TYPE.ADD_TARGET_UPSTREAM, { success: false })
      }

      if (objmsg.type === WS_MSG_TYPE.FETCH_ROCLI_UPSTREAM) {
        const project = objmsg.data;
        const res =  await gitFetchRepo(project.localPath, ROCLI_GIT_UPSTREAM);
        
        return sendMsg(WS_MSG_TYPE.FETCH_ROCLI_UPSTREAM, { success: res.code !== 0 })
      }

      if (objmsg.type === WS_MSG_TYPE.GIT_BRANCH_R) {
        const res = await gitBranchR(objmsg.data.localPath);

        if (res.code !== 0) {
          return sendMsg(WS_MSG_TYPE.GIT_BRANCH_R, { success: false })
        }

        const branches = res.stdout.split('\n').map(i => i.trim());
        return sendMsg(WS_MSG_TYPE.GIT_BRANCH_R, {
          success: true,
          branches: branches.filter(i => i.includes(ROCLI_GIT_UPSTREAM)),
          originBranches: branches.filter(i => i.includes(ORIGIN_GIT_UPSTREAM)),
        })
      }

      // git fork
      if (objmsg.type === WS_MSG_TYPE.GIT_FORK) {
        const res = await gitCheckoutBSpawn(objmsg.data.project.localPath, objmsg.data.localBranch, objmsg.data.targetBranch);
        return sendMsg(WS_MSG_TYPE.GIT_FORK, { success: res === 0})
      }

      // git track
      if (objmsg.type === WS_MSG_TYPE.GIT_TRACK) {
        const { project, localBranch } = objmsg.data;
        try {
          const res = await gitRemoteRemove(project.localPath);
        } catch (error) {
          // to do
        }

        const res = await gitPushOriginU(project.localPath, localBranch);

        return sendMsg(WS_MSG_TYPE.GIT_TRACK, { success: res.code === 0 })
      }

      // open vscode
      if (objmsg.type === WS_MSG_TYPE.OPEN_WITH_VSCODE) {
        openWithVSCode(objmsg.data.localPath);
        return;
      }

      // open folder
      if (objmsg.type === WS_MSG_TYPE.OPEN_WITH_FOLDER) {
        openWithFolder(objmsg.data.localPath);
      }
    } catch (error) {
      console.log(textRed('error: '), error);
    }
  })
}
