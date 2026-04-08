import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { NumbersClient } from './client/numbers-client.js';
import { registerTriviaTool } from './tools/trivia.js';
import { registerMathTool } from './tools/math.js';
import { registerDateTool } from './tools/date.js';
import { registerYearTool } from './tools/year.js';
import { registerRandomTool } from './tools/random.js';
import { registerBatchTool } from './tools/batch.js';
import { registerRangeTool } from './tools/range.js';
import { registerIsInterestingTool } from './tools/interesting.js';

export function createServer(): McpServer {
  const server = new McpServer({
    name: 'numwiz-mcp-server',
    version: '0.1.0',
  });

  const client = new NumbersClient();

  registerTriviaTool(server, client);
  registerMathTool(server, client);
  registerDateTool(server, client);
  registerYearTool(server, client);
  registerRandomTool(server, client);
  registerBatchTool(server, client);
  registerRangeTool(server, client);
  registerIsInterestingTool(server, client);

  return server;
}
