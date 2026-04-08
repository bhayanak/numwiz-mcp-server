import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { NumbersClient } from '../client/numbers-client.js';
import { formatSingleFact } from '../utils/formatter.js';

export function registerDateTool(server: McpServer, client: NumbersClient): void {
  server.tool(
    'numwiz_date',
    'Get a historical fact about a specific date (month/day)',
    {
      month: z.number().min(1).max(12).describe('Month (1-12)'),
      day: z.number().min(1).max(31).describe('Day of month'),
    },
    async ({ month, day }) => {
      const result = await client.getDate(month, day);
      return {
        content: [{ type: 'text', text: formatSingleFact(result) }],
      };
    }
  );
}
