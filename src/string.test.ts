import { describe, expect, it } from 'vitest';

import { escapeHtml } from './string.js';

describe('escapeHtml', () => {
  it.each([
    ['&', '&amp;'],
    ['<', '&lt;'],
    ['>', '&gt;'],
    ['"', '&quot;'],
    ["'", '&#039;'],
  ])('maps single char %s -> %s', (input, expected) => {
    expect(escapeHtml(input)).toBe(expected);
  });

  it.each([
    ['', ''],
    ['Hello World', 'Hello World'],
  ])('passes through safe string: "%s"', (input, expected) => {
    expect(escapeHtml(input)).toBe(expected);
  });

  it('escapes consecutive specials', () => {
    expect(escapeHtml('<<>>""\'\'')).toBe('&lt;&lt;&gt;&gt;&quot;&quot;&#039;&#039;');
  });

  it('escapes mixed HTML-like text', () => {
    expect(escapeHtml('<div class="t" id=\'x\'>Hello & World</div>')).toBe(
      '&lt;div class=&quot;t&quot; id=&#039;x&#039;&gt;Hello &amp; World&lt;/div&gt;',
    );
  });

  it.each([
    ['&<>"\'', '&amp;&lt;&gt;&quot;&#039;'], // if & were replaced after <, the & in &lt; would become &amp;lt; (bad)
    ['A&B<C>D"E\'F', 'A&amp;B&lt;C&gt;D&quot;E&#039;F'],
  ])('does not double-encode "%s" -> "%s"', (input, expected) => {
    expect(escapeHtml(input)).toBe(expected);
  });
});
