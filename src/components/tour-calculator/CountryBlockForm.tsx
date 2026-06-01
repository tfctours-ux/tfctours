// src/components/tour-calculator/CountryBlockForm.tsx
"use client";

import { Plus, X } from "lucide-react";
import { useLocale } from "next-intl";

import { createEmptyHotel } from "./config";
import { isUrdu, tourCopy } from "./copy";
import { HotelEntryForm } from "./HotelEntryForm";
import type { CountryBlock } from "./types";

interface CountryBlockFormProps {
  block: CountryBlock;
  index: number;
  errors: Record<string, string>;
  countryOptions: readonly string[];
  onChange: (id: string, updated: Partial<CountryBlock>) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

const SELECT_CLASS =
  "w-full appearance-none rounded-2xl border border-input-border bg-input px-4 py-3 text-input-foreground placeholder:text-input-placeholder outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-ring/30";
const ADD_BUTTON_CLASS =
  "flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition hover:border-gold/60 hover:bg-gold/10";
const REMOVE_BUTTON_CLASS =
  "flex h-8 w-8 items-center justify-center rounded-full border border-accent/30 bg-accent-soft text-accent transition hover:bg-accent hover:text-accent-foreground";

export function CountryBlockForm({
  block,
  index,
  errors,
  countryOptions,
  onChange,
  onRemove,
  canRemove,
}: CountryBlockFormProps) {
  const locale = useLocale();
  const copy = tourCopy[isUrdu(locale) ? "ur" : "en"].step2;

  return (
    <article className="space-y-5 rounded-[2rem] border border-border bg-surface-elevated/40 p-5 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground-muted">
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
        <span className="mb-1.5 block text-sm font-medium text-foreground-muted">
          {copy.country}
        </span>
        <select
          value={block.country}
          onChange={(event) => onChange(block.id, { country: event.target.value })}
          className={SELECT_CLASS}
        >
          <option value="" disabled className="bg-input text-input-placeholder">
            {copy.selectCountry}
          </option>
          {countryOptions.map((country) => (
            <option key={country} value={country} className="bg-input text-input-foreground">
              {country}
            </option>
          ))}
        </select>
        {errors[`country_${block.id}`] ? (
          <p className="mt-1 text-xs text-danger">{errors[`country_${block.id}`]}</p>
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
