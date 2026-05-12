import { NextRequest, NextResponse } from "next/server";

import { Resend } from "resend";

import { BRAND } from "@/lib/constants";

// Rate limiter (in-memory, per cold-start)
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5;            // max 5 submissions per IP per window

const ipHits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);

  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

// Singleton - created once per cold-start
let _resend: Resend | null = null;

function getResend(): Resend | null {
  if (_resend) return _resend;

  const key = process.env.RESEND_API_KEY;
  if (!key) return null;

  _resend = new Resend(key);
  return _resend;
}

// Types & validation
interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

function normalizePayload(payload: unknown): ContactPayload | null {
  if (!payload || typeof payload !== "object") return null;

  const c = payload as Record<string, unknown>;
  return {
    name: String(c.name ?? "").trim(),
    phone: String(c.phone ?? "").trim(),
    email: String(c.email ?? "").trim(),
    service: String(c.service ?? "").trim(),
    message: String(c.message ?? "").trim(),
  };
}

function validatePayload(p: ContactPayload): string | null {
  if (p.name.length < 2) return "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) return "Please enter a valid email address.";
  if (p.phone.length < 7) return "Please enter a valid phone number.";
  if (p.service.length < 2) return "Please select the required service.";
  if (p.message.length < 10) return "Please add a short message with your travel or visa requirement.";
  return null;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Handler
export const runtime = "nodejs";

/**
 * @env RESEND_API_KEY     — Resend SDK key (required; route returns 503 if absent)
 * @env RESEND_FROM_EMAIL  — Verified sender address (optional; falls back to no-reply@tfctours.com.pk)
 * @env CONTACT_TO_EMAIL   — Recipient inbox (optional; falls back to BRAND.email)
 * @body { name: string, phone: string, email: string, service: string, message: string }
 * @returns 200 { ok: true, message: string }
 * @returns 400 { ok: false, error: string } — validation failure
 * @returns 429 { ok: false, error: string } — rate limit exceeded
 * @returns 503 { ok: false, error: string } — RESEND_API_KEY not configured
 * @returns 500 { ok: false, error: string } — unexpected server error
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limit by IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please wait a minute before trying again." },
        { status: 429 },
      );
    }

    const payload = normalizePayload(await request.json());

    if (!payload) {
      return NextResponse.json(
        { ok: false, error: "Invalid contact form submission." },
        { status: 400 },
      );
    }

    const validationError = validatePayload(payload);
    if (validationError) {
      return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
    }

    const resend = getResend();
    if (!resend) {
      return NextResponse.json(
        { ok: false, error: "Email delivery is not configured. Add RESEND_API_KEY to environment." },
        { status: 503 },
      );
    }

    const from = process.env.RESEND_FROM_EMAIL ?? "The Flight Centre <no-reply@tfctours.com.pk>";
    const to = process.env.CONTACT_TO_EMAIL ?? BRAND.email;

    await resend.emails.send({
      from,
      to,
      replyTo: payload.email,
      subject: `New website enquiry: ${payload.service} / ${payload.name}`,
      text: [
        `Name: ${payload.name}`,
        `Phone: ${payload.phone}`,
        `Email: ${payload.email}`,
        `Service: ${payload.service}`,
        "",
        payload.message,
      ].join("\n"),
      html: `
      <div style="font-family:Arial,sans-serif;line-height:1.7;color:#111">
        <div style="background:#cc0000;padding:16px 24px">
          <h2 style="margin:0;color:#fff;font-size:18px">New Website Enquiry - The Flight Centre</h2>
        </div>
        <div style="padding:24px">
          <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
          <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
          <p><strong>Service:</strong> ${escapeHtml(payload.service)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(payload.message).replaceAll("\n", "<br />")}</p>
        </div>
      </div>
    `,
    });

    return NextResponse.json({ ok: true, message: "Your enquiry has been sent successfully." });
  } catch (error) {
    console.error("Contact route error", error);
    return NextResponse.json(
      { ok: false, error: "Unable to process contact request" },
      { status: 500 },
    );
  }
}
