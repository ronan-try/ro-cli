"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("shelljs");function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}require("child_process");var r=t(e);const s=(e,t)=>new Promise((s=>{r.default.exec(t,{cwd:e,silent:!0},((e,t,r)=>s({code:e,stdout:t,stderr:r})))}));exports.existGitRepo=e=>new Promise((t=>{r.default.exec("git status",{cwd:e,silent:!0},(e=>t(0===e)))})),exports.gitBranchCurrent=async e=>{const{code:t,stdout:r,stderr:o}=await s(e,"git branch --show-current");if(0===t)return r.trim();process.exit(1)},exports.gitLocalOriginURI=async e=>{const{code:t,stderr:r,stdout:o}=await(async e=>s(e,"git remote -v"))(e);0!==t&&(console.log(r),process.exit(1));return o.split(" ")[0].split("\t")[1]};//# sourceMappingURL=index.mini.js.map
