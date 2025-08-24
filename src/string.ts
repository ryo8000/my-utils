/**
 * Escape HTML special characters in a string. & < > " ' are converted to HTML entities.
 *
 * @param str - The string to escape HTML characters in
 * @returns The input string with HTML special characters escaped as HTML entities
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
