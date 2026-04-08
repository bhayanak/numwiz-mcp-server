import { describe, it, expect, beforeEach } from 'vitest';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { createServer } from '../src/server.js';

describe('MCP Tools Integration', () => {
  let client: Client;

  beforeEach(async () => {
    const server = createServer();
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

    client = new Client({ name: 'test-client', version: '1.0.0' });
    await Promise.all([client.connect(clientTransport), server.connect(serverTransport)]);
  });

  function getText(result: Awaited<ReturnType<typeof client.callTool>>): string {
    return (result.content as Array<{ type: string; text: string }>)[0].text;
  }

  describe('numwiz_trivia', () => {
    it('should return formatted trivia fact for known number', async () => {
      const result = await client.callTool({ name: 'numwiz_trivia', arguments: { number: 42 } });
      const text = getText(result);
      expect(text).toContain('🎲');
      expect(text).toContain('42');
    });

    it('should handle unknown number with floor fallback', async () => {
      const result = await client.callTool({
        name: 'numwiz_trivia',
        arguments: { number: 999999, notfound: 'floor' },
      });
      const text = getText(result);
      expect(text).toContain('🎲');
    });
  });

  describe('numwiz_math', () => {
    it('should return formatted math fact', async () => {
      const result = await client.callTool({ name: 'numwiz_math', arguments: { number: 0 } });
      const text = getText(result);
      expect(text).toContain('🔢');
      expect(text).toContain('0');
    });
  });

  describe('numwiz_date', () => {
    it('should return formatted date fact', async () => {
      const result = await client.callTool({
        name: 'numwiz_date',
        arguments: { month: 1, day: 1 },
      });
      const text = getText(result);
      expect(text).toContain('📅');
    });
  });

  describe('numwiz_year', () => {
    it('should return formatted year fact', async () => {
      const result = await client.callTool({ name: 'numwiz_year', arguments: { year: 1969 } });
      const text = getText(result);
      expect(text).toContain('📜');
      expect(text).toContain('1969');
    });
  });

  describe('numwiz_random', () => {
    it('should return a random fact with default type', async () => {
      const result = await client.callTool({ name: 'numwiz_random', arguments: {} });
      const text = getText(result);
      expect(text.length).toBeGreaterThan(0);
    });

    it('should support type parameter', async () => {
      const result = await client.callTool({
        name: 'numwiz_random',
        arguments: { type: 'math' },
      });
      const text = getText(result);
      expect(text).toContain('🔢');
    });
  });

  describe('numwiz_batch', () => {
    it('should return batch facts', async () => {
      const result = await client.callTool({
        name: 'numwiz_batch',
        arguments: { numbers: [1, 2, 3] },
      });
      const text = getText(result);
      expect(text).toContain('Batch Trivia Facts');
      expect(text).toContain('• 1:');
      expect(text).toContain('• 2:');
      expect(text).toContain('• 3:');
    });
  });

  describe('numwiz_range', () => {
    it('should return range facts', async () => {
      const result = await client.callTool({
        name: 'numwiz_range',
        arguments: { start: 1, end: 3 },
      });
      const text = getText(result);
      expect(text).toContain('Batch Trivia Facts');
    });

    it('should reject ranges exceeding 20', async () => {
      const result = await client.callTool({
        name: 'numwiz_range',
        arguments: { start: 1, end: 100 },
      });
      const text = getText(result);
      expect(text).toContain('Error');
      expect(result.isError).toBe(true);
    });
  });

  describe('numwiz_is_interesting', () => {
    it('should analyze number properties', async () => {
      const result = await client.callTool({
        name: 'numwiz_is_interesting',
        arguments: { number: 7 },
      });
      const text = getText(result);
      expect(text).toContain('🔍 Number Analysis: 7');
      expect(text).toContain('Prime number');
    });
  });

  describe('tool listing', () => {
    it('should list all 8 tools', async () => {
      const tools = await client.listTools();
      const toolNames = tools.tools.map((t) => t.name);
      expect(toolNames).toContain('numwiz_trivia');
      expect(toolNames).toContain('numwiz_math');
      expect(toolNames).toContain('numwiz_date');
      expect(toolNames).toContain('numwiz_year');
      expect(toolNames).toContain('numwiz_random');
      expect(toolNames).toContain('numwiz_batch');
      expect(toolNames).toContain('numwiz_range');
      expect(toolNames).toContain('numwiz_is_interesting');
      expect(tools.tools).toHaveLength(8);
    });
  });
});
