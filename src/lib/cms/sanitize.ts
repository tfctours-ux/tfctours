// SERVER ONLY — do not import from client components.
// Safe: called only from server components and API routes.
const DANGEROUS_TAG_RE =
  /<\/?(script|iframe|object|embed|link|meta|base|form)[^>]*>/gi;
const EVENT_ATTRIBUTE_RE = /\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
const JS_URL_ATTRIBUTE_RE =
  /\s+(href|src)\s*=\s*(["'])\s*javascript:[\s\S]*?\2/gi;
const JS_URL_UNQUOTED_RE = /\s+(href|src)\s*=\s*javascript:[^\s>]+/gi;

export function sanitizeHtml(input: string): string {
  return input
    .replace(DANGEROUS_TAG_RE, "")
    .replace(EVENT_ATTRIBUTE_RE, "")
    .replace(JS_URL_ATTRIBUTE_RE, "")
    .replace(JS_URL_UNQUOTED_RE, "");
}
