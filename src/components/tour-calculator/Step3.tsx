"use client";

import { Plus } from "lucide-react";
import { useLocale } from "next-intl";

import { createEmptyFlight } from "./config";
import { isUrdu, tourCopy } from "./copy";
import { FlightBlockForm } from "./FlightBlockForm";
import type { FlightBlock } from "./types";

interface Step3Props {
  flights: FlightBlock[];
  errors: Record<string, string>;
  onChange: (flights: FlightBlock[]) => void;
  passengers: { adults: number; children: number; infants: number };
}

const ADD_BUTTON_CLASS =
  "flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/[0.06] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold transition hover:border-brand-gold/60 hover:bg-brand-gold/10";

export function Step3({ flights, errors, onChange, passengers }: Step3Props) {
  const locale = useLocale();
  const copy = tourCopy[isUrdu(locale) ? "ur" : "en"].step3;
  const grandFlightTotal = flights.reduce((sum, flight) => {
    const adultTotal = (parseFloat(flight.ticketAdult) || 0) * passengers.adults;
    const childTotal = (parseFloat(flight.ticketChild) || 0) * passengers.children;
    const infantTotal = (parseFloat(flight.ticketInfant) || 0) * passengers.infants;
    return sum + adultTotal + childTotal + infantTotal;
  }, 0);

  return (
    <section>
      <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-gold">
        {copy.step}
      </p>
      <h2 className="mt-4 font-display text-3xl font-black text-white">
        {copy.title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
        {copy.description}
      </p>

      <div className="mt-8 space-y-5">
        {flights.map((flight, index) => (
          <FlightBlockForm
            key={flight.id}
            flight={flight}
            index={index}
            errors={errors}
            passengers={passengers}
            onChange={(flightId, updatedFlight) => {
              onChange(
                flights.map((entry) =>
                  entry.id === flightId ? { ...entry, ...updatedFlight } : entry,
                ),
              );
            }}
            onRemove={(flightId) => onChange(flights.filter((entry) => entry.id !== flightId))}
            canRemove={flights.length > 1}
            copy={copy}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onChange([...flights, createEmptyFlight()])}
          className={ADD_BUTTON_CLASS}
        >
          <Plus className="h-4 w-4" />
          {copy.addFlight}
        </button>

        {grandFlightTotal > 0 ? (
          <span className="rounded-full border border-brand-gold/20 bg-brand-gold/10 px-4 py-2 text-xs text-brand-gold">
            {copy.totalTicket}: PKR {grandFlightTotal.toLocaleString()}
          </span>
        ) : null}
      </div>
    </section>
  );
}
