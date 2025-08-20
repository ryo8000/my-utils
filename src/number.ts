/**
 * Converts a string to a safe integer if it represents a valid integer within the safe integer range.
 *
 * @param str - The string to convert to a safe integer
 * @returns The parsed safe integer if the string is valid and within safe range, undefined otherwise
 */
export function toSafeInteger(str: string): number | undefined {
  if (!/^-?[0-9]+$/.test(str)) {
    return undefined;
  }
  const n = Number(str);
  return Number.isSafeInteger(n) ? n : undefined;
}

/**
 * Clamps a number within the specified range, ensuring it falls between min and max values.
 * If min > max, the values are automatically swapped to create a valid range.
 *
 * @param num - The number to clamp
 * @param min - The minimum allowed value
 * @param max - The maximum allowed value
 * @returns The clamped number, guaranteed to be between min and max (inclusive)
 */
export function clamp(num: number, min: number, max: number): number {
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.min(Math.max(num, min), max);
}

/**
 * Calculates the sum of all elements in a number array.
 *
 * - Skips holes in sparse arrays (treats them as 0)
 * - Infinity is handled according to JavaScript arithmetic rules
 *
 * @param nums - The array of numbers to sum
 * @param options - Optional configuration object
 * @param options.ignoreNaN - If true (default), NaN values are skipped; if false, returns NaN when any NaN is encountered
 * @returns The sum of all numbers in the array, or 0 if the array is empty. Returns NaN if ignoreNaN is false and any NaN values are present.
 */
export function sum(nums: readonly number[], options?: { ignoreNaN?: boolean }): number {
  const ignoreNaN = options?.ignoreNaN ?? true;

  let s = 0;
  for (let i = 0, l = nums.length; i < l; i++) {
    const n = nums[i];
    if (n === undefined) continue;
    else if (Number.isNaN(n)) {
      if (ignoreNaN) continue;
      return NaN;
    }
    s += n;
  }
  return s;
}
