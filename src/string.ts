const htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#039;',
} as const;

const unescapedHtmlRegex = /[&<>"']/g;

/**
 * Escape HTML special characters in a string. & < > " ' are converted to HTML entities.
 *
 * @param str - The string to escape HTML characters in
 * @returns The input string with HTML special characters escaped as HTML entities
 */
export function escapeHtml(str: string): string {
  return str.replace(unescapedHtmlRegex, (c) => htmlEscapes[c as keyof typeof htmlEscapes]);
}
