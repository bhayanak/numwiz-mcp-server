import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const serverPath = vscode.Uri.joinPath(
    context.extensionUri,
    'dist',
    'server',
    'index.js'
  ).fsPath;

  const disposable = vscode.lm.registerMcpServerDefinitionProvider('numwiz-mcp', {
    provideMcpServerDefinitions(
      _token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.McpServerDefinition[]> {
      return [
        new vscode.McpStdioServerDefinition(
          'NumWiz MCP Server',
          'node',
          [serverPath]
        ),
      ];
    },
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
