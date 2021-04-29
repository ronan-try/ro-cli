import * as child_process from 'child_process';

declare const shellCd: (fullPath: string) => void;
declare const execAsync: (path: string, cmd: string, silent?: boolean) => Promise<unknown>;
declare const shellSpawn: (cmd: string, cwdPath: string) => child_process.ChildProcess;

export { execAsync, shellCd, shellSpawn };
