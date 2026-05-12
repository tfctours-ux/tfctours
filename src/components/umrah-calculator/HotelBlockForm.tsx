"use client";

import { X } from "lucide-react";
import { useLocale } from "next-intl";

import { ROOM_TYPES } from "./config";
import { isUrdu, umrahCopy } from "./copy";
import type { HotelBlock } from "./types";

const SURFACE_CARD_CLASS =
  "rounded-[2rem] border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm";
const INPUT_CLASS =
  "w-full rounded-2xl border border-white/[0.08] bg-white/[0.05] px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-brand-red focus:bg-white/[0.08]";
const SELECT_CLASS = `${INPUT_CLASS} appearance-none`;
const ERROR_CLASS = "mt-1 text-xs text-brand-red";
const SUB_LABEL_CLASS = "mb-2 text-sm font-medium text-white/70";

interface HotelBlockFormProps {
  block: HotelBlock;
  index: number;
  hotelOptions: readonly string[];
  cityLabel: string;
  errors: Record<string, string>;
  onChange: (id: string, updated: Partial<HotelBlock>) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

export function HotelBlockForm({
  block,
  index,
  hotelOptions,
  cityLabel,
  errors,
  onChange,
  onRemove,
  canRemove,
}: HotelBlockFormProps) {
  const locale = useLocale();
  const copy = umrahCopy[isUrdu(locale) ? "ur" : "en"].hotel;
  const nights =
    block.checkIn && block.checkOut && new Date(block.checkOut).getTime() > new Date(block.checkIn).getTime()
      ? Math.max(
          0,
          Math.round(
            (new Date(block.checkOut).getTime() - new Date(block.checkIn).getTime()) / 86400000,
          ),
        )
      : 0;

  return (
    <div className={`${SURFACE_CARD_CLASS} p-6`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-gold">
            {cityLabel}
          </p>
          <h3 className="mt-3 text-xl font-semibold text-white">
            {copy.block} {index + 1}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {nights > 0 ? (
            <span className="rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1 text-xs text-brand-gold">
              {nights} {copy.nights}
            </span>
          ) : null}
          {canRemove ? (
            <button
              type="button"
              onClick={() => onRemove(block.id)}
              className="rounded-full border border-brand-red/20 bg-brand-red/5 p-2 text-brand-red transition hover:bg-brand-red hover:text-white"
              aria-label={`${copy.remove} ${index + 1}`}
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className={SUB_LABEL_CLASS}>{copy.roomType}</label>
          <select
            value={block.roomType}
            onChange={(event) => onChange(block.id, { roomType: event.target.value })}
            className={SELECT_CLASS}
          >
            <option value="">{copy.selectRoomType}</option>
            {ROOM_TYPES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors[`hotel_${block.id}_roomType`] ? (
            <p className={ERROR_CLASS}>{errors[`hotel_${block.id}_roomType`]}</p>
          ) : null}
        </div>

        <div className="md:col-span-2">
          <label className={SUB_LABEL_CLASS}>{copy.hotel}</label>
          <select
            value={block.hotelName}
            onChange={(event) => onChange(block.id, { hotelName: event.target.value })}
            className={SELECT_CLASS}
          >
            <option value="">{copy.selectHotel}</option>
            {hotelOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors[`hotel_${block.id}_hotelName`] ? (
            <p className={ERROR_CLASS}>{errors[`hotel_${block.id}_hotelName`]}</p>
          ) : null}
        </div>

        <div>
          <label className={SUB_LABEL_CLASS}>{copy.rooms}</label>
          <input
            type="number"
            min="1"
            max="20"
            value={block.rooms}
            onChange={(event) =>
              onChange(block.id, { rooms: Math.max(1, Number(event.target.value) || 1) })
            }
            className={INPUT_CLASS}
          />
          {errors[`hotel_${block.id}_rooms`] ? (
            <p className={ERROR_CLASS}>{errors[`hotel_${block.id}_rooms`]}</p>
          ) : null}
        </div>

        <div>
          <label className={SUB_LABEL_CLASS}>{copy.checkIn}</label>
          <input
            type="date"
            value={block.checkIn}
            onChange={(event) => onChange(block.id, { checkIn: event.target.value })}
            className={INPUT_CLASS}
          />
          {errors[`hotel_${block.id}_checkIn`] ? (
            <p className={ERROR_CLASS}>{errors[`hotel_${block.id}_checkIn`]}</p>
          ) : null}
        </div>

        <div>
          <label className={SUB_LABEL_CLASS}>{copy.checkOut}</label>
          <input
            type="date"
            value={block.checkOut}
            onChange={(event) => onChange(block.id, { checkOut: event.target.value })}
            className={INPUT_CLASS}
          />
          {errors[`hotel_${block.id}_checkOut`] ? (
            <p className={ERROR_CLASS}>{errors[`hotel_${block.id}_checkOut`]}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
