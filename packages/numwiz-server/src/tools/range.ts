import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { NumbersClient } from '../client/numbers-client.js';
import { formatBatchFacts } from '../utils/formatter.js';

export function registerRangeTool(server: McpServer, client: NumbersClient): void {
  server.tool(
    'numwiz_range',
    'Get facts for a range of numbers',
    {
      start: z.number().describe('Range start (inclusive)'),
      end: z.number().describe('Range end (inclusive, max 20 numbers apart)'),
      type: z
        .enum(['trivia', 'math'])
        .optional()
        .default('trivia')
        .describe('Type of facts to fetch'),
    },
    async ({ start, end, type }) => {
      if (Math.abs(end - start) > 20) {
        return {
          content: [{ type: 'text', text: '❌ Error: Range must be at most 20 numbers apart.' }],
          isError: true,
        };
      }
      const result = await client.getRange(start, end, type);
      return {
        content: [{ type: 'text', text: formatBatchFacts(result, type) }],
      };
    }
  );
}
