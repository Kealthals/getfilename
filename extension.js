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
	let disposable = vscode.commands.registerCommand('getfilename.getfilename', function (...nodes) {
		let isSingleFileFlag = isSingleFile(nodes);
		let fileNameArr = [];
		let message = 'No file/folder selected.';
		if(isSingleFileFlag) {
			fileNameArr.push(getFileName(nodes[0].path, 'full'));
			message = fileNameArr[0] + ' Copied!';
		} else {
			nodes[1].forEach(node => {
				fileNameArr.push(getFileName(node.path, 'full'));
				console.log(node.path);
				console.log(getFileName(node.path, 'full'));
				console.log(fileNameArr);
			});
			message = 'File Names Copied!';
		}
		vscode.env.clipboard.writeText(fileNameArr.join('\r\n'));
		vscode.window.showInformationMessage(message, {modal : false});
	});

	let disposable1 = vscode.commands.registerCommand('getfilename.getfilenameNoExt', function (...nodes) {
		let isSingleFileFlag = isSingleFile(nodes);
		let fileNameArr = [];
		let message = 'No file/folder selected.';
		if(isSingleFileFlag) {
			fileNameArr.push(getFileName(nodes[0].path, 'noext'));
			message = fileNameArr[0] + ' Copied!';
		} else {
			nodes[1].forEach(node => {
				fileNameArr.push(getFileName(node.path, 'noext'));
			});
			message = 'File Names Copied!';
		}
		vscode.env.clipboard.writeText(fileNameArr.join('\r\n'));
		vscode.window.showInformationMessage(message, {modal : false});
	});

	let disposable2 = vscode.commands.registerCommand('getfilename.getfilenameOnlyPre', function (...nodes) {
		let isSingleFileFlag = isSingleFile(nodes);
		let fileNameArr = [];
		let message = 'No file/folder selected.';
		if(isSingleFileFlag) {
			fileNameArr.push(getFileName(nodes[0].path, 'onlypre'));
			message = fileNameArr[0] + ' Copied!';
		} else {
			nodes[1].forEach(node => {
				fileNameArr.push(getFileName(node.path, 'onlypre'));
			});
			message = 'File Names Copied!';
		}
		vscode.env.clipboard.writeText(fileNameArr.join('\r\n'));
		vscode.window.showInformationMessage(message, {modal : false});
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);
}
function getFileName(filePath, mode) {

	if(filePath == undefined || filePath == null || filePath == "") {
		return "";
	}

	if(mode == 'full') {
		const fileNameArray = filePath.split("/");
		if(fileNameArray.length > 1) {
			return fileNameArray[fileNameArray.length - 1];
		} else if(fileNameArray.length == 1) {
			return fileNameArray[0];
		}
	} else if(mode == 'noext') {
		filePath = filePath.replace("-meta.xml", "-meta-xml");
		const fileNameArray = filePath.split("/");
		if(fileNameArray.length > 1) {
			let fileNameWithExtension = fileNameArray[fileNameArray.length - 1];
			if(fileNameWithExtension.indexOf(".") != -1) {
				return fileNameWithExtension.substring(0, fileNameWithExtension.lastIndexOf("."));
			} else {
				return fileNameWithExtension;
			}
		} else if(fileNameArray.length == 1) {
			let fileNameWithExtension = fileNameArray[0];
			if(fileNameWithExtension.indexOf(".") != -1) {
				return fileNameWithExtension.substring(0, fileNameWithExtension.lastIndexOf("."));
			} else {
				return fileNameWithExtension;
			}
		}
	} else if(mode == 'onlypre') {
		const fileNameArray = filePath.split("/");
		if(fileNameArray.length > 1) {
			let fileNameWithExtension = fileNameArray[fileNameArray.length - 1];
			return fileNameWithExtension.split(".")[0];
		} else if(fileNameArray.length == 1) {
			let fileNameWithExtension = fileNameArray[0];
			return fileNameWithExtension.split(".")[0];
		}
	}
}

function isSingleFile(nodes) {
	let isSingleFile = false;
	// if the second element of nodes is not array
	if(nodes[1] != undefined && nodes[1] != null && nodes[1].length == undefined) {
		isSingleFile = true;
	} else if(nodes[1] != undefined && nodes[1] != null && nodes[1].length == 1) {
		isSingleFile = true;
	} else if(nodes[1] != undefined && nodes[1] != null && nodes[1].length > 1) {
		isSingleFile = false;
	} else if(nodes[1] == undefined || nodes[1] == null) {
		isSingleFile = true;
	} else {
		isSingleFile = true;
	}
	return isSingleFile;
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
