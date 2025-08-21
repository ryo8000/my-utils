import { describe, expect, it } from 'vitest';

import { clamp, sum, toSafeInteger } from './number.js';

describe('toSafeInteger', () => {
  it.each([
    ['123', 123],
    ['007', 7],
    [Number.MAX_SAFE_INTEGER.toString(), Number.MAX_SAFE_INTEGER],
    [Number.MIN_SAFE_INTEGER.toString(), Number.MIN_SAFE_INTEGER],
    ['0', 0],
    ['-0', -0],
  ])('should convert "%s" to %d', (input, expected) => {
    expect(toSafeInteger(input)).toBe(expected);
  });

  it.each([(Number.MAX_SAFE_INTEGER + 1).toString(), (Number.MIN_SAFE_INTEGER - 1).toString()])(
    'should return undefined for out-of-range integer "%s"',
    (input) => {
      expect(toSafeInteger(input)).toBeUndefined();
    },
  );

  it.each([
    '', // Empty string
    '2e1', // Scientific notation
    '123.45', // Decimal number
    '+123', // Leading plus sign
    '123abc', // Alphanumeric mix
    '123 ', // Contains whitespace
    '1_000', // Contains special characters
  ])('should return undefined for invalid input "%s"', (input) => {
    expect(toSafeInteger(input)).toBeUndefined();
  });
});

describe('clamp', () => {
  it.each([
    [5, -10, 10, 5], // within range
    [11, 0, 10, 10], // above max
    [-11, -10, 0, -10], // below min
    [10, -10, 10, 10], // equal to max
    [-10, -10, 10, -10], // equal to min
    [Number.MAX_SAFE_INTEGER, -10, 10, 10], // maximum value
    [Number.MIN_SAFE_INTEGER, -10, 10, -10], // minimum value
  ])('clamp(%d, %d, %d) => %d', (num, min, max, expected) => {
    expect(clamp(num, min, max)).toBe(expected);
  });

  it.each([
    [5, 10, -10, 5], // within swapped range
    [11, 10, -10, 10], // above swapped max
    [-11, 10, -10, -10], // below swapped min
  ])('should swap min and max when min > max', (num, min, max, expected) => {
    expect(clamp(num, min, max)).toBe(expected);
  });

  it.each([
    [-2.4, -2.5, 3, -2.4], // within range
    [12.2, -3, 12.1, 12.1], // above max
    [-5, -2.5, 3, -2.5], // below min
  ])('should handle decimal numbers', (num, min, max, expected) => {
    expect(clamp(num, min, max)).toBe(expected);
  });
});

describe('sum', () => {
  it('should return 0 for empty array', () => {
    expect(sum([])).toBe(0);
  });

  it.each([
    [[-3], -3], // single value
    [[1, 2, 3], 6], // positives
    [[-1, -2, -3], -6], // negatives
    [[-1, 2, 3, -4], 0], // positives and negatives
  ])('sums integers %j => %d', (input, expected) => {
    expect(sum(input)).toBe(expected);
  });

  it.each([
    [[0.1], 0.1],
    [[1.25, -0.75, 2.5], 3],
    [[0.1, 0.2, 0.3], 0.6],
    [[-1.5, -2.5, -3.5], -7.5],
  ])('sums decimals %j ≈ %d', (input, expected) => {
    expect(sum(input)).toBeCloseTo(expected);
  });

  it.each([
    [[1_000_000, 2_000_000], 3_000_000],
    [[Number.MAX_SAFE_INTEGER, -Number.MAX_SAFE_INTEGER], 0],
  ])('handles large numbers %j => %d', (input, expected) => {
    expect(sum(input)).toBe(expected);
  });

  it('should handle Infinity according to JS rules', () => {
    expect(sum([Infinity, 1])).toBe(Infinity);
    expect(Number.isNaN(sum([Infinity, -Infinity]))).toBe(true);
  });

  describe('NaN handling', () => {
    it('should skip NaN by default', () => {
      expect(sum([1, NaN, 2])).toBe(3);
    });

    it('should propagate NaN when ignoreNaN is false', () => {
      expect(Number.isNaN(sum([1, NaN, 2], { ignoreNaN: false }))).toBe(true);
    });
  });

  describe('undefined handling', () => {
    it('should skip undefined values by default', () => {
      const arr = [] as number[];
      arr[0] = 1;
      arr[2] = 3; // arr[1] is a hole (undefined)
      expect(sum(arr)).toBe(4);
    });

    it('should propagate NaN when ignoreUndefined is false', () => {
      const arr = [] as number[];
      arr[0] = 1;
      arr[2] = 3; // arr[1] is a hole (undefined)
      expect(Number.isNaN(sum(arr, { ignoreUndefined: false }))).toBe(true);
    });
  });

  it('does not mutate the input array', () => {
    const input = [1, 2, 3] as const;
    const copy = [...input];
    sum(input);
    expect(input).toEqual(copy);
  });
});
