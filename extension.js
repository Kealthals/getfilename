// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "getfilename" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('getfilename.getfilename', function (node) {
		let filePath = node.path;
		let message = 'No file/folder selected.';
		let fileName = '';
		if(filePath != undefined && filePath != null && filePath != {} && filePath != "") {
			console.log(filePath);
			const fileNameArray = filePath.split("/");
			if(fileNameArray.length > 1) {
				fileName = fileNameArray[fileNameArray.length - 1];
			} else if(fileNameArray.length == 1) {
				fileName = fileNameArray[0];
			}
			message = fileName+ ' Copied!';
		}
		vscode.env.clipboard.writeText(fileName);
		vscode.window.showInformationMessage(message, {modal : false});
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
