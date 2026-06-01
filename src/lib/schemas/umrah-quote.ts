// src/lib/schemas/umrah-quote.ts
//
// DIVERGENCE FROM PROMPT SCHEMA SKETCH:
// The existing wire payload sends `departureFlight` and `returnFlight` as
// two separate FlightLeg objects (not a single `flight` block).
// Hotels are `makkahHotels[]` and `madinahHotels[]` (arrays with rooms field,
// not singular `makkahHotel`/`madinahHotel` objects with pricePerNight).
// Transport is a flat `transportVisa` string, not a nested `transport` object.
// Ticket pricing is at the root level: `ticketAdult`, `ticketChild`, `ticketInfant`.
// This schema matches the EXISTING wire contract exactly.

import { z } from "zod";

const flightLegSchema = z.object({
  airline: z.string().trim().min(1),
  from:    z.string().trim().min(1),
  to:      z.string().trim().min(1),
  date:    z.string().trim().min(1),
  time:    z.string().trim().optional().default(""),
});

const umrahHotelBlockSchema = z.object({
  roomType:  z.string().trim().optional().default(""),
  hotelName: z.string().trim().min(1),
  rooms:     z.number().int().min(1),
  checkIn:   z.string().trim().min(1),
  checkOut:  z.string().trim().min(1),
});

export const umrahQuoteSchema = z
  .object({
    passengerName:   z.string().trim().min(2),
    contactNumber:   z.string().trim().regex(/^[\d\s+\-()]{7,}$/),
    email:           z.string().trim().email(),
    adults:          z.number().int().min(1),
    children:        z.number().int().min(0),
    infants:         z.number().int().min(0),
    departureFlight: flightLegSchema,
    returnFlight:    flightLegSchema,
    makkahHotels:    z.array(umrahHotelBlockSchema).min(1),
    madinahHotels:   z.array(umrahHotelBlockSchema).min(1),
    transportVisa:   z.string().trim().min(1),
    coupon:          z.string().trim().optional().default(""),
    ticketAdult:     z.string().trim().optional().default("0"),
    ticketChild:     z.string().trim().optional().default("0"),
    ticketInfant:    z.string().trim().optional().default("0"),
    exchangeRate:    z.string().trim().min(1),
    turnstileToken:  z.string().min(1),
    // Client-computed totals — accepted but IGNORED by the server.
    // The server recomputes these from raw fields.
    makkahNights:     z.number().optional(),
    madinahNights:    z.number().optional(),
    transportSAR:     z.number().optional(),
    transportPKR:     z.number().optional(),
    ticketGrandTotal: z.number().optional(),
  })
  .strict();

export type UmrahQuotePayload = z.infer<typeof umrahQuoteSchema>;
