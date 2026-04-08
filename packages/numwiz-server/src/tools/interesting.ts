import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { NumbersClient } from '../client/numbers-client.js';
import { formatInteresting } from '../utils/formatter.js';

export function registerIsInterestingTool(server: McpServer, client: NumbersClient): void {
  server.tool(
    'numwiz_is_interesting',
    'Check if a number has interesting mathematical properties',
    {
      number: z.number().describe('Number to analyze'),
    },
    async ({ number }) => {
      const [trivia, math] = await Promise.all([client.getTrivia(number), client.getMath(number)]);
      return {
        content: [{ type: 'text', text: formatInteresting(number, trivia, math) }],
      };
    }
  );
}
