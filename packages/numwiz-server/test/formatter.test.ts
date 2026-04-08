import { describe, it, expect } from 'vitest';
import { formatSingleFact, formatBatchFacts, formatInteresting } from '../src/utils/formatter.js';
import type { NumbersApiResponse, BatchApiResponse } from '../src/client/numbers-client.js';

describe('formatter', () => {
  describe('formatSingleFact', () => {
    it('should format trivia fact with emoji', () => {
      const response: NumbersApiResponse = {
        text: '42 is the answer to everything',
        number: 42,
        found: true,
        type: 'trivia',
      };
      const result = formatSingleFact(response);
      expect(result).toContain('🎲');
      expect(result).toContain('Number Trivia: 42');
      expect(result).toContain('42 is the answer to everything');
      expect(result).toContain('Type: trivia');
      expect(result).toContain('Source: numbersapi.com');
    });

    it('should format math fact', () => {
      const response: NumbersApiResponse = {
        text: '7 is a prime',
        number: 7,
        found: true,
        type: 'math',
      };
      const result = formatSingleFact(response);
      expect(result).toContain('🔢');
      expect(result).toContain('Number Math: 7');
    });

    it('should format date fact', () => {
      const response: NumbersApiResponse = {
        text: 'January 1 is New Year',
        number: 1,
        found: true,
        type: 'date',
      };
      const result = formatSingleFact(response);
      expect(result).toContain('📅');
      expect(result).toContain('Date');
    });

    it('should format year fact', () => {
      const response: NumbersApiResponse = {
        text: '1969 moon landing',
        number: 1969,
        found: true,
        type: 'year',
      };
      const result = formatSingleFact(response);
      expect(result).toContain('📜');
      expect(result).toContain('Year');
    });

    it('should handle unknown type gracefully', () => {
      const response: NumbersApiResponse = {
        text: 'Unknown',
        number: 0,
        found: false,
        type: 'unknown',
      };
      const result = formatSingleFact(response);
      expect(result).toContain('✨');
    });
  });

  describe('formatBatchFacts', () => {
    it('should format batch results sorted by number', () => {
      const batch: BatchApiResponse = {
        '3': 'Three fact',
        '1': 'One fact',
        '2': 'Two fact',
      };
      const result = formatBatchFacts(batch, 'trivia');
      expect(result).toContain('🎲 Batch Trivia Facts');
      expect(result).toContain('• 1: One fact');
      expect(result).toContain('• 2: Two fact');
      expect(result).toContain('• 3: Three fact');
      // Verify sort order
      const idx1 = result.indexOf('• 1:');
      const idx2 = result.indexOf('• 2:');
      const idx3 = result.indexOf('• 3:');
      expect(idx1).toBeLessThan(idx2);
      expect(idx2).toBeLessThan(idx3);
    });

    it('should format math batch', () => {
      const batch: BatchApiResponse = { '5': 'Five math' };
      const result = formatBatchFacts(batch, 'math');
      expect(result).toContain('🔢 Batch Math Facts');
    });
  });

  describe('formatInteresting', () => {
    const triviaResp: NumbersApiResponse = {
      text: '7 is lucky',
      number: 7,
      found: true,
      type: 'trivia',
    };
    const mathResp: NumbersApiResponse = {
      text: '7 is a prime number',
      number: 7,
      found: true,
      type: 'math',
    };

    it('should detect prime numbers', () => {
      const result = formatInteresting(7, triviaResp, mathResp);
      expect(result).toContain('Prime number');
      expect(result).toContain('🔍 Number Analysis: 7');
    });

    it('should detect perfect squares', () => {
      const trivia = { ...triviaResp, number: 16 };
      const math = { ...mathResp, number: 16 };
      const result = formatInteresting(16, trivia, math);
      expect(result).toContain('Perfect square');
    });

    it('should detect fibonacci numbers', () => {
      const trivia = { ...triviaResp, number: 8 };
      const math = { ...mathResp, number: 8 };
      const result = formatInteresting(8, trivia, math);
      expect(result).toContain('Fibonacci number');
    });

    it('should detect palindromes', () => {
      const trivia = { ...triviaResp, number: 121 };
      const math = { ...mathResp, number: 121 };
      const result = formatInteresting(121, trivia, math);
      expect(result).toContain('Palindrome');
    });

    it('should detect powers of 2', () => {
      const trivia = { ...triviaResp, number: 64 };
      const math = { ...mathResp, number: 64 };
      const result = formatInteresting(64, trivia, math);
      expect(result).toContain('Power of 2');
    });

    it('should handle numbers with no special properties', () => {
      const trivia = { ...triviaResp, number: 42 };
      const math = { ...mathResp, number: 42 };
      const result = formatInteresting(42, trivia, math);
      expect(result).toContain('No special properties detected');
    });

    it('should include trivia and math text', () => {
      const result = formatInteresting(7, triviaResp, mathResp);
      expect(result).toContain('**Trivia**: 7 is lucky');
      expect(result).toContain('**Math**: 7 is a prime number');
    });

    it('should handle negative numbers', () => {
      const trivia = { ...triviaResp, number: -5 };
      const math = { ...mathResp, number: -5 };
      const result = formatInteresting(-5, trivia, math);
      expect(result).toContain('Number Analysis: -5');
    });

    it('should handle zero', () => {
      const trivia = { ...triviaResp, number: 0 };
      const math = { ...mathResp, number: 0 };
      const result = formatInteresting(0, trivia, math);
      expect(result).toContain('Fibonacci number');
    });

    it('should detect multiple properties at once', () => {
      // 1 is: fibonacci, palindrome, power of 2, perfect square
      const trivia = { ...triviaResp, number: 1 };
      const math = { ...mathResp, number: 1 };
      const result = formatInteresting(1, trivia, math);
      expect(result).toContain('Fibonacci number');
      expect(result).toContain('Palindrome');
      expect(result).toContain('Power of 2');
      expect(result).toContain('Perfect square');
    });
  });
});
