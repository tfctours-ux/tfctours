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

interface TourQuotePayload {
  passengerName: string;
  contactNumber: string;
  email: string;
  adults: number;
  children: number;
  infants: number;
  countries: Array<{
    country: string;
    hotels: Array<{
      hotelName: string;
      pricePerNight: string;
      checkIn: string;
      checkOut: string;
    }>;
  }>;
  flights: Array<{
    airline: string;
    from: string;
    to: string;
    date: string;
    time: string;
    ticketAdult: string;
    ticketChild: string;
    ticketInfant: string;
  }>;
  coupon: string;
  totalHotelNights: number;
  totalHotelCost: number;
  totalFlightCost: number;
  grandTotal: number;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function computeNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  const nights = Math.round(diff / 86_400_000);
  return nights > 0 ? nights : 0;
}

function parseAmount(value: string) {
  return Number.parseFloat(value) || 0;
}

function formatPkrAmount(value: number) {
  return value.toLocaleString("en-PK");
}

function validateTourPayload(p: unknown): string | null {
  if (!p || typeof p !== "object") {
    return "Invalid tour quotation submission.";
  }

  const payload = p as Record<string, unknown>;
  const passengerName = String(payload.passengerName ?? "").trim();
  const contactNumber = String(payload.contactNumber ?? "").replaceAll(" ", "").replaceAll("-", "");
  const email = String(payload.email ?? "").trim();
  const adults = Number(payload.adults);
  const countries = payload.countries;
  const flights = payload.flights;

  if (passengerName.length < 2) return "Please enter the passenger name.";
  if (!/^\d{10,}$/.test(contactNumber)) return "Please enter a valid contact number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
  if (!Number.isFinite(adults) || adults < 1) return "At least one adult passenger is required.";

  if (!Array.isArray(countries) || countries.length < 1) {
    return "Please add at least one country.";
  }

  for (const country of countries) {
    if (!country || typeof country !== "object") {
      return "Please add a valid country.";
    }

    const countryRecord = country as Record<string, unknown>;
    if (String(countryRecord.country ?? "").trim().length < 1) {
      return "Please select a country.";
    }

    if (!Array.isArray(countryRecord.hotels)) {
      return "Please add valid hotel entries.";
    }

    for (const hotel of countryRecord.hotels) {
      if (!hotel || typeof hotel !== "object") {
        return "Please add a valid hotel entry.";
      }

      const hotelRecord = hotel as Record<string, unknown>;
      if (String(hotelRecord.hotelName ?? "").trim().length < 1) {
        return "Please enter hotel name.";
      }
    }
  }

  if (!Array.isArray(flights) || flights.length < 1) {
    return "Please add at least one flight.";
  }

  for (const flight of flights) {
    if (!flight || typeof flight !== "object") {
      return "Please add a valid flight.";
    }

    const flightRecord = flight as Record<string, unknown>;
    if (String(flightRecord.airline ?? "").trim().length < 1) return "Please select airline.";
    if (String(flightRecord.from ?? "").trim().length < 1) return "Please select departure city.";
    if (String(flightRecord.to ?? "").trim().length < 1) return "Please select destination.";
    if (String(flightRecord.date ?? "").trim().length < 1) return "Please select date.";
  }

  return null;
}

