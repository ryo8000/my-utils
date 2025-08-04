/**
 * Converts a string to an integer if it represents a valid integer.
 *
 * @param str - The string to convert to an integer
 * @returns The parsed integer if the string is valid, undefined otherwise
 */
export function toInteger(str: string): number | undefined {
  return /^-?[0-9]+$/.test(str) ? Number(str) : undefined;
}

/**
 * Converts a string to a safe integer if it represents a valid integer within the safe integer range.
 *
 * @param str - The string to convert to a safe integer
 * @returns The parsed safe integer if the string is valid and within safe range, undefined otherwise
 */
export function toSafeInteger(str: string): number | undefined {
  const n = toInteger(str);
  return Number.isSafeInteger(n) ? n : undefined;
}
