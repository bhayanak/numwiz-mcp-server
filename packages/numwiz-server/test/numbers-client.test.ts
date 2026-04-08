import { describe, it, expect } from 'vitest';
import { NumbersClient } from '../src/client/numbers-client.js';

describe('NumbersClient', () => {
  const client = new NumbersClient();

  describe('getTrivia', () => {
    it('should return a fact for a known number', () => {
      const result = client.getTrivia(42);
      expect(result.found).toBe(true);
      expect(result.type).toBe('trivia');
      expect(result.number).toBe(42);
      expect(result.text.length).toBeGreaterThan(0);
    });

    it('should return found=false for an unknown number', () => {
      const result = client.getTrivia(999999);
      expect(result.found).toBe(false);
      expect(result.type).toBe('trivia');
    });

    it('should use floor fallback for unknown number', () => {
      // 999999 is unknown; floor should find the closest known number below it
      const result = client.getTrivia(999999, 'floor');
      expect(result.found).toBe(true);
      expect(result.number).toBeLessThanOrEqual(999999);
    });

    it('should use ceil fallback for unknown number', () => {
      // -999999 is unknown; ceil should find the closest known number above it
      const result = client.getTrivia(-999999, 'ceil');
      expect(result.found).toBe(true);
      expect(result.number).toBeGreaterThanOrEqual(-999999);
    });

    it('should return found=false with default notfound for unknown number', () => {
      const result = client.getTrivia(999999, 'default');
      expect(result.found).toBe(false);
    });
  });

  describe('getMath', () => {
    it('should return a math fact for a known number', () => {
      const result = client.getMath(0);
      expect(result.found).toBe(true);
      expect(result.type).toBe('math');
      expect(result.number).toBe(0);
    });

    it('should return found=false for an unknown number', () => {
      const result = client.getMath(999999);
      expect(result.found).toBe(false);
    });
  });

  describe('getDate', () => {
    it('should return a fact for January 1', () => {
      const result = client.getDate(1, 1);
      expect(result.found).toBe(true);
      expect(result.type).toBe('date');
    });

    it('should return a fact for December 25', () => {
      const result = client.getDate(12, 25);
      expect(result.found).toBe(true);
      expect(result.type).toBe('date');
    });

    it('should return found=false for invalid date', () => {
      const result = client.getDate(13, 40);
      expect(result.found).toBe(false);
      expect(result.type).toBe('date');
    });
  });

  describe('getYear', () => {
    it('should return a fact for a known year', () => {
      const result = client.getYear(1969);
      expect(result.found).toBe(true);
      expect(result.type).toBe('year');
      expect(result.number).toBe(1969);
    });

    it('should return found=false for an unknown year', () => {
      const result = client.getYear(9999);
      expect(result.found).toBe(false);
    });
  });

  describe('getRandom', () => {
    it('should return a random trivia fact by default', () => {
      const result = client.getRandom();
      expect(result.found).toBe(true);
      expect(result.type).toBe('trivia');
    });

    it('should return a random math fact', () => {
      const result = client.getRandom('math');
      expect(result.found).toBe(true);
      expect(result.type).toBe('math');
    });

    it('should return a random date fact', () => {
      const result = client.getRandom('date');
      expect(result.found).toBe(true);
      expect(result.type).toBe('date');
    });

    it('should return a random year fact', () => {
      const result = client.getRandom('year');
      expect(result.found).toBe(true);
      expect(result.type).toBe('year');
    });
  });

  describe('getBatch', () => {
    it('should return facts for multiple known numbers', () => {
      const result = client.getBatch([1, 2, 3]);
      expect(Object.keys(result).length).toBe(3);
      expect(result['1']).toBeDefined();
      expect(result['2']).toBeDefined();
      expect(result['3']).toBeDefined();
    });

    it('should handle unknown numbers in batch', () => {
      const result = client.getBatch([999999]);
      expect(result['999999']).toContain("don't have");
    });

    it('should support math type', () => {
      const result = client.getBatch([0, 1], 'math');
      expect(Object.keys(result).length).toBe(2);
    });
  });

  describe('getRange', () => {
    it('should return facts for a range of numbers', () => {
      const result = client.getRange(1, 3);
      expect(Object.keys(result).length).toBe(3);
    });

    it('should support math type', () => {
      const result = client.getRange(0, 2, 'math');
      expect(Object.keys(result).length).toBe(3);
    });
  });
});