function buildOwnerEmailHtml(payload: TourQuotePayload, shortRef: string) {
  const totalPassengers = payload.adults + payload.children + payload.infants;
  const customerRows = [
    ["Name", payload.passengerName],
    ["Contact", payload.contactNumber],
    ["Email", payload.email],
    ["Adults", String(payload.adults)],
    ["Children", String(payload.children)],
    ["Infants", String(payload.infants)],
    ["Total Passengers", String(totalPassengers)],
  ];

  const customerRowsHtml = customerRows
    .map(
      ([label, value], index) => `
        <tr style="background:${index % 2 === 0 ? "#f9f9f9" : "#ffffff"}">
          <td style="padding:12px 14px;font-weight:700;border:1px solid #ececec">${escapeHtml(label)}</td>
          <td style="padding:12px 14px;border:1px solid #ececec">${escapeHtml(value)}</td>
        </tr>
      `,
    )
    .join("");

  const countriesHtml = payload.countries
    .map((country) => {
      const hotelsHtml = country.hotels
        .map((hotel) => {
          const nights = computeNights(hotel.checkIn, hotel.checkOut);
          const cost = Math.round(nights * parseAmount(hotel.pricePerNight));

          return `
            <tr>
              <td style="padding:10px 12px;border:1px solid #ececec">${escapeHtml(hotel.hotelName)}</td>
              <td style="padding:10px 12px;border:1px solid #ececec">PKR ${formatPkrAmount(parseAmount(hotel.pricePerNight))}</td>
              <td style="padding:10px 12px;border:1px solid #ececec">${escapeHtml(hotel.checkIn)}</td>
              <td style="padding:10px 12px;border:1px solid #ececec">${escapeHtml(hotel.checkOut)}</td>
              <td style="padding:10px 12px;border:1px solid #ececec">${nights}</td>
              <td style="padding:10px 12px;border:1px solid #ececec">PKR ${formatPkrAmount(cost)}</td>
            </tr>
          `;
        })
        .join("");

      const countryCost = country.hotels.reduce((sum, hotel) => {
        const nights = computeNights(hotel.checkIn, hotel.checkOut);
        return sum + Math.round(nights * parseAmount(hotel.pricePerNight));
      }, 0);

      return `
        <div style="margin-top:20px">
          <div style="background:#f0f0f0;padding:10px 14px;font-weight:700">${escapeHtml(country.country)}</div>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <thead>
              <tr style="background:#fafafa">
                <th style="padding:10px 12px;border:1px solid #ececec;text-align:left">Hotel Name</th>
                <th style="padding:10px 12px;border:1px solid #ececec;text-align:left">Price/Night</th>
                <th style="padding:10px 12px;border:1px solid #ececec;text-align:left">Check-in</th>
                <th style="padding:10px 12px;border:1px solid #ececec;text-align:left">Check-out</th>
                <th style="padding:10px 12px;border:1px solid #ececec;text-align:left">Nights</th>
                <th style="padding:10px 12px;border:1px solid #ececec;text-align:left">Cost</th>
              </tr>
            </thead>
            <tbody>${hotelsHtml}</tbody>
          </table>
          <div style="padding:10px 14px;font-weight:700;border:1px solid #ececec;border-top:none">
            ${escapeHtml(country.country)} Total: PKR ${formatPkrAmount(countryCost)}
          </div>
        </div>
      `;
    })
    .join("");

  const flightsHtml = payload.flights
    .map((flight, index) => {
      const adultTotal = Math.round(parseAmount(flight.ticketAdult) * payload.adults);
      const childTotal = Math.round(parseAmount(flight.ticketChild) * payload.children);
      const infantTotal = Math.round(parseAmount(flight.ticketInfant) * payload.infants);
      const flightTotal = adultTotal + childTotal + infantTotal;

      return `
        <div style="margin-top:20px">
          <div style="background:#f7f7f7;padding:10px 14px;font-weight:700">
            Flight ${index + 1}: ${escapeHtml(flight.from)} &rarr; ${escapeHtml(flight.to)}
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tbody>
              <tr>
                <td style="padding:10px 12px;border:1px solid #ececec;font-weight:700">Airline</td>
                <td style="padding:10px 12px;border:1px solid #ececec">${escapeHtml(flight.airline)}</td>
                <td style="padding:10px 12px;border:1px solid #ececec;font-weight:700">Date</td>
                <td style="padding:10px 12px;border:1px solid #ececec">${escapeHtml(flight.date)}</td>
                <td style="padding:10px 12px;border:1px solid #ececec;font-weight:700">Time</td>
                <td style="padding:10px 12px;border:1px solid #ececec">${escapeHtml(flight.time || "-")}</td>
              </tr>
              <tr>
                <td style="padding:10px 12px;border:1px solid #ececec;font-weight:700">Adult Tickets (&times;${payload.adults})</td>
                <td style="padding:10px 12px;border:1px solid #ececec">PKR ${formatPkrAmount(adultTotal)}</td>
                <td style="padding:10px 12px;border:1px solid #ececec;font-weight:700">Child Tickets (&times;${payload.children})</td>
                <td style="padding:10px 12px;border:1px solid #ececec">PKR ${formatPkrAmount(childTotal)}</td>
                <td style="padding:10px 12px;border:1px solid #ececec;font-weight:700">Infant Tickets (&times;${payload.infants})</td>
                <td style="padding:10px 12px;border:1px solid #ececec">PKR ${formatPkrAmount(infantTotal)}</td>
              </tr>
              <tr>
                <td colspan="6" style="padding:12px 14px;border:1px solid #ececec;font-weight:700">
                  Flight Total: PKR ${formatPkrAmount(flightTotal)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    })
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.7;color:#111;background:#f5f5f5;padding:24px">
      <div style="max-width:900px;margin:0 auto;background:#ffffff;border:1px solid #ececec">
        <div style="background:#cc0000;padding:16px 24px">
          <h2 style="margin:0;color:#fff;font-size:20px">New Tour Package Quotation \u2014 The Flight Centre</h2>
          <p style="margin:6px 0 0;color:#fff;font-size:13px">Ref: ${escapeHtml(shortRef)}</p>
        </div>
        <div style="padding:24px">
          <h3 style="margin:0 0 12px;font-size:18px">Customer Details</h3>
          <table style="width:100%;border-collapse:collapse;font-size:14px">${customerRowsHtml}</table>

          <h3 style="margin:28px 0 12px;font-size:18px">Countries &amp; Hotels</h3>
          ${countriesHtml}
          <div style="margin-top:14px;font-weight:700">
            Total Hotel Nights: ${payload.totalHotelNights} | Total Hotel Cost: PKR ${formatPkrAmount(payload.totalHotelCost)}
          </div>

          <h3 style="margin:28px 0 12px;font-size:18px">Flights</h3>
          ${flightsHtml}
          <div style="margin-top:14px;font-weight:700">
            Total Flight Cost: PKR ${formatPkrAmount(payload.totalFlightCost)}
          </div>

          <p style="margin:28px 0 0"><strong>Coupon:</strong> ${escapeHtml(payload.coupon || "None")}</p>
        </div>
        <div style="background:#cc0000;color:#fff;padding:12px 24px">
          <div style="font-size:20px;font-weight:700">Grand Total: PKR ${formatPkrAmount(payload.grandTotal)}</div>
        </div>
        <div style="padding:16px 24px">
          <p style="margin:0;color:#666;font-size:12px">Final pricing subject to availability. Ref: ${escapeHtml(shortRef)}</p>
        </div>
        <div style="padding:0 24px 24px;color:#666;font-size:12px">
          The Flight Centre Travel &amp; Tours | UAN: 111-786-788 | info@tfctours.com.pk
        </div>
      </div>
    </div>
  `;
}

function buildCustomerEmailHtml(payload: TourQuotePayload, shortRef: string) {
  const destinations = payload.countries.map((country) => country.country).join(", ");

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.7;color:#111;background:#f5f5f5;padding:24px">
      <div style="max-width:760px;margin:0 auto;background:#fff;border:1px solid #ececec">
        <div style="background:#cc0000;padding:18px 24px;color:#fff">
          <h2 style="margin:0;font-size:22px">The Flight Centre Travel &amp; Tours</h2>
        </div>
        <div style="padding:24px">
          <p style="margin-top:0">Dear ${escapeHtml(payload.passengerName)},</p>
          <p>
            Thank you for requesting a tour package quotation with The Flight Centre.
            We have received your details and our travel team will contact you within 2 business hours.
          </p>

          <div style="margin:24px 0;border-radius:16px;background:#c9a84c;color:#111;padding:16px 18px;font-weight:700">
            Your Reference Number: ${escapeHtml(shortRef)}
          </div>

          <h3 style="margin:0 0 12px;font-size:18px">Quotation Summary</h3>
          <p style="margin:6px 0"><strong>Passengers:</strong> ${payload.adults} Adults, ${payload.children} Children, ${payload.infants} Infants</p>
          <p style="margin:6px 0"><strong>Destinations:</strong> ${escapeHtml(destinations)}</p>
          <p style="margin:6px 0"><strong>Total Hotel Nights:</strong> ${payload.totalHotelNights}</p>
          <p style="margin:6px 0"><strong>Total Hotel Cost:</strong> PKR ${payload.totalHotelCost.toLocaleString("en-PK")}</p>
          <p style="margin:6px 0"><strong>Total Flight Cost:</strong> PKR ${payload.totalFlightCost.toLocaleString("en-PK")}</p>
          <p style="margin:10px 0 6px;font-size:20px;font-weight:700"><strong>Grand Total:</strong> PKR ${payload.grandTotal.toLocaleString("en-PK")}</p>
          <p style="margin:6px 0"><strong>Coupon:</strong> ${escapeHtml(payload.coupon || "Not applied")}</p>

          <h3 style="margin:28px 0 12px;font-size:18px">What happens next</h3>
          <ol style="margin:0;padding-left:22px">
            <li>Our travel specialist will call you at ${escapeHtml(payload.contactNumber)} within 2 business hours.</li>
            <li>We&apos;ll confirm hotel availability and exact pricing.</li>
            <li>Flights will be checked and the best fares presented.</li>
            <li>Once confirmed, we&apos;ll proceed with your booking.</li>
          </ol>

          <h3 style="margin:28px 0 12px;font-size:18px">Contact us</h3>
          <p style="margin:6px 0"><strong>Phone / UAN:</strong> 111-786-788</p>
          <p style="margin:6px 0"><strong>WhatsApp:</strong> 0304-111-9-786</p>
          <p style="margin:6px 0"><strong>Email:</strong> info@tfctours.com.pk</p>
          <p style="margin:6px 0"><strong>Main Office:</strong> Office 36-37, Jinnah Stadium, Gujranwala</p>
          <p style="margin:6px 0"><strong>Branch Office:</strong> Plaza 18, Neelum Block DC Colony, Gujranwala</p>

          <p style="margin:28px 0 0;color:#666;font-size:12px">
            This is an estimated quotation. Final pricing will be confirmed by The Flight Centre
            team based on availability at time of booking.
          </p>
        </div>
        <div style="padding:0 24px 24px;color:#666;font-size:12px">
          &copy; The Flight Centre Travel &amp; Tours &middot; www.tfctours.com.pk
        </div>
      </div>
    </div>
  `;
}

// Handler
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

    let payloadRaw: unknown;

    try {
      payloadRaw = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid tour quotation submission." },
        { status: 400 },
      );
    }

    const payload = payloadRaw as TourQuotePayload;
    const validationError = validateTourPayload(payload);

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

    const shortRef = `TFC-T-${Date.now().toString(36).toUpperCase()}`;
    const from = process.env.RESEND_FROM_EMAIL ?? "The Flight Centre <no-reply@tfctours.com.pk>";
    const ownerTo = process.env.QUOTATION_OWNER_EMAIL ?? BRAND.email;

    await resend.emails.send({
      from,
      to: ownerTo,
      replyTo: payload.email,
      subject: `\u2708 Tour Quote \u2014 ${payload.passengerName} | ${payload.adults}A ${payload.children}C | Ref: ${shortRef}`,
      html: buildOwnerEmailHtml(payload, shortRef),
    });

    await resend.emails.send({
      from,
      to: payload.email,
      replyTo: BRAND.email,
      subject: `Your Tour Package Quotation \u2014 The Flight Centre | Ref: ${shortRef}`,
      html: buildCustomerEmailHtml(payload, shortRef),
    });

    return NextResponse.json({
      ok: true,
      message: "Your tour quotation request has been sent successfully.",
      referenceId: shortRef,
    });
  } catch (error) {
    console.error("Tour quote route error", error);
    return NextResponse.json(
      { ok: false, error: "Unable to process tour quote request" },
      { status: 500 },
    );
  }
}
