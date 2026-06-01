// src/app/api/cms-health/route.ts
import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";

import { getCmsDb } from "@/lib/cms/client";
import { brandSettings } from "@/lib/cms/schema";
import { extractClientIp } from "@/lib/rate-limit";

const WINDOW_MS = 60_000;
const LIMIT = 10;
const HEALTH_CACHE_CONTROL = "public, max-age=30, stale-while-revalidate=60";
const buckets = new Map<string, { count: number; resetAt: number }>();

function checkCmsHealthLimit(ip: string) {
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

export async function GET(request: Request) {
  const ip = extractClientIp(request);
  const rateLimit = checkCmsHealthLimit(ip);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, code: "TOO_MANY_REQUESTS" },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
          "X-RateLimit-Limit": String(LIMIT),
          "X-RateLimit-Remaining": "0",
        },
      },
    );
  }

  const db = getCmsDb();

  if (!db) {
    return NextResponse.json(
      {
        ok: true,
        cms: "disabled",
        reason: "NEON_DATABASE_URL not set",
      },
      { headers: { "Cache-Control": HEALTH_CACHE_CONTROL } },
    );
  }

  try {
    await db
      .select({ ping: sql<number>`1` })
      .from(brandSettings)
      .limit(1);

    return NextResponse.json(
      { ok: true, cms: "connected" },
      { headers: { "Cache-Control": HEALTH_CACHE_CONTROL } },
    );
  } catch (error) {
    console.warn({ action: "cms_health_probe_failed", error });
    return NextResponse.json(
      {
        ok: true,
        cms: "error",
        reason: "db_probe_failed",
      },
      { headers: { "Cache-Control": HEALTH_CACHE_CONTROL } },
    );
  }
}
