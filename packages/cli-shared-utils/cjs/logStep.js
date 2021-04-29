'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chalk = require('chalk');

const textGray = msg => chalk.gray(msg);

const logStep = msg => {
  console.log('\n', textGray(msg), '\n');
};

exports.logStep = logStep;
