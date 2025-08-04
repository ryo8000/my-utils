/**
 * Converts a string to an integer if it represents a valid integer.
 *
 * @param str - The string to convert to an integer
 * @returns The parsed integer if the string is valid, undefined otherwise
 */
export function toInteger(str: string): number | undefined {
  if (!/^-?[0-9]+$/.test(str)) {
    return undefined;
  }
  return Number(str);
}
