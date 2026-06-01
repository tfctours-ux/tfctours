// src/components/umrah-calculator/Step3.tsx
"use client";

import { Plus } from "lucide-react";
import { useLocale } from "next-intl";

import { createEmptyHotelBlock } from "./config";
import { isUrdu, umrahCopy } from "./copy";
import { HotelBlockForm } from "./HotelBlockForm";
import type { HotelBlock } from "./types";

const TITLE_CLASS = "font-display text-2xl font-black text-foreground";

interface Step3Props {
  hotels: HotelBlock[];
  hotelOptions: string[];
  roomTypeOptions: string[];
  errors: Record<string, string>;
  onChange: (hotels: HotelBlock[]) => void;
}

export function Step3({
  hotels,
  hotelOptions,
  roomTypeOptions,
  errors,
  onChange,
}: Step3Props) {
  const locale = useLocale();
  const copy = umrahCopy[isUrdu(locale) ? "ur" : "en"].step3;

  function updateBlock(id: string, updated: Partial<HotelBlock>) {
    onChange(hotels.map((block) => (block.id === id ? { ...block, ...updated } : block)));
  }

  function removeBlock(id: string) {
    if (hotels.length <= 1) return;
    onChange(hotels.filter((block) => block.id !== id));
  }

  function addBlock() {
    onChange([...hotels, createEmptyHotelBlock()]);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className={TITLE_CLASS}>{copy.title}</h2>
        <p className="mt-3 text-sm leading-7 text-foreground-muted">
          {copy.description}
        </p>
      </div>

      <div className="space-y-5">
        {hotels.map((block, index) => (
          <HotelBlockForm
            key={block.id}
            block={block}
            index={index}
            hotelOptions={hotelOptions}
            roomTypeOptions={roomTypeOptions}
            cityLabel={copy.city}
            errors={errors}
            onChange={updateBlock}
            onRemove={removeBlock}
            canRemove={hotels.length > 1}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={addBlock}
        className="flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition hover:border-gold/60 hover:bg-gold/10"
      >
        <Plus className="h-4 w-4" />
        {copy.add}
      </button>
    </div>
  );
}
