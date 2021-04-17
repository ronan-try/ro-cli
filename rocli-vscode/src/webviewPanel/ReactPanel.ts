import * as path from 'path';
import * as vscode from 'vscode';

function getWebviewOptions (extensionUri: vscode.Uri): vscode.WebviewOptions {
	return {
		enableScripts: true,
		localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'build')],
	};
}

class ReactPanel {
	public static currentPanel: ReactPanel | undefined;

	private static readonly viewType = 'react';

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: vscode.Uri;
	private readonly _extensionPath: string;
	private _disposables: vscode.Disposable[] = [];

	public static createOrShow(extensionUri: vscode.Uri, extensionPath: string) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		// If we alread hava panel, show it.
		if (ReactPanel.currentPanel) {
			ReactPanel.currentPanel._panel.reveal(column);
			return;
		}

		// Otherwise, create a new panel.
		const panel = vscode.window.createWebviewPanel(
			ReactPanel.viewType,
			'Ro Cli',
			column || vscode.ViewColumn.One,
			getWebviewOptions(extensionUri),
		);
		ReactPanel.currentPanel = new ReactPanel(panel, extensionUri, extensionPath);
	}

	public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, extensionPath: string) {
		ReactPanel.currentPanel = new ReactPanel(panel, extensionUri, extensionPath);
	}

	private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, extensionPath: string) {
		this._panel = panel;
		this._extensionUri = extensionUri;
		this._extensionPath = extensionPath;

		// Set the webview's initial html content
		this._update();

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programmatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		// Update the content based on view changes
		this._panel.onDidChangeViewState(
			() => {
				this._panel.visible && this._update();
			},
			null,
			this._disposables
		);

		// Handle message from the webview
		this._panel.webview.onDidReceiveMessage(
			(message: { command: string, text: string }) => {
				switch (message.command) {
					case 'alert':
						vscode.window.showErrorMessage(message.text);
						break;
				}
			},
			null,
			this._disposables
		);
	}

	public doRefactor() {
		// Send a message to the webview.
		// You can send any JSON serializable data.
		this._panel.webview.postMessage({ command: 'refactor' });
	}

	public dispose() {
		ReactPanel.currentPanel = void 0;

		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			x && x.dispose();
		}
	}

	private _update() {
		const webview = this._panel.webview;
		// to do
		switch (this._panel.viewColumn) {
			case vscode.ViewColumn.Two:
				this._updateView(webview, 'Two');
				return;

			case vscode.ViewColumn.One:
			default:
				this._updateView(webview, 'Default');
				return;
		}
	}

	private _updateView(webview: vscode.Webview, type: string) {
		this._panel.title = type;
		this._panel.webview.html = this._getHtmlForWebview(webview, type);
	}

	private _getHtmlForWebview(webview: vscode.Webview, type: string) {
		const manifest = require(path.join(this._extensionPath, 'build', 'asset-manifest.json'))['files'];
		const mainScript = manifest['main.js'];
		const mainStyle = manifest['main.css'];

		// Local path to main script run inthe webview
		const scriptPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'build', mainScript);
		// And the uri we use to load this script in the webview
		const scriptUri = webview.asWebviewUri(scriptPathOnDisk);

		// Local path to css styles
		const stylePathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'build', mainStyle);
		const styleUri = webview.asWebviewUri(stylePathOnDisk);

		const faviconUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'build', 'favicon.ico'));

		const nonce = getNonce();

		return `<!doctype html>
			<html lang="en">
			<head>
				<meta charset="utf-8">
			  <link rel="icon" href="${faviconUri}" />

				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
				<meta name="theme-color" content="#000000">

				<link rel="manifest" href="/manifest.json" />

				<title>React App</title>
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';">
				
				<link rel="stylesheet" type="text/css" href="${styleUri}">
			</head>

			<body>
				<h1>This is React Page.</h1>
				<p>${type}</p>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root"></div>
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;

	}
}

function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

export default ReactPanel;
