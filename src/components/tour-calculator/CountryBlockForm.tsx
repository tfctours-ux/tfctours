"use client";

import { Plus, X } from "lucide-react";
import { useLocale } from "next-intl";

import { TOUR_COUNTRIES, createEmptyHotel } from "./config";
import { isUrdu, tourCopy } from "./copy";
import { HotelEntryForm } from "./HotelEntryForm";
import type { CountryBlock } from "./types";

interface CountryBlockFormProps {
  block: CountryBlock;
  index: number;
  errors: Record<string, string>;
  onChange: (id: string, updated: Partial<CountryBlock>) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

const SELECT_CLASS =
  "w-full appearance-none rounded-2xl border border-white/[0.08] bg-white/[0.05] px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-brand-red focus:bg-white/[0.08]";
const ADD_BUTTON_CLASS =
  "flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/[0.06] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold transition hover:border-brand-gold/60 hover:bg-brand-gold/10";
const REMOVE_BUTTON_CLASS =
  "flex h-8 w-8 items-center justify-center rounded-full border border-brand-red/20 bg-brand-red/5 text-brand-red transition hover:bg-brand-red hover:text-white";

export function CountryBlockForm({
  block,
  index,
  errors,
  onChange,
  onRemove,
  canRemove,
}: CountryBlockFormProps) {
  const locale = useLocale();
  const copy = tourCopy[isUrdu(locale) ? "ur" : "en"].step2;

  return (
    <article className="space-y-5 rounded-[2rem] border border-white/[0.10] bg-white/[0.04] p-5 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/60">
          {copy.destination} {index + 1}
        </p>

        {canRemove ? (
          <button
            type="button"
            onClick={() => onRemove(block.id)}
            className={REMOVE_BUTTON_CLASS}
            aria-label={`${copy.removeDestination} ${index + 1}`}
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <div>
        <span className="mb-1.5 block text-sm font-medium text-white/70">
          {copy.country}
        </span>
        <select
          value={block.country}
          onChange={(event) => onChange(block.id, { country: event.target.value })}
          className={SELECT_CLASS}
        >
          <option value="" disabled className="bg-brand-surface text-white/50">
            {copy.selectCountry}
          </option>
          {TOUR_COUNTRIES.map((country) => (
            <option key={country} value={country} className="bg-brand-surface text-white">
              {country}
            </option>
          ))}
        </select>
        {errors[`country_${block.id}`] ? (
          <p className="mt-1 text-xs text-brand-red">{errors[`country_${block.id}`]}</p>
        ) : null}
      </div>

      <div className="space-y-4">
        {block.hotels.map((hotel, hi) => (
          <HotelEntryForm
            key={hotel.id}
            hotel={hotel}
            index={hi}
            errors={errors}
            onChange={(hotelId, updatedHotel) => {
              const hotels = block.hotels.map((entry) =>
                entry.id === hotelId ? { ...entry, ...updatedHotel } : entry,
              );
              onChange(block.id, { hotels });
            }}
            onRemove={(hotelId) => {
              onChange(block.id, {
                hotels: block.hotels.filter((entry) => entry.id !== hotelId),
              });
            }}
            canRemove={block.hotels.length > 1}
            copy={copy}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => onChange(block.id, { hotels: [...block.hotels, createEmptyHotel()] })}
        className={ADD_BUTTON_CLASS}
      >
        <Plus className="h-4 w-4" />
        {copy.addHotel}
      </button>
    </article>
  );
}
