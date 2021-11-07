#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

const spawn = require('@ronan-try/cli-shared-utils').shellSpawn; // require('../cli-shared-utils/spawn');
const { resolve } = require('path');

module.exports = async () => {
  spawn('node ' + resolve(__dirname, '../cli-ui/ws.js'));
  spawn('node ' + resolve(__dirname, '../cli-ui/ui.js'));
  // end
};
