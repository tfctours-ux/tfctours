// src/components/tour-calculator/HotelEntryForm.tsx
"use client";

import { X } from "lucide-react";

import type { TourStep2Copy } from "./copy";
import type { HotelEntry } from "./types";

interface HotelEntryFormProps {
  hotel: HotelEntry;
  index: number;
  errors: Record<string, string>;
  onChange: (id: string, updated: Partial<HotelEntry>) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
  copy: TourStep2Copy;
}

const INPUT_CLASS =
  "w-full rounded-2xl border border-input-border bg-input px-4 py-3 text-input-foreground placeholder:text-input-placeholder outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-ring/30 autofill:shadow-[inset_0_0_0_1000px_rgb(var(--tfc-input))] autofill:[-webkit-text-fill-color:rgb(var(--tfc-input-foreground))]";
const REMOVE_BUTTON_CLASS =
  "flex h-8 w-8 items-center justify-center rounded-full border border-accent/30 bg-accent-soft text-accent transition hover:bg-accent hover:text-accent-foreground";

export function HotelEntryForm({
  hotel,
  index,
  errors,
  onChange,
  onRemove,
  canRemove,
  copy,
}: HotelEntryFormProps) {
  const nights =
    hotel.checkIn && hotel.checkOut
      ? Math.max(
          0,
          Math.round(
            (new Date(hotel.checkOut).getTime() - new Date(hotel.checkIn).getTime()) /
              86_400_000,
          ),
        )
      : 0;
  const hasInvalidDateOrder =
    Boolean(hotel.checkIn) &&
    Boolean(hotel.checkOut) &&
    new Date(hotel.checkOut).getTime() <= new Date(hotel.checkIn).getTime();

  return (
    <article className="space-y-4 rounded-[2rem] border border-border bg-surface-elevated/40 p-5 backdrop-blur-sm md:p-6">
      <div className="flex items-center justify-between gap-4">
        <h4 className="font-display text-xl font-bold text-foreground">
          {copy.hotel} {index + 1}
        </h4>

        {canRemove ? (
          <button
            type="button"
            onClick={() => onRemove(hotel.id)}
            className={REMOVE_BUTTON_CLASS}
            aria-label={`${copy.removeHotel} ${index + 1}`}
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground-muted">
            {copy.hotelName}
          </span>
          <input
            value={hotel.hotelName}
            onChange={(event) => onChange(hotel.id, { hotelName: event.target.value })}
            className={INPUT_CLASS}
            placeholder={copy.hotelPlaceholder}
          />
          {errors[`hotel_name_${hotel.id}`] ? (
            <p className="mt-1 text-xs text-danger">
              {errors[`hotel_name_${hotel.id}`]}
            </p>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground-muted">
            {copy.pricePerNight}
          </span>
          <input
            type="number"
            min="0"
            value={hotel.pricePerNight}
            onChange={(event) => onChange(hotel.id, { pricePerNight: event.target.value })}
            className={INPUT_CLASS}
            placeholder={copy.pricePlaceholder}
          />
          {errors[`hotel_price_${hotel.id}`] ? (
            <p className="mt-1 text-xs text-danger">
              {errors[`hotel_price_${hotel.id}`]}
            </p>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground-muted">
            {copy.checkIn}
          </span>
          <input
            type="date"
            value={hotel.checkIn}
            onChange={(event) => onChange(hotel.id, { checkIn: event.target.value })}
            className={INPUT_CLASS}
          />
          {errors[`hotel_checkin_${hotel.id}`] ? (
            <p className="mt-1 text-xs text-danger">
              {errors[`hotel_checkin_${hotel.id}`]}
            </p>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground-muted">
            {copy.checkOut}
          </span>
          <input
            type="date"
            value={hotel.checkOut}
            onChange={(event) => onChange(hotel.id, { checkOut: event.target.value })}
            className={INPUT_CLASS}
          />
          {errors[`hotel_checkout_${hotel.id}`] ? (
            <p className="mt-1 text-xs text-danger">
              {errors[`hotel_checkout_${hotel.id}`]}
            </p>
          ) : null}
        </label>
      </div>

      {(nights > 0 || hasInvalidDateOrder) && (
        <div className="flex flex-wrap items-center gap-3">
          {nights > 0 ? (
            <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs text-gold">
              {nights} {copy.nights}
            </span>
          ) : null}
          {hasInvalidDateOrder ? (
            <span className="text-xs text-danger">{copy.dateOrder}</span>
          ) : null}
        </div>
      )}

      {errors[`hotel_dates_${hotel.id}`] ? (
        <p className="mt-1 text-xs text-danger">{errors[`hotel_dates_${hotel.id}`]}</p>
      ) : null}
    </article>
  );
}
