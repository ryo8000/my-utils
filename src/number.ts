/**
 * Converts a string to a safe integer if it represents a valid integer within the safe integer range.
 *
 * @param str - The string to convert to a safe integer
 * @param options - Configuration options
 * @param options.normalizeNegativeZero - If true (default), "-0" will be treated as 0
 * @returns The parsed safe integer if the string is valid and within safe range, undefined otherwise
 */
export function toSafeInteger(
  str: string,
  options?: { normalizeNegativeZero?: boolean },
): number | undefined {
  const normalizeNegativeZero = options?.normalizeNegativeZero ?? true;

  if (!/^-?[0-9]+$/.test(str)) {
    return undefined;
  }

  const n = Number(str);
  if (!Number.isSafeInteger(n)) {
    return undefined;
  }

  if (normalizeNegativeZero && Object.is(n, -0)) {
    return 0;
  }
  return n;
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
 * - Can skip holes (empty slots) in sparse arrays and/or explicit `undefined` values if `ignoreUndefined` is true (default)
 * - Infinity is handled according to JavaScript arithmetic rules
 *
 * @param nums - The array of numbers to sum
 * @param options - Optional configuration object
 * @param options.ignoreUndefined - If true (default), undefined values are skipped; if false, undefined values are treated as NaN
 * @param options.ignoreNaN - If true (default), NaN values are skipped; if false, returns NaN when any NaN is encountered
 * @returns The sum of all numbers in the array, or 0 if the array is empty.
 *          Returns NaN if:
 *            - ignoreUndefined is false and any undefined values are present, or
 *            - ignoreNaN is false and any NaN values are present
 */
export function sum(
  nums: readonly number[],
  options?: { ignoreNaN?: boolean; ignoreUndefined?: boolean },
): number {
  const { ignoreNaN = true, ignoreUndefined = true } = options ?? {};

  let s = 0;
  for (let i = 0, l = nums.length; i < l; i++) {
    const n = nums[i];
    if (n === undefined) {
      if (ignoreUndefined) continue;
      return NaN;
    }
    if (Number.isNaN(n)) {
      if (ignoreNaN) continue;
      return NaN;
    }
    s += n;
  }
  return s;
}
