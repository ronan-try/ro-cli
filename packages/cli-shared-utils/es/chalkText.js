import { red, cyan, yellow, green, gray, redBright, cyanBright } from 'chalk';

const textRed = msg => red(msg);
const textCyan = msg => cyan(msg);
const textYellow = msg => yellow(msg);
const textGreen = msg => green(msg);
const textGray = msg => gray(msg);
const textRedBright = msg => redBright(msg);
const textCyanBright = msg => cyanBright(msg);

export { textCyan, textCyanBright, textGray, textGreen, textRed, textRedBright, textYellow };
