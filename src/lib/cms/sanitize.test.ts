import { describe, expect, it } from "vitest";

import { sanitizeHtml } from "./sanitize";

describe("sanitizeHtml", () => {
  it("strips script tags and event handlers", () => {
    const dirty = '<p onclick="alert(1)">Hello</p><script>alert(1)</script>';

    expect(sanitizeHtml(dirty)).toBe("<p>Hello</p>alert(1)");
  });

  it("strips javascript urls", () => {
    const dirty = '<a href="javascript:alert(1)">bad</a><img src=javascript:alert(2) alt="x">';

    expect(sanitizeHtml(dirty)).toBe('<a>bad</a><img alt="x">');
  });

  it("preserves valid content tags and safe urls", () => {
    const clean =
      '<h2>Title</h2><p>Copy</p><ul><li>One</li></ul><a href="https://example.com">Link</a><img src="https://example.com/a.jpg" alt="A">';

    expect(sanitizeHtml(clean)).toBe(clean);
  });
});
