import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { NumbersClient } from '../client/numbers-client.js';
import { formatSingleFact } from '../utils/formatter.js';

export function registerRandomTool(server: McpServer, client: NumbersClient): void {
  server.tool(
    'numwiz_random',
    'Get a random number fact',
    {
      type: z
        .enum(['trivia', 'math', 'date', 'year'])
        .optional()
        .default('trivia')
        .describe('Type of random fact'),
    },
    async ({ type }) => {
      const result = await client.getRandom(type);
      return {
        content: [{ type: 'text', text: formatSingleFact(result) }],
      };
    }
  );
}
