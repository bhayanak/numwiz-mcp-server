const esbuild = require('esbuild');
const path = require('path');

// Bundle the VS Code extension
esbuild.buildSync({
  entryPoints: ['src/extension.ts'],
  bundle: true,
  outfile: 'dist/extension.js',
  external: ['vscode'],
  platform: 'node',
  format: 'cjs',
  sourcemap: true,
});

// Bundle the MCP server into extension dist
// IMPORTANT: Must be CJS format (not ESM) because the extension's package.json
// has no "type": "module", so Node treats .js as CJS. Also no shebang banner —
// the server is invoked via `node [path]`, not executed directly, and esbuild
// places banners on line 2 (after its own header), which Node cannot strip.
esbuild.buildSync({
  entryPoints: [path.resolve(__dirname, '../numwiz-server/src/index.ts')],
  bundle: true,
  outfile: 'dist/server/index.js',
  platform: 'node',
  format: 'cjs',
  sourcemap: true,
});

console.log('✅ Extension and server bundled successfully');
