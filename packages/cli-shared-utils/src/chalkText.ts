import { red, cyan, yellow, green, redBright, cyanBright, gray } from 'chalk';

export const textRed = (msg: string) => red(msg);

export const textCyan = (msg: string)=> cyan(msg);

export const textYellow = (msg: string) => yellow(msg);

export const textGreen = (msg: string) => green(msg);

export const textGray = (msg: string) => gray(msg);

export const textRedBright = (msg: string) => redBright(msg);

export const textCyanBright = (msg: string) => cyanBright(msg);
