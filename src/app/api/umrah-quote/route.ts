// src/app/api/umrah-quote/route.ts
import { NextRequest, NextResponse } from "next/server";

import { getResend, withProtection } from "@/lib/api-utils";
import { computeUmrahTotals } from "@/lib/calculator-server";
import { BRAND } from "@/lib/constants";
import { getTransportOptions } from "@/lib/cms/fetchers";
import {
  buildUmrahOwnerEmail,
  buildUmrahCustomerEmail,
} from "@/lib/email/umrah-quote-templates";
import { umrahQuoteSchema, type UmrahQuotePayload } from "@/lib/schemas/umrah-quote";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const result = await withProtection<UmrahQuotePayload>(request, umrahQuoteSchema);
    if (!result.ok) return result.response;

    const { data: payload } = result;
    const dbTransport = await getTransportOptions("en");
    const transportOptions = dbTransport?.map((option) => ({
      label: option.label,
      sar: option.sarRate,
    }));
    const totals = computeUmrahTotals(payload, transportOptions);

    const resend = getResend();
    if (!resend) {
      return NextResponse.json(
        { ok: false, error: "Email delivery is not configured." },
        { status: 503 },
      );
    }

    const shortRef = `TFC-${Date.now().toString(36).toUpperCase()}`;
    const from = process.env.RESEND_FROM_EMAIL ?? "The Flight Centre <no-reply@tfctours.com.pk>";
    const ownerTo = process.env.QUOTATION_OWNER_EMAIL ?? BRAND.email;

    await resend.emails.send({
      from,
      to: ownerTo,
      replyTo: payload.email,
      subject: `🕋 Umrah Quote — ${payload.passengerName} | ${payload.adults}A ${payload.children}C ${payload.infants}I | Ref: ${shortRef}`,
      html: buildUmrahOwnerEmail(payload, totals, shortRef),
    });

    await resend.emails.send({
      from,
      to: payload.email,
      replyTo: BRAND.email,
      subject: `Your Umrah Quotation — The Flight Centre | Ref: ${shortRef}`,
      html: buildUmrahCustomerEmail(payload, totals, shortRef),
    });

    return NextResponse.json({
      ok: true,
      message: "Your Umrah quotation request has been sent successfully.",
      referenceId: shortRef,
    });
  } catch (error) {
    console.error({ action: "umrah_quote_route_error", error });
    return NextResponse.json(
      { ok: false, error: "Unable to process quotation request" },
      { status: 500 },
    );
  }
}
