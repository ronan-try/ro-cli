import * as vscode from 'vscode';

const command = vscode.commands.registerCommand('rocli.helloWorld', () => {
  vscode.window.showInformationMessage('Hello World from rocli-vscode!');
});

export default command;
