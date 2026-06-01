// src/app/api/cms/i18n-preview/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";

import { getCmsI18nOverrides } from "@/lib/cms/i18n-overrides";
import { extractClientIp } from "@/lib/rate-limit";

const WINDOW_MS = 60_000;
const LIMIT = 30;
const buckets = new Map<string, { count: number; resetAt: number }>();

const querySchema = z.object({
  locale: z.enum(["en", "ur"]),
  namespace: z.string().trim().min(1).max(200),
  key: z.string().trim().min(1).max(500),
});

export async function GET(request: Request): Promise<Response> {
  const ip = extractClientIp(request);
  const rateLimit = checkPreviewLimit(ip);
  const corsHeaders = getCorsHeaders();

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, code: "TOO_MANY_REQUESTS" },
      {
        status: 429,
        headers: {
          ...corsHeaders,
          "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
          "X-RateLimit-Limit": String(LIMIT),
          "X-RateLimit-Remaining": "0",
        },
      },
    );
  }

  const url = new URL(request.url);
  const parsed = querySchema.safeParse(Object.fromEntries(url.searchParams));

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, code: "VALIDATION_FAILED" },
      { status: 400, headers: corsHeaders },
    );
  }

  const { locale, namespace, key } = parsed.data;

  try {
    const bundledModule = (await import(`../../../../messages/${locale}.json`)) as {
      default?: Record<string, unknown>;
    };
    const bundledMessages = bundledModule.default ?? bundledModule;
    const bundled = resolveNestedString(bundledMessages, [
      ...namespace.split("."),
      ...key.split("."),
    ]);
    const overrides = await getCmsI18nOverrides(locale);
    const override = resolveNestedString(overrides, [
      ...namespace.split("."),
      ...key.split("."),
    ]);

    return NextResponse.json(
      {
        ok: true,
        data: {
          bundled,
          override,
        },
      },
      { headers: corsHeaders },
    );
  } catch {
    return NextResponse.json(
      { ok: false, code: "INVALID_LOCALE" },
      { status: 400, headers: corsHeaders },
    );
  }
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { status: 204, headers: getCorsHeaders() });
}

function checkPreviewLimit(ip: string) {
  const now = Date.now();
  const current = buckets.get(ip);

  if (!current || current.resetAt <= now) {
    const resetAt = now + WINDOW_MS;
    buckets.set(ip, { count: 1, resetAt });
    return { allowed: true, remaining: LIMIT - 1, resetAt };
  }

  if (current.count >= LIMIT) {
    return { allowed: false, remaining: 0, resetAt: current.resetAt };
  }

  current.count += 1;
  return {
    allowed: true,
    remaining: Math.max(0, LIMIT - current.count),
    resetAt: current.resetAt,
  };
}

function getCorsHeaders(): Record<string, string> {
  // Production should set ADMIN_ORIGIN to the exact admin domain. The wildcard
  // fallback keeps local preview tooling usable when the env var is absent.
  const origin = process.env.ADMIN_ORIGIN || "*";

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function resolveNestedString(
  source: Record<string, unknown>,
  path: string[],
): string | null {
  let current: unknown = source;

  for (const part of path) {
    if (!isRecord(current) || !(part in current)) {
      return null;
    }

    current = current[part];
  }

  return typeof current === "string" ? current : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
