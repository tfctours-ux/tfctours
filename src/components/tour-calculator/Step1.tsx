// src/components/tour-calculator/Step1.tsx
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
  "w-full rounded-2xl border border-input-border bg-input px-4 py-3 text-input-foreground placeholder:text-input-placeholder outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-ring/30 autofill:shadow-[inset_0_0_0_1000px_rgb(var(--tfc-input))] autofill:[-webkit-text-fill-color:rgb(var(--tfc-input-foreground))]";
const COUNTER_BUTTON_CLASS =
  "flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-accent-soft text-accent transition hover:bg-accent hover:text-accent-foreground";
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
      <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold">
        {copy.step}
      </p>
      <h2 className="mt-4 font-display text-3xl font-black text-foreground">
        {copy.title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground-muted">
        {copy.description}
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground-muted">
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
            <p className="mt-1 text-xs text-danger">{errors.passengerName}</p>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground-muted">
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
            <p className="mt-1 text-xs text-danger">{errors.contactNumber}</p>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground-muted">
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
            <p className="mt-1 text-xs text-danger">{errors.email}</p>
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
              className="rounded-[2rem] border border-border bg-surface-elevated/40 p-5 backdrop-blur-sm"
            >
              <p className="text-sm font-medium text-foreground">{copy.groups[index][0]}</p>
              <p className="mt-1.5 text-sm font-medium text-foreground-muted">{copy.groups[index][1]}</p>

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

                <span className="font-display text-3xl font-black text-foreground">
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
