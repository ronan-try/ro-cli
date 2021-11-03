const express = require('express');
const server = express();
const { resolve } = require('path');
const distPath = resolve(__dirname, '../cli-ui/html');

const UIPort = require('@ronan-try/cli-const').UI_PORT;

server.listen(UIPort, function(){
  const uri = `http://localhost:${UIPort}/`;
  require('@ronan-try/cli-os-utils').openWithBrowser(uri); // .openWithVSCode(selectedProject.localPath);
});

server.use('', express.static(distPath));
