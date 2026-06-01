// src/lib/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialise Redis client lazily; if env vars are missing,
// rate-limit calls fail open (log warning, allow request).
let _ratelimit: Ratelimit | null = null;

function getRatelimit(): Ratelimit | null {
  if (_ratelimit) return _ratelimit;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const redis = new Redis({ url, token });
  _ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    analytics: true,
    prefix: "tfc:ratelimit",
  });
  return _ratelimit;
}

interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  reset: number;
  backend: "upstash" | "fail-open";
}

export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
  const limiter = getRatelimit();
  if (!limiter) {
    console.warn({ action: "rate_limit", note: "upstash_not_configured" });
    return { allowed: true, limit: 5, remaining: 5, reset: 0, backend: "fail-open" };
  }
  try {
    const { success, limit, remaining, reset } = await limiter.limit(identifier);
    return { allowed: success, limit, remaining, reset, backend: "upstash" };
  } catch (error) {
    console.error({ action: "rate_limit", error });
    return { allowed: true, limit: 5, remaining: 5, reset: 0, backend: "fail-open" };
  }
}

export function extractClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const xri = request.headers.get("x-real-ip");
  if (xri) return xri.trim();
  return "unknown";
}
