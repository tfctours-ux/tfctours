import { TRANSPORT_OPTIONS } from "./config";
import type { DerivedValues, HotelBlock, WizardState } from "./types";

export function computeNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  const nights = Math.round(ms / 86_400_000);
  return nights > 0 ? nights : 0;
}

export function computeTotalNights(hotels: HotelBlock[]): number {
  return hotels.reduce((sum, h) => sum + computeNights(h.checkIn, h.checkOut), 0);
}

export function computeDerivedValues(state: WizardState): DerivedValues {
  const { step1, step3, step4, step5 } = state;

  const totalPassengers = step1.adults + step1.children + step1.infants;
  const makkahNights = computeTotalNights(step3.hotels);
  const madinahNights = computeTotalNights(step4.hotels);

  const transportOption = TRANSPORT_OPTIONS.find((o) => o.label === step5.transportVisa);
  const transportSAR = transportOption?.sar ?? 0;

  const exchangeRate = Number.parseFloat(step5.exchangeRate) || 0;
  const transportPKR = Math.round(transportSAR * exchangeRate);

  const adultRate = Number.parseFloat(step5.ticketAdult) || 0;
  const childRate = Number.parseFloat(step5.ticketChild) || 0;
  const infantRate = Number.parseFloat(step5.ticketInfant) || 0;

  const ticketTotalAdult = Math.round(adultRate * step1.adults);
  const ticketTotalChild = Math.round(childRate * step1.children);
  const ticketTotalInfant = Math.round(infantRate * step1.infants);
  const ticketGrandTotal = ticketTotalAdult + ticketTotalChild + ticketTotalInfant;

  return {
    totalPassengers,
    makkahNights,
    madinahNights,
    transportSAR,
    transportPKR,
    ticketTotalAdult,
    ticketTotalChild,
    ticketTotalInfant,
    ticketGrandTotal,
  };
}

export function formatPKR(amount: number): string {
  return `PKR ${amount.toLocaleString("en-PK")}`;
}
