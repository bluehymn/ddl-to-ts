// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import * as Parser from 'sql-ddl-to-json-schema';
import { Uri, commands } from "vscode";
import { handleError, getSelectedText, getViewColumn} from "./lib";
import { compile } from 'json-schema-to-typescript';
// import {
//   Uri,
//   ViewColumn,
//   TextEditorSelectionChangeKind,
//   Range,
//   ExtensionContext,
//   Position,
//   window,
//   commands
// } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "ddl-to-ts" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'extension.ddl2ts',
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      transformFromSelection();
      vscode.window.showInformationMessage('Convert successful!');
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

function transformFromSelection () {
  const tmpFilePath = path.join(os.tmpdir(), 'json-to-ts.ts');
  const tmpFileUri = Uri.file(tmpFilePath);
  const parser = new Parser('mysql');
  const options = {};

  getSelectedText()
    .then((sql: string) => {
      return parser.feed(sql).toJsonSchemaArray(options);
    })
    .then( async (jsonSchema: any[]) => {
      let str = '';
      for (let i = 0; i < jsonSchema.length; i++) {
        const schema = {
          properties: jsonSchema[i].definitions
        };
        str += await compile(schema, jsonSchema[i].title);
      }
      fs.writeFileSync(tmpFilePath, str);
    })
    .then(() => {
      commands.executeCommand('vscode.open', tmpFileUri, getViewColumn());
    })
    .catch(handleError);

}

// function transformFromClipboard () {

//   getClipboardText()
//     .then(logEvent(visitor, 'Clipboard'))
//     .then(validateLength)
//     .then(parseJson)
//     .then(json => {
//       return JsonToTS(json)
//         .reduce((a,b) => `${a}\n\n${b}`)
//     })
//     .then(interfaces => {
//       pasteToMarker(interfaces)
//     })
//     .catch(handleError)

// }