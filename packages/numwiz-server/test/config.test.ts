import { describe, it, expect } from 'vitest';
import { loadConfig } from '../src/config.js';

describe('config', () => {
  it('should return an empty config object (self-contained server)', () => {
    const config = loadConfig();
    expect(config).toEqual({});
  });
});
