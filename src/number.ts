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
