// src/lib/calculator-server.ts
//
// Server-side computation of tour/umrah totals from raw fields.
// Used by the API routes to OVERRIDE any totals supplied by the client.

import {
  TRANSPORT_OPTIONS,
  type TransportOption,
} from "@/components/umrah-calculator/config";
import type { TourQuotePayload } from "@/lib/schemas/tour-quote";
import type { UmrahQuotePayload } from "@/lib/schemas/umrah-quote";

function nights(ci: string, co: string): number {
  const d = new Date(co).getTime() - new Date(ci).getTime();
  const n = Math.round(d / 86_400_000);
  return n > 0 ? n : 0;
}

function num(v: string | undefined): number {
  const n = Number.parseFloat(v ?? "0");
  return Number.isFinite(n) ? n : 0;
}

export function computeTourTotals(p: TourQuotePayload) {
  let totalHotelNights = 0;
  let totalHotelCost = 0;
  for (const c of p.countries) {
    for (const h of c.hotels) {
      const n = nights(h.checkIn, h.checkOut);
      totalHotelNights += n;
      totalHotelCost += Math.round(n * num(h.pricePerNight));
    }
  }
  let totalFlightCost = 0;
  for (const f of p.flights) {
    totalFlightCost +=
      Math.round(num(f.ticketAdult)  * p.adults) +
      Math.round(num(f.ticketChild)  * p.children) +
      Math.round(num(f.ticketInfant) * p.infants);
  }
  return {
    totalHotelNights,
    totalHotelCost,
    totalFlightCost,
    grandTotal: totalHotelCost + totalFlightCost,
  };
}

export function computeUmrahTotals(
  p: UmrahQuotePayload,
  transportOptions: TransportOption[] = TRANSPORT_OPTIONS,
) {
  // Hotel nights
  let makkahNights = 0;
  for (const h of p.makkahHotels) {
    makkahNights += nights(h.checkIn, h.checkOut);
  }
  let madinahNights = 0;
  for (const h of p.madinahHotels) {
    madinahNights += nights(h.checkIn, h.checkOut);
  }
  const totalNights = makkahNights + madinahNights;

  // Transport
  const exchangeRate = num(p.exchangeRate);
  const transportSarMap: Record<string, number> = Object.fromEntries(
    transportOptions.map((option) => [option.label, option.sar]),
  );
  const transportSAR = transportSarMap[p.transportVisa] ?? 0;
  const transportPKR = Math.round(transportSAR * exchangeRate);

  // Ticket totals
  const ticketTotalAdult  = Math.round(num(p.ticketAdult) * p.adults);
  const ticketTotalChild  = Math.round(num(p.ticketChild) * p.children);
  const ticketTotalInfant = Math.round(num(p.ticketInfant) * p.infants);
  const ticketGrandTotal  = ticketTotalAdult + ticketTotalChild + ticketTotalInfant;

  return {
    makkahNights,
    madinahNights,
    totalNights,
    transportSAR,
    transportPKR,
    ticketTotalAdult,
    ticketTotalChild,
    ticketTotalInfant,
    ticketGrandTotal,
  };
}
