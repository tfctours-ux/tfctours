// src/components/tour-calculator/Step2.tsx
"use client";

import { Plus } from "lucide-react";
import { useLocale } from "next-intl";

import { createEmptyCountry } from "./config";
import { isUrdu, tourCopy } from "./copy";
import { CountryBlockForm } from "./CountryBlockForm";
import type { CountryBlock } from "./types";

interface Step2Props {
  countries: CountryBlock[];
  countryOptions: string[];
  errors: Record<string, string>;
  onChange: (countries: CountryBlock[]) => void;
}

const ADD_BUTTON_CLASS =
  "flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition hover:border-gold/60 hover:bg-gold/10";

function getHotelNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(0, Math.round(diff / 86_400_000));
}

export function Step2({ countries, countryOptions, errors, onChange }: Step2Props) {
  const locale = useLocale();
  const copy = tourCopy[isUrdu(locale) ? "ur" : "en"].step2;
  const totalNights = countries.reduce((countrySum, country) => {
    return (
      countrySum +
      country.hotels.reduce((hotelSum, hotel) => {
        return hotelSum + getHotelNights(hotel.checkIn, hotel.checkOut);
      }, 0)
    );
  }, 0);

  return (
    <section>
      <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold">
        {copy.step}
      </p>
      <h2 className="mt-4 font-display text-3xl font-black text-foreground">
        {copy.title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground-muted">
        {copy.description}
      </p>

      <div className="mt-8 space-y-5">
        {countries.map((block, index) => (
          <CountryBlockForm
            key={block.id}
            block={block}
            index={index}
            errors={errors}
            countryOptions={countryOptions}
            onChange={(blockId, updatedBlock) => {
              onChange(
                countries.map((country) =>
                  country.id === blockId ? { ...country, ...updatedBlock } : country,
                ),
              );
            }}
            onRemove={(blockId) => onChange(countries.filter((country) => country.id !== blockId))}
            canRemove={countries.length > 1}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onChange([...countries, createEmptyCountry()])}
          className={ADD_BUTTON_CLASS}
        >
          <Plus className="h-4 w-4" />
          {copy.addCountry}
        </button>

        {totalNights > 0 ? (
          <span className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs text-gold">
            {copy.total}: {totalNights} {copy.nightsAcross} {countries.length} {copy.destinations}
          </span>
        ) : null}
      </div>
    </section>
  );
}
