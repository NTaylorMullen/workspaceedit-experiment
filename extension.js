const vscode = require('vscode');

function activate(context) {
	let disposable = vscode.commands.registerCommand('experiment', async () => {
		for (const textDocument of vscode.workspace.textDocuments) {
			if (textDocument.isClosed ||
				textDocument.lineCount === 0 ||
				textDocument.lineAt(0).text.length <= 1) {
				continue;
			}

			const edit1 = new vscode.WorkspaceEdit();
			edit1.replace(textDocument.uri, new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 0)), 'a');
			const edit2 = new vscode.WorkspaceEdit();
			edit2.replace(textDocument.uri, new vscode.Range(new vscode.Position(0, 1), new vscode.Position(0, 1)), 'b');

			// These two edits combined will result in 'ab' on the very first line of the document that's opened
			const application1 = vscode.workspace.applyEdit(edit1);
			const application2 = vscode.workspace.applyEdit(edit2);

			const result1 = await application1;
			const result2 = await application2;
			vscode.window.showInformationMessage(`Results: [ ${result1}, ${result2} ]`);
			return;
		}

		vscode.window.showWarningMessage('Could not find a valid text document to run the experiment on');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() { }

// eslint-disable-next-line no-undef
module.exports = {
	activate,
	deactivate
}
