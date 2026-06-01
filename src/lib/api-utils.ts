// src/lib/api-utils.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import type { ZodType, ZodTypeDef } from "zod";

import { checkRateLimit, extractClientIp } from "./rate-limit";
import { verifyTurnstile } from "./turnstile";

interface ProtectedPayload {
  turnstileToken: string;
}

type WithProtectionResult<T> =
  | { ok: true; ip: string; data: T }
  | { ok: false; response: NextResponse };

export async function withProtection<T extends ProtectedPayload>(
  request: NextRequest,
  schema: ZodType<T, ZodTypeDef, unknown>,
): Promise<WithProtectionResult<T>> {
  const ip = extractClientIp(request);

  const rateResult = await checkRateLimit(ip);
  if (!rateResult.allowed) {
    return {
      ok: false,
      response: NextResponse.json(
        { ok: false, error: "Too many requests. Please wait a minute." },
        { status: 429, headers: { "Retry-After": "60" } },
      ),
    };
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return {
      ok: false,
      response: NextResponse.json(
        { ok: false, error: "Invalid request body." },
        { status: 400 },
      ),
    };
  }

  const parsed = schema.safeParse(rawBody);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Invalid input.";
    return {
      ok: false,
      response: NextResponse.json({ ok: false, error: firstIssue }, { status: 400 }),
    };
  }

  const payload = parsed.data;

  const turnstileResult = await verifyTurnstile(payload.turnstileToken, ip);
  if (!turnstileResult.ok) {
    console.warn({ action: "turnstile_rejected", reason: turnstileResult.reason });
    return {
      ok: false,
      response: NextResponse.json(
        { ok: false, error: "Security check failed. Please reload and try again." },
        { status: 403 },
      ),
    };
  }

  return { ok: true, ip, data: payload };
}

let _resend: Resend | null = null;

export function getResend(): Resend | null {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  _resend = new Resend(key);
  return _resend;
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
