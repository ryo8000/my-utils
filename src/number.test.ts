import { describe, it, expect } from 'vitest';
import { toSafeInteger, clamp, sum } from './number.js';

describe('toSafeInteger', () => {
  it.each([
    ['123', 123],
    ['007', 7],
    ['999999999999999', 999999999999999],
    [Number.MAX_SAFE_INTEGER.toString(), 9007199254740991],
  ])('should convert valid safe integer string "%s" to number %d', (input, expected) => {
    expect(toSafeInteger(input)).toBe(expected);
  });

  it.each([
    ['-123', -123],
    ['-007', -7],
    ['-999999999999999', -999999999999999],
    [Number.MIN_SAFE_INTEGER.toString(), -9007199254740991],
  ])('should convert valid negative safe integer string "%s" to number %d', (input, expected) => {
    expect(toSafeInteger(input)).toBe(expected);
  });

  it('should convert "0" to 0', () => {
    expect(toSafeInteger('0')).toBe(0);
  });

  it('should convert "-0" to -0', () => {
    expect(toSafeInteger('-0')).toBe(-0);
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

describe('clamp', () => {
  it.each([
    [5, 0, 10, 5], // value within range
    [15, 0, 10, 10], // value above max
    [-5, 0, 10, 0], // value below min
    [0, 0, 10, 0], // value equals min
    [10, 0, 10, 10], // value equals max
    [5, 5, 5, 5], // min equals max
  ])('should clamp %d with range [%d, %d] to %d', (num, min, max, expected) => {
    expect(clamp(num, min, max)).toBe(expected);
  });

  it.each([
    [-10, -20, -5, -10], // value within range
    [-3, -20, -5, -5], // value above max
    [-25, -20, -5, -20], // value below min
    [-10, -10, -5, -10], // value equals min
    [-5, -10, -5, -5], // value equals max
    [-5, -5, -5, -5], // min equals max
  ])(
    'should handle negative numbers: clamp %d with range [%d, %d] to %d',
    (num, min, max, expected) => {
      expect(clamp(num, min, max)).toBe(expected);
    }
  );

  it.each([
    [5.7, 0, 10, 5.7], // decimal within range
    [12.3, 0, 10, 10], // decimal above max
    [-2.8, 0, 10, 0], // decimal below min
    [7.5, 7.5, 8.5, 7.5], // decimal equals min
    [8.5, 7.5, 8.5, 8.5], // decimal equals max
    [8.5, 8.5, 8.5, 8.5], // min equals max
  ])(
    'should handle decimal numbers: clamp %d with range [%d, %d] to %d',
    (num, min, max, expected) => {
      expect(clamp(num, min, max)).toBe(expected);
    }
  );

  it.each([
    [1000000, -100, 100, 100], // very large number
    [-1000000, -100, 100, -100], // very small number
    [Number.MAX_SAFE_INTEGER, -100, 100, 100], // maximum value
    [Number.MIN_SAFE_INTEGER, -100, 100, -100], // minimum value
  ])(
    'should handle extreme values: clamp %d with range [%d, %d] to %d',
    (num, min, max, expected) => {
      expect(clamp(num, min, max)).toBe(expected);
    }
  );

  it.each([
    [0, -5, 5, 0],
    [0, 1, 5, 1],
    [0, -5, -1, -1],
  ])(
    'should handle zero correctly: clamp %d with range [%d, %d] to %d',
    (num, min, max, expected) => {
      expect(clamp(num, min, max)).toBe(expected);
    }
  );

  it.each([
    [5, 10, 0, 5], // value within swapped range
    [15, 10, 0, 10], // value above swapped max (original min)
    [-5, 10, 0, 0], // value below swapped min (original max)
    [0, 10, 0, 0], // value equals swapped min (original max)
    [10, 10, 0, 10], // value equals swapped max (original min)
    [7, 5, 10, 7], // normal case after swap (5 < 10)
    [-2, 5, -10, -2], // negative numbers with swap
    [8, 5, -10, 5], // value above range after swap
    [-12, 5, -10, -10], // value below range after swap
    [3.5, 8.2, 1.1, 3.5], // decimal numbers with swap
    [0.5, 8.2, 1.1, 1.1], // decimal below range after swap
    [9.0, 8.2, 1.1, 8.2], // decimal above range after swap
  ])(
    'should swap min/max when min > max: clamp %d with range [%d, %d] to %d',
    (num, min, max, expected) => {
      expect(clamp(num, min, max)).toBe(expected);
    }
  );
});

describe('sum', () => {
  it('should return 0 for empty array', () => {
    expect(sum([])).toBe(0);
  });

  it.each([
    [[5], 5],
    [[0], 0],
    [[-3], -3],
    [[1.5], 1.5],
  ])('should return the single value for single element array %j', (input, expected) => {
    expect(sum(input)).toBe(expected);
  });

  it.each([
    [[1, 2, 3], 6],
    [[-1, -2, -3], -6],
    [[1, -1], 0],
    [[10, -5, -3, 2], 4],
    [[-10, 5, 3, -2], -4],
    [[100, -50, 25, -25], 50],
    [[5, -10, 15, -20, 10], 0],
  ])('should sum numbers %j to %d', (input, expected) => {
    expect(sum(input)).toBe(expected);
  });

  it.each([
    [[1.5, 2.5, 3.5], 7.5],
    [[0.1, 0.2, 0.3], 0.6],
    [[-1.5, -2.5, -3.5], -7.5],
    [[1.25, -0.75, 2.5], 3],
  ])('should sum decimal numbers %j to %d', (input, expected) => {
    expect(sum(input)).toBeCloseTo(expected);
  });

  it.each([
    [[0, 0, 0], 0],
    [[1, 0, 2], 3],
    [[0, -1, 0, 1], 0],
    [[-5, 0, 5], 0],
  ])('should handle arrays with zero values %j to %d', (input, expected) => {
    expect(sum(input)).toBe(expected);
  });

  it.each([
    [[1000000, 2000000], 3000000],
    [[Number.MAX_SAFE_INTEGER, -Number.MAX_SAFE_INTEGER], 0],
    [[Number.MAX_SAFE_INTEGER], Number.MAX_SAFE_INTEGER],
    [[Number.MIN_SAFE_INTEGER], Number.MIN_SAFE_INTEGER],
  ])('should handle large numbers %j to %d', (input, expected) => {
    expect(sum(input)).toBe(expected);
  });
});
