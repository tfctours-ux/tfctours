// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

import { getResend, withProtection } from "@/lib/api-utils";
import { BRAND } from "@/lib/constants";
import { buildContactOwnerEmail } from "@/lib/email/contact-template";
import { contactSchema, type ContactPayload } from "@/lib/schemas/contact";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const result = await withProtection<ContactPayload>(request, contactSchema);
    if (!result.ok) return result.response;

    const { data: payload } = result;

    const resend = getResend();
    if (!resend) {
      return NextResponse.json(
        { ok: false, error: "Email delivery is not configured." },
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
      html: buildContactOwnerEmail(payload),
    });

    return NextResponse.json({ ok: true, message: "Your enquiry has been sent successfully." });
  } catch (error) {
    console.error({ action: "contact_route_error", error });
    return NextResponse.json(
      { ok: false, error: "Unable to process contact request" },
      { status: 500 },
    );
  }
}
