import { NextRequest, NextResponse } from "next/server";

import { Resend } from "resend";

import { BRAND } from "@/lib/constants";

interface UmrahQuotePayload {
  passengerName: string;
  contactNumber: string;
  email: string;
  adults: number;
  children: number;
  infants: number;
  departureFlight: { airline: string; from: string; to: string; date: string; time: string };
  returnFlight: { airline: string; from: string; to: string; date: string; time: string };
  makkahHotels: Array<{
    roomType: string;
    hotelName: string;
    rooms: number;
    checkIn: string;
    checkOut: string;
  }>;
  madinahHotels: Array<{
    roomType: string;
    hotelName: string;
    rooms: number;
    checkIn: string;
    checkOut: string;
  }>;
  transportVisa: string;
  coupon: string;
  ticketAdult: string;
  ticketChild: string;
  ticketInfant: string;
  exchangeRate: string;
  makkahNights: number;
  madinahNights: number;
  transportSAR: number;
  transportPKR: number;
  ticketGrandTotal: number;
}

type QuoteHotel = UmrahQuotePayload["makkahHotels"][number];

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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeFlightLeg(value: unknown): UmrahQuotePayload["departureFlight"] {
  const flight = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  return {
    airline: String(flight.airline ?? "").trim(),
    from: String(flight.from ?? "").trim(),
    to: String(flight.to ?? "").trim(),
    date: String(flight.date ?? "").trim(),
    time: String(flight.time ?? "").trim(),
  };
}

function normalizeHotels(value: unknown): QuoteHotel[] {
  if (!Array.isArray(value)) return [];

  return value.map((hotel) => {
    const item = hotel && typeof hotel === "object" ? (hotel as Record<string, unknown>) : {};
    return {
      roomType: String(item.roomType ?? "").trim(),
      hotelName: String(item.hotelName ?? "").trim(),
      rooms: Number(item.rooms ?? 0),
      checkIn: String(item.checkIn ?? "").trim(),
      checkOut: String(item.checkOut ?? "").trim(),
    };
  });
}

function normalizePayload(payload: unknown): UmrahQuotePayload | null {
  if (!payload || typeof payload !== "object") return null;

  const value = payload as Record<string, unknown>;

  return {
    passengerName: String(value.passengerName ?? "").trim(),
    contactNumber: String(value.contactNumber ?? "").trim(),
    email: String(value.email ?? "").trim(),
    adults: Number(value.adults ?? 0),
    children: Number(value.children ?? 0),
    infants: Number(value.infants ?? 0),
    departureFlight: normalizeFlightLeg(value.departureFlight),
    returnFlight: normalizeFlightLeg(value.returnFlight),
    makkahHotels: normalizeHotels(value.makkahHotels),
    madinahHotels: normalizeHotels(value.madinahHotels),
    transportVisa: String(value.transportVisa ?? "").trim(),
    coupon: String(value.coupon ?? "").trim(),
    ticketAdult: String(value.ticketAdult ?? "").trim(),
    ticketChild: String(value.ticketChild ?? "").trim(),
    ticketInfant: String(value.ticketInfant ?? "").trim(),
    exchangeRate: String(value.exchangeRate ?? "").trim(),
    makkahNights: Number(value.makkahNights ?? 0),
    madinahNights: Number(value.madinahNights ?? 0),
    transportSAR: Number(value.transportSAR ?? 0),
    transportPKR: Number(value.transportPKR ?? 0),
    ticketGrandTotal: Number(value.ticketGrandTotal ?? 0),
  };
}

