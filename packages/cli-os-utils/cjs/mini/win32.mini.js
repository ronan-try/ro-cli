"use strict";function e(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("shelljs"));exports.openWithBroswer=function(e){t.default.exec(`start "${e}"`)},exports.openWithFolder=function(e="."){t.default.exec("start "+e)},exports.openWithVSCode=function(e){t.default.exec("code "+e)};//# sourceMappingURL=win32.mini.js.map
