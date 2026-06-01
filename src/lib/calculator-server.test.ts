import { describe, expect, it } from "vitest";

import { computeTourTotals, computeUmrahTotals } from "./calculator-server";
import type { TourQuotePayload } from "./schemas/tour-quote";
import type { UmrahQuotePayload } from "./schemas/umrah-quote";

// ─── helpers ────────────────────────────────────────────────────────────────

function makeTourPayload(overrides: Partial<TourQuotePayload> = {}): TourQuotePayload {
  return {
    passengerName: "Test User",
    contactNumber: "03001234567",
    email: "test@example.com",
    adults: 2,
    children: 1,
    infants: 0,
    countries: [
      {
        country: "Turkey",
        hotels: [
          {
            hotelName: "Grand Hotel",
            pricePerNight: "5000",
            checkIn: "2025-06-01",
            checkOut: "2025-06-05",
          },
        ],
      },
    ],
    flights: [
      {
        airline: "Turkish Airlines",
        from: "Lahore (LHE)",
        to: "Istanbul",
        date: "2025-06-01",
        time: "09:00",
        ticketAdult: "80000",
        ticketChild: "60000",
        ticketInfant: "10000",
      },
    ],
    coupon: "",
    turnstileToken: "test-token",
    ...overrides,
  };
}

function makeUmrahPayload(overrides: Partial<UmrahQuotePayload> = {}): UmrahQuotePayload {
  return {
    passengerName: "Test User",
    contactNumber: "03001234567",
    email: "test@example.com",
    adults: 2,
    children: 0,
    infants: 0,
    departureFlight: { airline: "PIA", from: "Lahore (LHE)", to: "Jeddah (JED)", date: "2025-06-01", time: "" },
    returnFlight: { airline: "PIA", from: "Jeddah (JED)", to: "Lahore (LHE)", date: "2025-06-15", time: "" },
    makkahHotels: [
      { hotelName: "Makkah Hotel", rooms: 1, checkIn: "2025-06-01", checkOut: "2025-06-07", roomType: "Double" },
    ],
    madinahHotels: [
      { hotelName: "Madinah Hotel", rooms: 1, checkIn: "2025-06-07", checkOut: "2025-06-12", roomType: "Double" },
    ],
    transportVisa: "By Car (2 Pax)",
    coupon: "",
    ticketAdult: "120000",
    ticketChild: "0",
    ticketInfant: "0",
    exchangeRate: "75",
    turnstileToken: "test-token",
    ...overrides,
  };
}

// ─── computeTourTotals ───────────────────────────────────────────────────────

describe("computeTourTotals", () => {
  it("calculates hotel nights correctly", () => {
    const result = computeTourTotals(makeTourPayload());
    expect(result.totalHotelNights).toBe(4); // Jun 1→5 = 4 nights
  });

  it("calculates hotel cost correctly (nights × price × hotels)", () => {
    const result = computeTourTotals(makeTourPayload());
    expect(result.totalHotelCost).toBe(20_000); // 4 nights × PKR 5000
  });

  it("calculates flight cost for all passenger types", () => {
    const result = computeTourTotals(makeTourPayload());
    // 2 adults × 80000 + 1 child × 60000 + 0 infants × 10000
    expect(result.totalFlightCost).toBe(220_000);
  });

  it("sums grand total correctly", () => {
    const result = computeTourTotals(makeTourPayload());
    expect(result.grandTotal).toBe(240_000); // 20000 + 220000
  });

  it("handles multiple countries and hotels", () => {
    const payload = makeTourPayload({
      countries: [
        {
          country: "Turkey",
          hotels: [{ hotelName: "A", pricePerNight: "4000", checkIn: "2025-06-01", checkOut: "2025-06-03" }],
        },
        {
          country: "UAE",
          hotels: [{ hotelName: "B", pricePerNight: "8000", checkIn: "2025-06-05", checkOut: "2025-06-08" }],
        },
      ],
    });
    const result = computeTourTotals(payload);
    expect(result.totalHotelNights).toBe(5); // 2 + 3
    expect(result.totalHotelCost).toBe(32_000); // 2×4000 + 3×8000
  });

  it("returns 0 for invalid date ranges", () => {
    const payload = makeTourPayload({
      countries: [
        {
          country: "Turkey",
          hotels: [{ hotelName: "A", pricePerNight: "5000", checkIn: "2025-06-05", checkOut: "2025-06-01" }],
        },
      ],
    });
    expect(computeTourTotals(payload).totalHotelNights).toBe(0);
    expect(computeTourTotals(payload).totalHotelCost).toBe(0);
  });

  it("ignores client-supplied totals fields", () => {
    const payload = makeTourPayload({
      totalHotelNights: 9999,
      totalHotelCost: 9999999,
      grandTotal: 9999999,
    });
    const result = computeTourTotals(payload);
    expect(result.totalHotelNights).toBe(4);
    expect(result.grandTotal).toBe(240_000);
  });
});

// ─── computeUmrahTotals ──────────────────────────────────────────────────────

describe("computeUmrahTotals", () => {
  it("calculates Makkah hotel nights", () => {
    expect(computeUmrahTotals(makeUmrahPayload()).makkahNights).toBe(6); // Jun 1→7
  });

  it("calculates Madinah hotel nights", () => {
    expect(computeUmrahTotals(makeUmrahPayload()).madinahNights).toBe(5); // Jun 7→12
  });

  it("sums total nights", () => {
    expect(computeUmrahTotals(makeUmrahPayload()).totalNights).toBe(11);
  });

  it("looks up transport SAR from TRANSPORT_OPTIONS", () => {
    const result = computeUmrahTotals(makeUmrahPayload());
    expect(result.transportSAR).toBe(820); // "By Car (2 Pax)" = 820 SAR
  });

  it("converts transport SAR to PKR using exchange rate", () => {
    const result = computeUmrahTotals(makeUmrahPayload({ exchangeRate: "75" }));
    expect(result.transportPKR).toBe(61_500); // 820 × 75
  });

  it("calculates adult ticket total", () => {
    const result = computeUmrahTotals(makeUmrahPayload());
    expect(result.ticketTotalAdult).toBe(240_000); // 2 adults × 120000
  });

  it("returns 0 transport for unknown transport option", () => {
    const result = computeUmrahTotals(makeUmrahPayload({ transportVisa: "Unknown Option" }));
    expect(result.transportSAR).toBe(0);
    expect(result.transportPKR).toBe(0);
  });

  it("handles zero children and infants", () => {
    const result = computeUmrahTotals(makeUmrahPayload({ children: 0, infants: 0 }));
    expect(result.ticketTotalChild).toBe(0);
    expect(result.ticketTotalInfant).toBe(0);
  });

  it("handles non-numeric exchange rate gracefully", () => {
    const result = computeUmrahTotals(makeUmrahPayload({ exchangeRate: "abc" }));
    expect(result.transportPKR).toBe(0);
  });
});