function validateQuotePayload(payload: UmrahQuotePayload): string | null {
  if (payload.passengerName.trim().length < 2) return "Please enter the passenger name.";
  if (payload.contactNumber.replace(/\D/g, "").length < 10) return "Please enter a valid contact number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return "Please enter a valid email address.";
  if (!Number.isFinite(payload.adults) || payload.adults < 1) return "At least one adult passenger is required.";

  if (
    !payload.departureFlight.airline ||
    !payload.departureFlight.from ||
    !payload.departureFlight.to ||
    !payload.departureFlight.date
  ) {
    return "Please complete the departure flight details.";
  }

  if (
    !payload.returnFlight.airline ||
    !payload.returnFlight.from ||
    !payload.returnFlight.to ||
    !payload.returnFlight.date
  ) {
    return "Please complete the return flight details.";
  }

  if (payload.makkahHotels.length < 1 || payload.makkahHotels.some((hotel) => !hotel.hotelName)) {
    return "Please add at least one Makkah hotel.";
  }

  if (payload.madinahHotels.length < 1 || payload.madinahHotels.some((hotel) => !hotel.hotelName)) {
    return "Please add at least one Madinah hotel.";
  }

  if (!payload.transportVisa) return "Please select a transport and visa package.";
  if ((Number.parseFloat(payload.exchangeRate) || 0) <= 0) return "Please enter a valid exchange rate.";

  return null;
}

function computeNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  const nights = Math.round(ms / 86_400_000);
  return nights > 0 ? nights : 0;
}

function formatPKR(amount: number) {
  return `PKR ${amount.toLocaleString("en-PK")}`;
}

function renderRows(rows: Array<{ label: string; value: string | number }>) {
  return rows
    .map(
      (row, index) => `
        <tr style="background:${index % 2 === 0 ? "#f9f9f9" : "#fff"}">
          <td style="padding:10px 14px;font-weight:700;width:40%;">${escapeHtml(row.label)}</td>
          <td style="padding:10px 14px;">${escapeHtml(String(row.value))}</td>
        </tr>
      `,
    )
    .join("");
}

function renderTable(title: string, rows: Array<{ label: string; value: string | number }>) {
  return `
    <div style="margin-top:24px">
      <h3 style="margin:0 0 12px;color:#cc0000;font-size:14px;letter-spacing:0.16em;text-transform:uppercase;">${escapeHtml(title)}</h3>
      <table style="width:100%;border-collapse:collapse;border:1px solid #eee;border-radius:16px;overflow:hidden;">
        <tbody>
          ${renderRows(rows)}
        </tbody>
      </table>
    </div>
  `;
}

function renderHotels(title: string, hotels: QuoteHotel[], totalNights: number) {
  const content = hotels
    .map(
      (hotel, index) => `
        <div style="margin-top:${index === 0 ? 0 : 18}px;padding:16px;border:1px solid #eee;border-radius:16px;background:#fff;">
          <p style="margin:0 0 10px;color:#666;font-size:12px;font-weight:700;">Hotel ${index + 1}</p>
          <table style="width:100%;border-collapse:collapse;">
            <tbody>
              ${renderRows([
                { label: "Hotel Name", value: hotel.hotelName || "-" },
                { label: "Room Type", value: hotel.roomType || "-" },
                { label: "Rooms", value: hotel.rooms },
                { label: "Check-in", value: hotel.checkIn || "-" },
                { label: "Check-out", value: hotel.checkOut || "-" },
                { label: "Nights", value: `${computeNights(hotel.checkIn, hotel.checkOut)} nights` },
              ])}
            </tbody>
          </table>
        </div>
      `,
    )
    .join("");

  return `
    <div style="margin-top:24px">
      <h3 style="margin:0 0 12px;color:#cc0000;font-size:14px;letter-spacing:0.16em;text-transform:uppercase;">${escapeHtml(title)}</h3>
      ${content}
      <p style="margin:12px 0 0;font-weight:700;color:#111;">Total ${escapeHtml(title)} Nights: ${escapeHtml(String(totalNights))} Nights</p>
    </div>
  `;
}

