'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chalk = require('chalk');

const textRed = msg => chalk.red(msg);
const textCyan = msg => chalk.cyan(msg);
const textYellow = msg => chalk.yellow(msg);
const textGreen = msg => chalk.green(msg);
const textGray = msg => chalk.gray(msg);
const textRedBright = msg => chalk.redBright(msg);
const textCyanBright = msg => chalk.cyanBright(msg);

exports.textCyan = textCyan;
exports.textCyanBright = textCyanBright;
exports.textGray = textGray;
exports.textGreen = textGreen;
exports.textRed = textRed;
exports.textRedBright = textRedBright;
exports.textYellow = textYellow;
