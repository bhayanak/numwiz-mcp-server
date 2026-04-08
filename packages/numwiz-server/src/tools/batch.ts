import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { NumbersClient } from '../client/numbers-client.js';
import { formatBatchFacts } from '../utils/formatter.js';

export function registerBatchTool(server: McpServer, client: NumbersClient): void {
  server.tool(
    'numwiz_batch',
    'Get facts for multiple numbers at once',
    {
      numbers: z.array(z.number()).min(1).max(20).describe('List of numbers (max 20)'),
      type: z
        .enum(['trivia', 'math'])
        .optional()
        .default('trivia')
        .describe('Type of facts to fetch'),
    },
    async ({ numbers, type }) => {
      const result = await client.getBatch(numbers, type);
      return {
        content: [{ type: 'text', text: formatBatchFacts(result, type) }],
      };
    }
  );
}
