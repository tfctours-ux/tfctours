// src/lib/turnstile.ts
interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile(
  token: string | undefined,
  remoteIp: string,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // If no secret configured, fail closed in production, open in dev
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      return { ok: false, reason: "turnstile_not_configured" };
    }
    console.warn({ action: "turnstile_verify", note: "secret_missing_dev_mode_skip" });
    return { ok: true };
  }

  if (!token) {
    return { ok: false, reason: "missing_token" };
  }

  try {
    const body = new URLSearchParams();
    body.set("secret", secret);
    body.set("response", token);
    if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp);

    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const data = (await res.json()) as TurnstileVerifyResponse;
    if (data.success) return { ok: true };
    return { ok: false, reason: (data["error-codes"] ?? ["unknown"]).join(",") };
  } catch (error) {
    console.error({ action: "turnstile_verify", error });
    return { ok: false, reason: "verify_failed" };
  }
}
