// src/lib/email/tour-quote-templates.ts
import { escapeHtml } from "@/lib/api-utils";
import { computeTourTotals } from "@/lib/calculator-server";
import { computeNights } from "@/lib/calculator-utils";
import { tourQuoteSchema } from "@/lib/schemas/tour-quote";
import { emailHeader, emailFooter, emailWrapper, kvRowsHtml, pkr } from "./chrome";

function parseAmount(value: string) {
  return Number.parseFloat(value) || 0;
}

export function buildTourOwnerEmail(
  payload: ReturnType<typeof tourQuoteSchema.parse>,
  totals: ReturnType<typeof computeTourTotals>,
  shortRef: string,
) {
  const totalPassengers = payload.adults + payload.children + payload.infants;
  const customerRows: Array<[string, string]> = [
    ["Name", payload.passengerName],
    ["Contact", payload.contactNumber],
    ["Email", payload.email],
    ["Adults", String(payload.adults)],
    ["Children", String(payload.children)],
    ["Infants", String(payload.infants)],
    ["Total Passengers", String(totalPassengers)],
  ];

  const countriesHtml = payload.countries
    .map((country) => {
      const hotelsHtml = country.hotels
        .map((hotel) => {
          const nights = computeNights(hotel.checkIn, hotel.checkOut);
          const cost = Math.round(nights * parseAmount(hotel.pricePerNight));

          return `
            <tr>
              <td style="padding:10px 12px;border:1px solid #ececec">${escapeHtml(hotel.hotelName)}</td>
              <td style="padding:10px 12px;border:1px solid #ececec">${pkr(parseAmount(hotel.pricePerNight))}</td>
              <td style="padding:10px 12px;border:1px solid #ececec">${escapeHtml(hotel.checkIn)}</td>
              <td style="padding:10px 12px;border:1px solid #ececec">${escapeHtml(hotel.checkOut)}</td>
              <td style="padding:10px 12px;border:1px solid #ececec">${nights}</td>
              <td style="padding:10px 12px;border:1px solid #ececec">${pkr(cost)}</td>
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
            ${escapeHtml(country.country)} Total: ${pkr(countryCost)}
          </div>
        </div>
      `;
    })
    .join("");

  const flightsHtml = payload.flights
    .map((flight, index) => {
      const adultTotal = Math.round(parseAmount(flight.ticketAdult) * payload.adults);
      const childTotal = Math.round(parseAmount(flight.ticketChild ?? "0") * payload.children);
      const infantTotal = Math.round(parseAmount(flight.ticketInfant ?? "0") * payload.infants);
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
                <td style="padding:10px 12px;border:1px solid #ececec">${pkr(adultTotal)}</td>
                <td style="padding:10px 12px;border:1px solid #ececec;font-weight:700">Child Tickets (&times;${payload.children})</td>
                <td style="padding:10px 12px;border:1px solid #ececec">${pkr(childTotal)}</td>
                <td style="padding:10px 12px;border:1px solid #ececec;font-weight:700">Infant Tickets (&times;${payload.infants})</td>
                <td style="padding:10px 12px;border:1px solid #ececec">${pkr(infantTotal)}</td>
              </tr>
              <tr>
                <td colspan="6" style="padding:12px 14px;border:1px solid #ececec;font-weight:700">
                  Flight Total: ${pkr(flightTotal)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    })
    .join("");

  const innerHtml = `
    ${emailHeader("New Tour Package Quotation \u2014 The Flight Centre", `Ref: ${escapeHtml(shortRef)}`)}
    <div style="padding:24px">
      <h3 style="margin:0 0 12px;font-size:18px">Customer Details</h3>
      <table style="width:100%;border-collapse:collapse;font-size:14px">${kvRowsHtml(customerRows)}</table>

      <h3 style="margin:28px 0 12px;font-size:18px">Countries &amp; Hotels</h3>
      ${countriesHtml}
      <div style="margin-top:14px;font-weight:700">
        Total Hotel Nights: ${totals.totalHotelNights} | Total Hotel Cost: ${pkr(totals.totalHotelCost)}
      </div>

      <h3 style="margin:28px 0 12px;font-size:18px">Flights</h3>
      ${flightsHtml}
      <div style="margin-top:14px;font-weight:700">
        Total Flight Cost: ${pkr(totals.totalFlightCost)}
      </div>

      <p style="margin:28px 0 0"><strong>Coupon:</strong> ${escapeHtml(payload.coupon || "None")}</p>
    </div>
    <div style="background:#cc0000;color:#fff;padding:12px 24px">
      <div style="font-size:20px;font-weight:700">Grand Total: ${pkr(totals.grandTotal)}</div>
    </div>
    <div style="padding:16px 24px">
      <p style="margin:0;color:#666;font-size:12px">Final pricing subject to availability. Ref: ${escapeHtml(shortRef)}</p>
    </div>
    ${emailFooter()}
  `;

  return emailWrapper(innerHtml, 900);
}

export function buildTourCustomerEmail(
  payload: ReturnType<typeof tourQuoteSchema.parse>,
  totals: ReturnType<typeof computeTourTotals>,
  shortRef: string,
) {
  const destinations = payload.countries.map((country) => country.country).join(", ");

  const innerHtml = `
    ${emailHeader("The Flight Centre Travel &amp; Tours")}
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
      <p style="margin:6px 0"><strong>Total Hotel Nights:</strong> ${totals.totalHotelNights}</p>
      <p style="margin:6px 0"><strong>Total Hotel Cost:</strong> ${pkr(totals.totalHotelCost)}</p>
      <p style="margin:6px 0"><strong>Total Flight Cost:</strong> ${pkr(totals.totalFlightCost)}</p>
      <p style="margin:10px 0 6px;font-size:20px;font-weight:700"><strong>Grand Total:</strong> ${pkr(totals.grandTotal)}</p>
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
    ${emailFooter()}
  `;

  return emailWrapper(innerHtml, 760);
}
