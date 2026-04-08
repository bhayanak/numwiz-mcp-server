import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { NumbersClient } from '../client/numbers-client.js';
import { formatSingleFact } from '../utils/formatter.js';

export function registerYearTool(server: McpServer, client: NumbersClient): void {
  server.tool(
    'numwiz_year',
    'Get a historical fact about a specific year',
    {
      year: z.number().describe('The year to get facts about'),
    },
    async ({ year }) => {
      const result = await client.getYear(year);
      return {
        content: [{ type: 'text', text: formatSingleFact(result) }],
      };
    }
  );
}
