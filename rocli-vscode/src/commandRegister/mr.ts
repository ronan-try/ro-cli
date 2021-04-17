import {
  env,
  workspace,
  commands,
  Uri,
  WorkspaceFolder,
} from 'vscode';

import { alertInfo, alertError } from '../utils/vscode';
import { gitBranchCurrent, gitLocalOriginURI } from '@ro/cli-service';

const command = commands.registerCommand('rocli.mr', async () => {
  const workspaceFolders = workspace.workspaceFolders;

  if (!Array.isArray(workspaceFolders)) {
    alertError('not existed workspace folders[typeof]');
    return;
  }

  if (workspaceFolders.length === 0) {
    alertError('not existed workspace folders[length]');
    return;
  }

  const rootFolder = workspaceFolders[0] as WorkspaceFolder;
  const rootPath = rootFolder.uri.fsPath;

  const gitLocalOriginUri = await gitLocalOriginURI(rootPath);
  const gitLocalBranchName = await gitBranchCurrent(rootPath);
  const url =
    `${gitLocalOriginUri}`
      .replace('.com:', '.com/')
      .replace('git@', 'https://')
      .replace('.git', '/merge_requests/new?')
    + 'merge_request%5Bsource_branch%5D='
    + gitLocalBranchName;
  
    env.openExternal(Uri.parse(url));
});

export default command;
