import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

function generateNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes));
}

function buildCsp(nonce: string): string {
  const isDev = process.env.NODE_ENV !== "production";

  const directives: Record<string, string[]> = {
    "default-src":       ["'self'"],
    "script-src":        [
      "'self'",
      `'nonce-${nonce}'`,
      "https://challenges.cloudflare.com",
      "https://plausible.io",
      ...(isDev ? ["'unsafe-eval'"] : []),
    ],
    "style-src":         ["'self'", "'unsafe-inline'"],
    "img-src":           ["'self'", "data:", "blob:", "https:"],
    "font-src":          ["'self'", "data:", "https://fonts.gstatic.com"],
    "frame-src":         [
      "https://challenges.cloudflare.com",
      "https://www.google.com",
      "https://maps.google.com",
    ],
    "connect-src":       [
      "'self'",
      "https://api.resend.com",
      "https://challenges.cloudflare.com",
      "https://plausible.io",
      ...(isDev ? ["ws:"] : []),
    ],
    "object-src":        ["'none'"],
    "base-uri":          ["'self'"],
    "form-action":       ["'self'"],
    "frame-ancestors":   ["'none'"],
    "manifest-src":      ["'self'"],
    "worker-src":        ["'self'", "blob:"],
    "upgrade-insecure-requests": [],
  };

  return Object.entries(directives)
    .map(([key, values]) =>
      values.length === 0 ? key : `${key} ${values.join(" ")}`,
    )
    .join("; ");
}

export default function middleware(request: NextRequest) {
  const nonce = generateNonce();
  const csp = buildCsp(nonce);

  request.headers.set("x-nonce", nonce);

  const intlResponse = intlMiddleware(request);
  intlResponse.headers.set("Content-Security-Policy", csp);
  intlResponse.headers.set("x-nonce", nonce);

  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
