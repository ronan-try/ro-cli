"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("chalk"),t=require("shelljs"),r=require("child_process");function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var o=s(t),n=s(r);const l=t=>e.gray(t);exports.execAsync=async(e,t,r=!1)=>new Promise((s=>{o.default.exec(t,{cwd:e,silent:r},((e,t,r)=>s({code:e,stdout:t,stderr:r})))})),exports.logStep=e=>{console.log("\n",l(e),"\n")},exports.shellCd=e=>{o.default.cd(e)},exports.shellSpawn=(e,t)=>n.default.spawn(e,{cwd:t,shell:!0,stdio:"inherit"}),exports.textCyan=t=>e.cyan(t),exports.textCyanBright=t=>e.cyanBright(t),exports.textGray=l,exports.textGreen=t=>e.green(t),exports.textRed=t=>e.red(t),exports.textRedBright=t=>e.redBright(t),exports.textYellow=t=>e.yellow(t),exports.trimOnlyEnd=(e,t)=>{if(e&&void 0===t)return e;if(!e)return e;const r=e.lastIndexOf(t);return e.slice(0,r)};//# sourceMappingURL=index.mini.js.map
