// src/components/tour-calculator/FlightBlockForm.tsx
"use client";

import { X } from "lucide-react";

import type { TourStep3Copy } from "./copy";
import type { FlightBlock } from "./types";

interface FlightBlockFormProps {
  flight: FlightBlock;
  index: number;
  errors: Record<string, string>;
  passengers: { adults: number; children: number; infants: number };
  airlineOptions: readonly string[];
  departureCityOptions: readonly string[];
  destinationCityOptions: readonly string[];
  onChange: (id: string, updated: Partial<FlightBlock>) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
  copy: TourStep3Copy;
}

const INPUT_CLASS =
  "w-full rounded-2xl border border-input-border bg-input px-4 py-3 text-input-foreground placeholder:text-input-placeholder outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-ring/30 autofill:shadow-[inset_0_0_0_1000px_rgb(var(--tfc-input))] autofill:[-webkit-text-fill-color:rgb(var(--tfc-input-foreground))]";
const SELECT_CLASS =
  "w-full appearance-none rounded-2xl border border-input-border bg-input px-4 py-3 text-input-foreground placeholder:text-input-placeholder outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-ring/30";
const REMOVE_BUTTON_CLASS =
  "flex h-8 w-8 items-center justify-center rounded-full border border-accent/30 bg-accent-soft text-accent transition hover:bg-accent hover:text-accent-foreground";

function formatCurrency(value: number) {
  return `PKR ${value.toLocaleString()}`;
}

export function FlightBlockForm({
  flight,
  index,
  errors,
  passengers,
  airlineOptions,
  departureCityOptions,
  destinationCityOptions,
  onChange,
  onRemove,
  canRemove,
  copy,
}: FlightBlockFormProps) {
  const adultTotal = (parseFloat(flight.ticketAdult) || 0) * passengers.adults;
  const childTotal = (parseFloat(flight.ticketChild) || 0) * passengers.children;
  const infantTotal = (parseFloat(flight.ticketInfant) || 0) * passengers.infants;
  const flightTotal = adultTotal + childTotal + infantTotal;
  const hasAnyTicketPrice =
    (parseFloat(flight.ticketAdult) || 0) > 0 ||
    (parseFloat(flight.ticketChild) || 0) > 0 ||
    (parseFloat(flight.ticketInfant) || 0) > 0;

  return (
    <article className="rounded-[2rem] border border-border bg-surface-elevated/40 p-5 backdrop-blur-sm md:p-6">
      <div className="flex items-center justify-between gap-4">
        <h4 className="font-display text-xl font-bold text-foreground">
          {copy.flight} {index + 1}
        </h4>

        {canRemove ? (
          <button
            type="button"
            onClick={() => onRemove(flight.id)}
            className={REMOVE_BUTTON_CLASS}
            aria-label={`${copy.removeFlight} ${index + 1}`}
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground-muted">{copy.airline}</span>
          <select
            value={flight.airline}
            onChange={(event) => onChange(flight.id, { airline: event.target.value })}
            className={SELECT_CLASS}
          >
            <option value="" disabled className="bg-input text-input-placeholder">
              {copy.selectAirline}
            </option>
            {airlineOptions.map((airline) => (
              <option key={airline} value={airline} className="bg-input text-input-foreground">
                {airline}
              </option>
            ))}
          </select>
          {errors[`flight_airline_${flight.id}`] ? (
            <p className="mt-1 text-xs text-danger">
              {errors[`flight_airline_${flight.id}`]}
            </p>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground-muted">
            {copy.from}
          </span>
          <select
            value={flight.from}
            onChange={(event) => onChange(flight.id, { from: event.target.value })}
            className={SELECT_CLASS}
          >
            <option value="" disabled className="bg-input text-input-placeholder">
              {copy.selectDeparture}
            </option>
            {departureCityOptions.map((city) => (
              <option key={city} value={city} className="bg-input text-input-foreground">
                {city}
              </option>
            ))}
          </select>
          {errors[`flight_from_${flight.id}`] ? (
            <p className="mt-1 text-xs text-danger">{errors[`flight_from_${flight.id}`]}</p>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground-muted">
            {copy.to}
          </span>
          <select
            value={flight.to}
            onChange={(event) => onChange(flight.id, { to: event.target.value })}
            className={SELECT_CLASS}
          >
            <option value="" disabled className="bg-input text-input-placeholder">
              {copy.selectDestination}
            </option>
            {destinationCityOptions.map((city) => (
              <option key={city} value={city} className="bg-input text-input-foreground">
                {city}
              </option>
            ))}
          </select>
          {errors[`flight_to_${flight.id}`] ? (
            <p className="mt-1 text-xs text-danger">{errors[`flight_to_${flight.id}`]}</p>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground-muted">{copy.date}</span>
          <input
            type="date"
            value={flight.date}
            onChange={(event) => onChange(flight.id, { date: event.target.value })}
            className={INPUT_CLASS}
          />
          {errors[`flight_date_${flight.id}`] ? (
            <p className="mt-1 text-xs text-danger">{errors[`flight_date_${flight.id}`]}</p>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground-muted">{copy.time}</span>
          <input
            type="time"
            value={flight.time}
            onChange={(event) => onChange(flight.id, { time: event.target.value })}
            className={INPUT_CLASS}
          />
        </label>
      </div>

      <div className="mt-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold">
          {copy.ticketPrices}
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-foreground-muted">
              {copy.perAdult}
            </span>
            <input
              type="number"
              min="0"
              value={flight.ticketAdult}
              onChange={(event) => onChange(flight.id, { ticketAdult: event.target.value })}
              className={INPUT_CLASS}
              placeholder={copy.adultPlaceholder}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-foreground-muted">
              {copy.perChild}
            </span>
            <input
              type="number"
              min="0"
              value={flight.ticketChild}
              onChange={(event) => onChange(flight.id, { ticketChild: event.target.value })}
              className={INPUT_CLASS}
              placeholder={copy.childPlaceholder}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-foreground-muted">
              {copy.perInfant}
            </span>
            <input
              type="number"
              min="0"
              value={flight.ticketInfant}
              onChange={(event) => onChange(flight.id, { ticketInfant: event.target.value })}
              className={INPUT_CLASS}
              placeholder={copy.infantPlaceholder}
            />
          </label>
        </div>
      </div>

      {hasAnyTicketPrice ? (
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs text-gold">
            {copy.adults}: {formatCurrency(adultTotal)}
          </span>
          <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs text-gold">
            {copy.children}: {formatCurrency(childTotal)}
          </span>
          <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs text-gold">
            {copy.infants}: {formatCurrency(infantTotal)}
          </span>
          <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
            {copy.flightTotal}: {formatCurrency(flightTotal)}
          </span>
        </div>
      ) : null}
    </article>
  );
}
