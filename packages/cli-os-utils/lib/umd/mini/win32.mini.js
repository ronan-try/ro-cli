!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("shelljs")):"function"==typeof define&&define.amd?define(["exports","shelljs"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).win32={},e.shelljs)}(this,(function(e,t){"use strict";function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var o=n(t);e.openWithBroswer=function(e){o.default.exec("start "+e)},e.openWithFolder=function(e="."){o.default.exec("start "+e)},e.openWithVSCode=function(e){},Object.defineProperty(e,"__esModule",{value:!0})}));//# sourceMappingURL=win32.mini.js.map
