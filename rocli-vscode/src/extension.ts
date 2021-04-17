import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('rocli.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from rocli! 啊啊啊啊啊啊啊啊啊');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
