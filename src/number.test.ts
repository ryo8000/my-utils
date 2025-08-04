import { describe, it, expect } from 'vitest';
import { toInteger, toSafeInteger } from './number.js';

describe('toInteger', () => {
  it.each([
    ['0', 0],
    ['123', 123],
    ['007', 7],
    ['999999999999999', 999999999999999],
    [Number.MAX_SAFE_INTEGER.toString(), 9007199254740991],
    [(Number.MAX_SAFE_INTEGER + 1).toString(), 9007199254740992],
  ])('should convert valid positive integer string "%s" to number %d', (input, expected) => {
    expect(toInteger(input)).toBe(expected);
  });

  it.each([
    ['-0', -0],
    ['-123', -123],
    ['-007', -7],
    ['-999999999999999', -999999999999999],
    [Number.MIN_SAFE_INTEGER.toString(), -9007199254740991],
    [(Number.MIN_SAFE_INTEGER - 1).toString(), -9007199254740992],
  ])('should convert valid negative integer string "%s" to number %d', (input, expected) => {
    expect(toInteger(input)).toBe(expected);
  });

  it('should return undefined for empty string', () => {
    expect(toInteger('')).toBeUndefined();
  });

  it.each(['2e1', '1e10', '1E5'])('should return undefined for scientific notation "%s"', input => {
    expect(toInteger(input)).toBeUndefined();
  });

  it.each(['123.45', '0.0', '12.0', '-123.45'])(
    'should return undefined for decimal numbers "%s"',
    input => {
      expect(toInteger(input)).toBeUndefined();
    }
  );

  it.each(['+123', '+0'])('should return undefined for strings with plus sign "%s"', input => {
    expect(toInteger(input)).toBeUndefined();
  });

  it.each(['123abc', 'abc123', '12a34', 'abc'])(
    'should return undefined for strings containing letters "%s"',
    input => {
      expect(toInteger(input)).toBeUndefined();
    }
  );

  it.each([' 123', '123 ', ' 123 ', '1 23'])(
    'should return undefined for strings with whitespace "%s"',
    input => {
      expect(toInteger(input)).toBeUndefined();
    }
  );

  it.each(['1,000', '1_000', '$123', '123%'])(
    'should return undefined for strings with special characters "%s"',
    input => {
      expect(toSafeInteger(input)).toBeUndefined();
    }
  );
});

describe('toSafeInteger', () => {
  it.each([
    ['0', 0],
    ['123', 123],
    ['007', 7],
    ['999999999999999', 999999999999999],
    [Number.MAX_SAFE_INTEGER.toString(), 9007199254740991],
  ])('should convert valid safe integer string "%s" to number %d', (input, expected) => {
    expect(toSafeInteger(input)).toBe(expected);
  });

  it.each([
    ['-0', -0],
    ['-123', -123],
    ['-007', -7],
    ['-999999999999999', -999999999999999],
    [Number.MIN_SAFE_INTEGER.toString(), -9007199254740991],
  ])('should convert valid negative safe integer string "%s" to number %d', (input, expected) => {
    expect(toSafeInteger(input)).toBe(expected);
  });

  it.each([(Number.MAX_SAFE_INTEGER + 1).toString(), (Number.MIN_SAFE_INTEGER - 1).toString()])(
    'should return undefined for integer outside safe integer range "%s"',
    input => {
      expect(toSafeInteger(input)).toBeUndefined();
    }
  );

  it('should return undefined for empty string', () => {
    expect(toSafeInteger('')).toBeUndefined();
  });

  it.each(['2e1', '1e10', '1E5'])('should return undefined for scientific notation "%s"', input => {
    expect(toSafeInteger(input)).toBeUndefined();
  });

  it.each(['123.45', '0.0', '12.0', '-123.45'])(
    'should return undefined for decimal numbers "%s"',
    input => {
      expect(toSafeInteger(input)).toBeUndefined();
    }
  );

  it.each(['+123', '+0'])('should return undefined for strings with plus sign "%s"', input => {
    expect(toSafeInteger(input)).toBeUndefined();
  });

  it.each(['123abc', 'abc123', '12a34', 'abc'])(
    'should return undefined for strings containing letters "%s"',
    input => {
      expect(toSafeInteger(input)).toBeUndefined();
    }
  );

  it.each([' 123', '123 ', ' 123 ', '1 23'])(
    'should return undefined for strings with whitespace "%s"',
    input => {
      expect(toSafeInteger(input)).toBeUndefined();
    }
  );

  it.each(['1,000', '1_000', '$123', '123%'])(
    'should return undefined for strings with special characters "%s"',
    input => {
      expect(toSafeInteger(input)).toBeUndefined();
    }
  );
});
