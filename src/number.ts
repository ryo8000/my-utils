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
