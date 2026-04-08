import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { NumbersClient } from '../client/numbers-client.js';
import { formatSingleFact } from '../utils/formatter.js';

export function registerMathTool(server: McpServer, client: NumbersClient): void {
  server.tool(
    'numwiz_math',
    'Get a math fact about any number',
    {
      number: z.number().describe('The number to get math facts about'),
    },
    async ({ number }) => {
      const result = await client.getMath(number);
      return {
        content: [{ type: 'text', text: formatSingleFact(result) }],
      };
    }
  );
}
