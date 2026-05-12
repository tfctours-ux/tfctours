"use client";

import { Minus, Plus } from "lucide-react";
import { useLocale } from "next-intl";

import { isUrdu, tourCopy } from "./copy";
import type { Step1Data } from "./types";

interface Step1Props {
  data: Step1Data;
  errors: Record<string, string>;
  onChange: (d: Partial<Step1Data>) => void;
}

const INPUT_CLASS =
  "w-full rounded-2xl border border-white/[0.08] bg-white/[0.05] px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-brand-red focus:bg-white/[0.08]";
const COUNTER_BUTTON_CLASS =
  "flex h-10 w-10 items-center justify-center rounded-full border border-brand-red bg-brand-red/10 text-brand-red transition hover:bg-brand-red hover:text-white";
const PASSENGER_GROUPS = [
  { key: "adults", label: "Adults", subLabel: "Age 12+", min: 1, max: 20 },
  { key: "children", label: "Children", subLabel: "Age 2-11", min: 0, max: 10 },
  { key: "infants", label: "Infants", subLabel: "Under 2 (lap)", min: 0, max: 5 },
] as const;

export function Step1({ data, errors, onChange }: Step1Props) {
  const locale = useLocale();
  const copy = tourCopy[isUrdu(locale) ? "ur" : "en"].step1;

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

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-white/70">
            {copy.passengerName}
          </span>
          <input
            name="passengerName"
            value={data.passengerName}
            onChange={(event) => onChange({ passengerName: event.target.value })}
            className={INPUT_CLASS}
            placeholder={copy.passengerPlaceholder}
          />
          {errors.passengerName ? (
            <p className="mt-1 text-xs text-brand-red">{errors.passengerName}</p>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-white/70">
            {copy.contactNumber}
          </span>
          <input
            name="contactNumber"
            type="tel"
            dir="ltr"
            value={data.contactNumber}
            onChange={(event) => onChange({ contactNumber: event.target.value })}
            className={INPUT_CLASS}
            placeholder="03xx-xxxxxxx"
          />
          {errors.contactNumber ? (
            <p className="mt-1 text-xs text-brand-red">{errors.contactNumber}</p>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-white/70">
            {copy.email}
          </span>
          <input
            name="email"
            type="email"
            value={data.email}
            onChange={(event) => onChange({ email: event.target.value })}
            className={INPUT_CLASS}
            placeholder="name@example.com"
          />
          {errors.email ? (
            <p className="mt-1 text-xs text-brand-red">{errors.email}</p>
          ) : null}
        </label>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {PASSENGER_GROUPS.map((group, index) => {
          const value = data[group.key];
          const canDecrease = value > group.min;
          const canIncrease = value < group.max;

          return (
            <article
              key={group.key}
              className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-sm"
            >
              <p className="text-sm font-medium text-white">{copy.groups[index][0]}</p>
              <p className="mt-1.5 text-sm font-medium text-white/70">{copy.groups[index][1]}</p>

              <div className="mt-6 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => canDecrease && onChange({ [group.key]: value - 1 })}
                  disabled={!canDecrease}
                  className={[
                    COUNTER_BUTTON_CLASS,
                    !canDecrease && "cursor-not-allowed opacity-40",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <Minus className="h-4 w-4" />
                </button>

                <span className="font-display text-3xl font-black text-white">
                  {value}
                </span>

                <button
                  type="button"
                  onClick={() => canIncrease && onChange({ [group.key]: value + 1 })}
                  disabled={!canIncrease}
                  className={[
                    COUNTER_BUTTON_CLASS,
                    !canIncrease && "cursor-not-allowed opacity-40",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