export const runtime = "nodejs";

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
        { ok: false, error: "Invalid quotation submission." },
        { status: 400 },
      );
    }

    const validationError = validateQuotePayload(payload);
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

    const shortRef = `TFC-${Date.now().toString(36).toUpperCase()}`;
    const from = process.env.RESEND_FROM_EMAIL ?? "The Flight Centre <no-reply@tfctours.com.pk>";
    const ownerTo = process.env.QUOTATION_OWNER_EMAIL ?? BRAND.email;
    const totalPassengers = payload.adults + payload.children + payload.infants;

    const ownerHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.7;color:#111;background:#f4f4f4;padding:24px;">
        <div style="max-width:760px;margin:0 auto;background:#fff;border-radius:24px;overflow:hidden;border:1px solid #eee;">
          <div style="background:#cc0000;padding:18px 24px;">
            <h2 style="margin:0;color:#fff;font-size:20px;">New Umrah Quotation Request - The Flight Centre</h2>
          </div>
          <div style="padding:24px;">
            <p style="margin:0 0 20px;color:#c9a84c;font-weight:700;font-size:15px;">Ref: ${escapeHtml(shortRef)}</p>

            ${renderTable("Customer Details", [
              { label: "Name", value: payload.passengerName },
              { label: "Contact", value: payload.contactNumber },
              { label: "Email", value: payload.email },
              { label: "Adults", value: payload.adults },
              { label: "Children", value: payload.children },
              { label: "Infants", value: payload.infants },
              { label: "Total Passengers", value: totalPassengers },
            ])}

            ${renderTable("Departure Flight", [
              { label: "Airline", value: payload.departureFlight.airline },
              { label: "From", value: payload.departureFlight.from },
              { label: "To", value: payload.departureFlight.to },
              { label: "Date", value: payload.departureFlight.date },
              { label: "Time", value: payload.departureFlight.time || "-" },
            ])}

            ${renderTable("Return Flight", [
              { label: "Airline", value: payload.returnFlight.airline },
              { label: "From", value: payload.returnFlight.from },
              { label: "To", value: payload.returnFlight.to },
              { label: "Date", value: payload.returnFlight.date },
              { label: "Time", value: payload.returnFlight.time || "-" },
            ])}

            ${renderHotels("Makkah Hotels", payload.makkahHotels, payload.makkahNights)}
            ${renderHotels("Madinah Hotels", payload.madinahHotels, payload.madinahNights)}

            ${renderTable("Transport & Pricing", [
              { label: "Transport Package", value: payload.transportVisa },
              { label: "Transport SAR", value: payload.transportSAR },
              { label: "Transport PKR", value: formatPKR(payload.transportPKR) },
              { label: "Exchange Rate", value: `1 SAR = ${payload.exchangeRate} PKR` },
              { label: "Ticket per Adult", value: payload.ticketAdult || "0" },
              { label: "Ticket per Child", value: payload.ticketChild || "0" },
              { label: "Ticket per Infant", value: payload.ticketInfant || "0" },
              { label: "Total Ticket Cost", value: formatPKR(payload.ticketGrandTotal) },
              { label: "Coupon Code", value: payload.coupon || "None" },
            ])}

            <div style="margin-top:24px;padding:16px;border-radius:16px;background:#f3f3f3;color:#444;">
              Hotel pricing to be confirmed separately. Reference: ${escapeHtml(shortRef)}
            </div>
          </div>
          <div style="padding:16px 24px;border-top:1px solid #eee;color:#666;font-size:13px;">
            The Flight Centre Travel & Tours | UAN: 111-786-788 | info@tfctours.com.pk
          </div>
        </div>
      </div>
    `;

    const customerHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.7;color:#111;background:#f4f4f4;padding:24px;">
        <div style="max-width:700px;margin:0 auto;background:#fff;border-radius:24px;overflow:hidden;border:1px solid #eee;">
          <div style="background:#cc0000;padding:18px 24px;">
            <h2 style="margin:0;color:#fff;font-size:20px;">The Flight Centre Travel & Tours</h2>
          </div>
          <div style="padding:24px;">
            <p style="margin:0 0 10px;">Assalamu Alaikum, ${escapeHtml(payload.passengerName)},</p>
            <p style="margin:0 0 18px;color:#444;">
              Thank you for requesting an Umrah quotation. We have received your details and our Umrah team will contact you within 2 hours.
            </p>

            <div style="margin:0 0 24px;padding:14px 18px;border-radius:16px;background:#c9a84c;color:#111;font-weight:700;">
              Your Reference: ${escapeHtml(shortRef)}
            </div>

            <h3 style="margin:0 0 12px;color:#cc0000;font-size:14px;letter-spacing:0.16em;text-transform:uppercase;">Your Quote Summary</h3>
            <table style="width:100%;border-collapse:collapse;border:1px solid #eee;border-radius:16px;overflow:hidden;">
              <tbody>
                ${renderRows([
                  { label: "Duration", value: `Departure ${payload.departureFlight.date} -> Return ${payload.returnFlight.date}` },
                  { label: "Passengers", value: `${payload.adults} Adults, ${payload.children} Children, ${payload.infants} Infants` },
                  { label: "Makkah / Madinah", value: `${payload.makkahNights} Nights | ${payload.madinahNights} Nights` },
                  { label: "Transport", value: payload.transportVisa },
                  { label: "Ticket Total", value: formatPKR(payload.ticketGrandTotal) },
                ])}
              </tbody>
            </table>

            <div style="margin-top:24px;">
              <h3 style="margin:0 0 12px;color:#cc0000;font-size:14px;letter-spacing:0.16em;text-transform:uppercase;">What happens next</h3>
              <ol style="margin:0;padding-left:18px;color:#444;">
                <li>Our Umrah specialist will call you at ${escapeHtml(payload.contactNumber)} within 2 hours</li>
                <li>We'll share final hotel pricing and availability</li>
                <li>Confirm and proceed with booking</li>
              </ol>
            </div>

            <div style="margin-top:24px;">
              <h3 style="margin:0 0 12px;color:#cc0000;font-size:14px;letter-spacing:0.16em;text-transform:uppercase;">Contact</h3>
              <p style="margin:0;color:#444;">Phone / WhatsApp: 0304-111-9-786</p>
              <p style="margin:4px 0 0;color:#444;">UAN: 111-786-788</p>
              <p style="margin:4px 0 0;color:#444;">Email: info@tfctours.com.pk</p>
              <p style="margin:4px 0 0;color:#444;">Main Office: Office 36-37, Jinnah Stadium, Gujranwala</p>
              <p style="margin:4px 0 0;color:#444;">Branch Office: Plaza 18, Neelum Block DC Colony, Gujranwala</p>
            </div>
          </div>
          <div style="padding:16px 24px;border-top:1px solid #eee;color:#666;font-size:13px;">
            <p style="margin:0;">&copy; The Flight Centre Travel & Tours &middot; www.tfctours.com.pk</p>
            <p style="margin:6px 0 0;">Hotel accommodation pricing will be confirmed separately based on availability.</p>
          </div>
        </div>
      </div>
    `;

    await resend.emails.send({
      from,
      to: ownerTo,
      replyTo: payload.email,
      subject: `\u{1F54B} Umrah Quote \u2014 ${payload.passengerName} | ${payload.adults}A ${payload.children}C ${payload.infants}I | Ref: ${shortRef}`,
      html: ownerHtml,
    });

    await resend.emails.send({
      from,
      to: payload.email,
      replyTo: BRAND.email,
      subject: `Your Umrah Quotation \u2014 The Flight Centre | Ref: ${shortRef}`,
      html: customerHtml,
    });

    return NextResponse.json({
      ok: true,
      message: "Your Umrah quotation request has been sent successfully.",
      referenceId: shortRef,
    });
  } catch (error) {
    console.error("Umrah quote route error", error);
    return NextResponse.json(
      { ok: false, error: "Unable to process quotation request" },
      { status: 500 },
    );
  }
}
