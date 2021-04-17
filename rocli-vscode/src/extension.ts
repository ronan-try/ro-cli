import * as vscode from 'vscode';
import commandRegister from './commandRegister';

export function activate(context: vscode.ExtensionContext) {
	commandRegister(context);
	// to do
}

// this method is called when your extension is deactivated
export function deactivate() { }
