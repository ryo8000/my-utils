import { describe, it, expect } from 'vitest';
import { getHello } from './index.js';

describe('getHello', () => {
  it('should return "Hello, world!"', () => {
    const result = getHello();
    expect(result).toBe('Hello, world!');
  });

  it('should return a string', () => {
    const result = getHello();
    expect(typeof result).toBe('string');
  });
});