import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { NumbersClient } from '../client/numbers-client.js';
import { formatSingleFact } from '../utils/formatter.js';

export function registerTriviaTool(server: McpServer, client: NumbersClient): void {
  server.tool(
    'numwiz_trivia',
    'Get a trivia fact about any number',
    {
      number: z.number().describe('The number to get trivia about'),
      notfound: z
        .enum(['default', 'floor', 'ceil'])
        .optional()
        .describe('Behavior when no fact found'),
    },
    async ({ number, notfound }) => {
      const result = await client.getTrivia(number, notfound);
      return {
        content: [{ type: 'text', text: formatSingleFact(result) }],
      };
    }
  );
}
