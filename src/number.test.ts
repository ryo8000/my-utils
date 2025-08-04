import { describe, it, expect } from 'vitest';
import { toInteger } from './number.js';

describe('toInteger', () => {
  it('should convert valid positive integer strings to numbers', () => {
    expect(toInteger('0')).toBe(0);
    expect(toInteger('123')).toBe(123);
    expect(toInteger('007')).toBe(7);
    expect(toInteger('999999999')).toBe(999999999);
    expect(toInteger('9007199254740991')).toBe(9007199254740991);
  });

  it('should convert valid negative integer strings to numbers', () => {
    expect(toInteger('-1')).toBe(-1);
    expect(toInteger('-123')).toBe(-123);
    expect(toInteger('-0')).toBe(-0);
    expect(toInteger('-999999999')).toBe(-999999999);
  });

  it('should return undefined for empty string', () => {
    expect(toInteger('')).toBeUndefined();
  });

  it('should return undefined for scientific notation', () => {
    expect(toInteger('2e1')).toBeUndefined();
    expect(toInteger('1e10')).toBeUndefined();
    expect(toInteger('1E5')).toBeUndefined();
  });

  it('should return undefined for decimal numbers', () => {
    expect(toInteger('123.45')).toBeUndefined();
    expect(toInteger('0.0')).toBeUndefined();
    expect(toInteger('12.0')).toBeUndefined();
    expect(toInteger('-123.45')).toBeUndefined();
  });

  it('should return undefined for strings with plus sign', () => {
    expect(toInteger('+123')).toBeUndefined();
    expect(toInteger('+0')).toBeUndefined();
  });

  it('should return undefined for strings containing letters', () => {
    expect(toInteger('123abc')).toBeUndefined();
    expect(toInteger('abc123')).toBeUndefined();
    expect(toInteger('12a34')).toBeUndefined();
    expect(toInteger('abc')).toBeUndefined();
  });

  it('should return undefined for strings with whitespace', () => {
    expect(toInteger(' 123')).toBeUndefined();
    expect(toInteger('123 ')).toBeUndefined();
    expect(toInteger(' 123 ')).toBeUndefined();
    expect(toInteger('1 23')).toBeUndefined();
  });

  it('should return undefined for strings with special characters', () => {
    expect(toInteger('1,000')).toBeUndefined();
    expect(toInteger('1_000')).toBeUndefined();
    expect(toInteger('$123')).toBeUndefined();
    expect(toInteger('123%')).toBeUndefined();
  });
});
