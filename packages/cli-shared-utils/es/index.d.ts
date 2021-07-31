import child_process from 'child_process';

declare const textRed: (msg: string) => string;
declare const textCyan: (msg: string) => string;
declare const textYellow: (msg: string) => string;
declare const textGreen: (msg: string) => string;
declare const textGray: (msg: string) => string;
declare const textRedBright: (msg: string) => string;
declare const textCyanBright: (msg: string) => string;

declare const logStep: (msg: string) => void;

/** 字符串trimEnd, 区别于lodash.trimEnd */
declare const trimOnlyEnd: (str: string, chars: string) => string;

declare const shellCd: (fullPath: string) => void;
declare const execAsync: (path: string, cmd: string, silent?: boolean) => Promise<unknown>;
declare const shellSpawn: (cmd: string, cwdPath: string) => child_process.ChildProcess;

export { execAsync, logStep, shellCd, shellSpawn, textCyan, textCyanBright, textGray, textGreen, textRed, textRedBright, textYellow, trimOnlyEnd };
