(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('chalk')) :
	typeof define === 'function' && define.amd ? define(['exports', 'chalk'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.chalkText = {}, global.chalk));
}(this, (function (exports, chalk) { 'use strict';

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

	Object.defineProperty(exports, '__esModule', { value: true });

})));
