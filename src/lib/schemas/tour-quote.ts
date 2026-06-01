// src/lib/schemas/tour-quote.ts
import { z } from "zod";

const hotelEntrySchema = z.object({
  hotelName:     z.string().trim().min(1),
  pricePerNight: z.string().trim().min(1),
  checkIn:       z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOut:      z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const countryBlockSchema = z.object({
  country: z.string().trim().min(1),
  hotels:  z.array(hotelEntrySchema).min(1),
});

const flightBlockSchema = z.object({
  airline:      z.string().trim().min(1),
  from:         z.string().trim().min(1),
  to:           z.string().trim().min(1),
  date:         z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
  time:         z.string().trim().optional().default(""),
  ticketAdult:  z.string().trim().min(1),
  ticketChild:  z.string().trim().optional().default("0"),
  ticketInfant: z.string().trim().optional().default("0"),
});

export const tourQuoteSchema = z
  .object({
    passengerName:  z.string().trim().min(2),
    contactNumber:  z.string().trim().regex(/^[\d\s+\-()]{7,}$/),
    email:          z.string().trim().email(),
    adults:         z.number().int().min(1),
    children:       z.number().int().min(0),
    infants:        z.number().int().min(0),
    countries:      z.array(countryBlockSchema).min(1),
    flights:        z.array(flightBlockSchema).min(1),
    coupon:         z.string().trim().optional().default(""),
    turnstileToken: z.string().min(1),
    // Client-computed totals — accepted but IGNORED by the server.
    // The server recomputes these from raw fields. Kept in schema
    // to avoid breaking existing clients that send them.
    totalHotelNights: z.number().optional(),
    totalHotelCost:   z.number().optional(),
    totalFlightCost:  z.number().optional(),
    grandTotal:       z.number().optional(),
  })
  .strict();

export type TourQuotePayload = z.infer<typeof tourQuoteSchema>;
