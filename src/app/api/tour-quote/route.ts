// src/app/api/tour-quote/route.ts
import { NextRequest, NextResponse } from "next/server";

import { getResend, withProtection } from "@/lib/api-utils";
import { computeTourTotals } from "@/lib/calculator-server";
import { BRAND } from "@/lib/constants";
import {
  buildTourOwnerEmail,
  buildTourCustomerEmail,
} from "@/lib/email/tour-quote-templates";
import { tourQuoteSchema, type TourQuotePayload } from "@/lib/schemas/tour-quote";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const result = await withProtection<TourQuotePayload>(request, tourQuoteSchema);
    if (!result.ok) return result.response;

    const { data: payload } = result;
    const totals = computeTourTotals(payload);

    const resend = getResend();
    if (!resend) {
      return NextResponse.json(
        { ok: false, error: "Email delivery is not configured." },
        { status: 503 },
      );
    }

    const shortRef = `TFC-T-${Date.now().toString(36).toUpperCase()}`;
    const from = process.env.RESEND_FROM_EMAIL ?? "The Flight Centre <no-reply@tfctours.com.pk>";
    const ownerTo = process.env.QUOTATION_OWNER_EMAIL ?? BRAND.email;

    await resend.emails.send({
      from,
      to: ownerTo,
      replyTo: payload.email,
      subject: `✈ Tour Quote — ${payload.passengerName} | ${payload.adults}A ${payload.children}C | Ref: ${shortRef}`,
      html: buildTourOwnerEmail(payload, totals, shortRef),
    });

    await resend.emails.send({
      from,
      to: payload.email,
      replyTo: BRAND.email,
      subject: `Your Tour Package Quotation — The Flight Centre | Ref: ${shortRef}`,
      html: buildTourCustomerEmail(payload, totals, shortRef),
    });

    return NextResponse.json({
      ok: true,
      message: "Your tour quotation request has been sent successfully.",
      referenceId: shortRef,
    });
  } catch (error) {
    console.error({ action: "tour_quote_route_error", error });
    return NextResponse.json(
      { ok: false, error: "Unable to process tour quote request" },
      { status: 500 },
    );
  }
}
