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
  "w-full rounded-2xl border border-white/[0.08] bg-white/[0.05] px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-brand-red focus:bg-white/[0.08]";
const REMOVE_BUTTON_CLASS =
  "flex h-8 w-8 items-center justify-center rounded-full border border-brand-red/20 bg-brand-red/5 text-brand-red transition hover:bg-brand-red hover:text-white";

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
    <article className="space-y-4 rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-sm md:p-6">
      <div className="flex items-center justify-between gap-4">
        <h4 className="font-display text-xl font-bold text-white">
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
          <span className="mb-1.5 block text-sm font-medium text-white/70">
            {copy.hotelName}
          </span>
          <input
            value={hotel.hotelName}
            onChange={(event) => onChange(hotel.id, { hotelName: event.target.value })}
            className={INPUT_CLASS}
            placeholder={copy.hotelPlaceholder}
          />
          {errors[`hotel_name_${hotel.id}`] ? (
            <p className="mt-1 text-xs text-brand-red">
              {errors[`hotel_name_${hotel.id}`]}
            </p>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-white/70">
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
            <p className="mt-1 text-xs text-brand-red">
              {errors[`hotel_price_${hotel.id}`]}
            </p>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-white/70">
            {copy.checkIn}
          </span>
          <input
            type="date"
            value={hotel.checkIn}
            onChange={(event) => onChange(hotel.id, { checkIn: event.target.value })}
            className={INPUT_CLASS}
          />
          {errors[`hotel_checkin_${hotel.id}`] ? (
            <p className="mt-1 text-xs text-brand-red">
              {errors[`hotel_checkin_${hotel.id}`]}
            </p>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-white/70">
            {copy.checkOut}
          </span>
          <input
            type="date"
            value={hotel.checkOut}
            onChange={(event) => onChange(hotel.id, { checkOut: event.target.value })}
            className={INPUT_CLASS}
          />
          {errors[`hotel_checkout_${hotel.id}`] ? (
            <p className="mt-1 text-xs text-brand-red">
              {errors[`hotel_checkout_${hotel.id}`]}
            </p>
          ) : null}
        </label>
      </div>

      {(nights > 0 || hasInvalidDateOrder) && (
        <div className="flex flex-wrap items-center gap-3">
          {nights > 0 ? (
            <span className="rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1 text-xs text-brand-gold">
              {nights} {copy.nights}
            </span>
          ) : null}
          {hasInvalidDateOrder ? (
            <span className="text-xs text-brand-red">{copy.dateOrder}</span>
          ) : null}
        </div>
      )}

      {errors[`hotel_dates_${hotel.id}`] ? (
        <p className="mt-1 text-xs text-brand-red">{errors[`hotel_dates_${hotel.id}`]}</p>
      ) : null}
    </article>
  );
}
