// src/lib/email/umrah-quote-templates.ts
import { escapeHtml } from "@/lib/api-utils";
import { computeUmrahTotals } from "@/lib/calculator-server";
import { umrahQuoteSchema } from "@/lib/schemas/umrah-quote";
import { emailHeader, emailFooter, emailWrapper, pkr } from "./chrome";

type UmrahPayload = ReturnType<typeof umrahQuoteSchema.parse>;
type UmrahTotals = ReturnType<typeof computeUmrahTotals>;
type QuoteHotel = UmrahPayload["makkahHotels"][number];

function computeNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  const nights = Math.round(ms / 86_400_000);
  return nights > 0 ? nights : 0;
}

function renderRows(rows: Array<{ label: string; value: string | number }>) {
  return rows
    .map(
      (row, index) => `
        <tr style="background:${index % 2 === 0 ? "#f9f9f9" : "#fff"}">
          <td style="padding:10px 14px;font-weight:700;width:40%;border:1px solid #eee;">${escapeHtml(row.label)}</td>
          <td style="padding:10px 14px;border:1px solid #eee;">${escapeHtml(String(row.value))}</td>
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

export function buildUmrahOwnerEmail(
  payload: UmrahPayload,
  totals: UmrahTotals,
  shortRef: string,
) {
  const totalPassengers = payload.adults + payload.children + payload.infants;

  const innerHtml = `
    ${emailHeader("New Umrah Quotation Request - The Flight Centre")}
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

      ${renderHotels("Makkah Hotels", payload.makkahHotels, totals.makkahNights)}
      ${renderHotels("Madinah Hotels", payload.madinahHotels, totals.madinahNights)}

      ${renderTable("Transport & Pricing", [
        { label: "Transport Package", value: payload.transportVisa },
        { label: "Transport SAR", value: totals.transportSAR },
        { label: "Transport PKR", value: pkr(totals.transportPKR) },
        { label: "Exchange Rate", value: `1 SAR = ${payload.exchangeRate} PKR` },
        { label: "Ticket per Adult", value: payload.ticketAdult || "0" },
        { label: "Ticket per Child", value: payload.ticketChild || "0" },
        { label: "Ticket per Infant", value: payload.ticketInfant || "0" },
        { label: "Total Ticket Cost", value: pkr(totals.ticketGrandTotal) },
        { label: "Coupon Code", value: payload.coupon || "None" },
      ])}

      <div style="margin-top:24px;padding:16px;border-radius:16px;background:#f3f3f3;color:#444;">
        Hotel pricing to be confirmed separately. Reference: ${escapeHtml(shortRef)}
      </div>
    </div>
    ${emailFooter()}
  `;

  return emailWrapper(innerHtml, 760);
}

export function buildUmrahCustomerEmail(
  payload: UmrahPayload,
  totals: UmrahTotals,
  shortRef: string,
) {
  const innerHtml = `
    ${emailHeader("The Flight Centre Travel &amp; Tours")}
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
            { label: "Makkah / Madinah", value: `${totals.makkahNights} Nights | ${totals.madinahNights} Nights` },
            { label: "Transport", value: payload.transportVisa },
            { label: "Ticket Total", value: pkr(totals.ticketGrandTotal) },
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
    ${emailFooter()}
  `;

  return emailWrapper(innerHtml, 700);
}
