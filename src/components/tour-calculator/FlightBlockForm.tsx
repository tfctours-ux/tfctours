"use client";

import { X } from "lucide-react";

import {
  DEPARTURE_CITIES,
  DESTINATION_CITIES,
  TOUR_AIRLINES,
} from "./config";
import type { TourStep3Copy } from "./copy";
import type { FlightBlock } from "./types";

interface FlightBlockFormProps {
  flight: FlightBlock;
  index: number;
  errors: Record<string, string>;
  passengers: { adults: number; children: number; infants: number };
  onChange: (id: string, updated: Partial<FlightBlock>) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
  copy: TourStep3Copy;
}

const INPUT_CLASS =
  "w-full rounded-2xl border border-white/[0.08] bg-white/[0.05] px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-brand-red focus:bg-white/[0.08]";
const SELECT_CLASS =
  "w-full appearance-none rounded-2xl border border-white/[0.08] bg-white/[0.05] px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-brand-red focus:bg-white/[0.08]";
const REMOVE_BUTTON_CLASS =
  "flex h-8 w-8 items-center justify-center rounded-full border border-brand-red/20 bg-brand-red/5 text-brand-red transition hover:bg-brand-red hover:text-white";

function formatCurrency(value: number) {
  return `PKR ${value.toLocaleString()}`;
}

export function FlightBlockForm({
  flight,
  index,
  errors,
  passengers,
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
    <article className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-sm md:p-6">
      <div className="flex items-center justify-between gap-4">
        <h4 className="font-display text-xl font-bold text-white">
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
          <span className="mb-1.5 block text-sm font-medium text-white/70">{copy.airline}</span>
          <select
            value={flight.airline}
            onChange={(event) => onChange(flight.id, { airline: event.target.value })}
            className={SELECT_CLASS}
          >
            <option value="" disabled className="bg-brand-surface text-white/50">
              {copy.selectAirline}
            </option>
            {TOUR_AIRLINES.map((airline) => (
              <option key={airline} value={airline} className="bg-brand-surface text-white">
                {airline}
              </option>
            ))}
          </select>
          {errors[`flight_airline_${flight.id}`] ? (
            <p className="mt-1 text-xs text-brand-red">
              {errors[`flight_airline_${flight.id}`]}
            </p>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-white/70">
            {copy.from}
          </span>
          <select
            value={flight.from}
            onChange={(event) => onChange(flight.id, { from: event.target.value })}
            className={SELECT_CLASS}
          >
            <option value="" disabled className="bg-brand-surface text-white/50">
              {copy.selectDeparture}
            </option>
            {DEPARTURE_CITIES.map((city) => (
              <option key={city} value={city} className="bg-brand-surface text-white">
                {city}
              </option>
            ))}
          </select>
          {errors[`flight_from_${flight.id}`] ? (
            <p className="mt-1 text-xs text-brand-red">{errors[`flight_from_${flight.id}`]}</p>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-white/70">
            {copy.to}
          </span>
          <select
            value={flight.to}
            onChange={(event) => onChange(flight.id, { to: event.target.value })}
            className={SELECT_CLASS}
          >
            <option value="" disabled className="bg-brand-surface text-white/50">
              {copy.selectDestination}
            </option>
            {DESTINATION_CITIES.map((city) => (
              <option key={city} value={city} className="bg-brand-surface text-white">
                {city}
              </option>
            ))}
          </select>
          {errors[`flight_to_${flight.id}`] ? (
            <p className="mt-1 text-xs text-brand-red">{errors[`flight_to_${flight.id}`]}</p>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-white/70">{copy.date}</span>
          <input
            type="date"
            value={flight.date}
            onChange={(event) => onChange(flight.id, { date: event.target.value })}
            className={INPUT_CLASS}
          />
          {errors[`flight_date_${flight.id}`] ? (
            <p className="mt-1 text-xs text-brand-red">{errors[`flight_date_${flight.id}`]}</p>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-white/70">{copy.time}</span>
          <input
            type="time"
            value={flight.time}
            onChange={(event) => onChange(flight.id, { time: event.target.value })}
            className={INPUT_CLASS}
          />
        </label>
      </div>

      <div className="mt-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-gold">
          {copy.ticketPrices}
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-white/70">
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
            <span className="mb-1.5 block text-sm font-medium text-white/70">
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
            <span className="mb-1.5 block text-sm font-medium text-white/70">
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
          <span className="rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1 text-xs text-brand-gold">
            {copy.adults}: {formatCurrency(adultTotal)}
          </span>
          <span className="rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1 text-xs text-brand-gold">
            {copy.children}: {formatCurrency(childTotal)}
          </span>
          <span className="rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1 text-xs text-brand-gold">
            {copy.infants}: {formatCurrency(infantTotal)}
          </span>
          <span className="rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1 text-xs font-semibold text-brand-gold">
            {copy.flightTotal}: {formatCurrency(flightTotal)}
          </span>
        </div>
      ) : null}
    </article>
  );
}
