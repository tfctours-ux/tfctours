// src/components/umrah-calculator/Step1.tsx
"use client";

import { useLocale } from "next-intl";

import { isUrdu, umrahCopy } from "./copy";
import type { Step1Data } from "./types";

const SURFACE_CARD_CLASS =
  "rounded-[2rem] border border-border bg-surface-elevated/40 backdrop-blur-sm";
const INPUT_CLASS =
  "w-full rounded-2xl border border-input-border bg-input px-4 py-3 text-input-foreground placeholder:text-input-placeholder outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-ring/30 autofill:shadow-[inset_0_0_0_1000px_rgb(var(--tfc-input))] autofill:[-webkit-text-fill-color:rgb(var(--tfc-input-foreground))]";
const ERROR_CLASS = "mt-1 text-xs text-danger";
const TITLE_CLASS = "font-display text-2xl font-black text-foreground";
const SUB_LABEL_CLASS = "mb-2 text-sm font-medium text-foreground-muted";
const COUNTER_BUTTON_CLASS =
  "flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-accent-soft text-accent hover:bg-accent hover:text-accent-foreground";

interface Step1Props {
  data: Step1Data;
  errors: Record<string, string>;
  onChange: (d: Partial<Step1Data>) => void;
}

interface CounterCardProps {
  label: string;
  subtext: string;
  value: number;
  min: number;
  max: number;
  error?: string;
  decreaseLabel: string;
  increaseLabel: string;
  onChange: (value: number) => void;
}

function CounterCard({
  label,
  subtext,
  value,
  min,
  max,
  error,
  decreaseLabel,
  increaseLabel,
  onChange,
}: CounterCardProps) {
  return (
    <div className={`${SURFACE_CARD_CLASS} p-5`}>
      <p className="text-lg font-semibold text-foreground">{label}</p>
      <p className="mt-1 text-sm text-foreground-muted">{subtext}</p>

      <div className="mt-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className={`${COUNTER_BUTTON_CLASS} disabled:cursor-not-allowed disabled:opacity-45`}
          aria-label={`${decreaseLabel} ${label}`}
        >
          -
        </button>
        <span className="text-2xl font-bold text-foreground">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className={`${COUNTER_BUTTON_CLASS} disabled:cursor-not-allowed disabled:opacity-45`}
          aria-label={`${increaseLabel} ${label}`}
        >
          +
        </button>
      </div>

      {error ? <p className={ERROR_CLASS}>{error}</p> : null}
    </div>
  );
}

export function Step1({ data, errors, onChange }: Step1Props) {
  const locale = useLocale();
  const copy = umrahCopy[isUrdu(locale) ? "ur" : "en"].step1;

  return (
    <div className="space-y-6">
      <div>
        <h2 className={TITLE_CLASS}>{copy.title}</h2>
        <p className="mt-3 text-sm leading-7 text-foreground-muted">
          {copy.description}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <label htmlFor="passengerName" className={SUB_LABEL_CLASS}>
            {copy.passengerName}
          </label>
          <input
            id="passengerName"
            name="passengerName"
            required
            value={data.passengerName}
            onChange={(event) => onChange({ passengerName: event.target.value })}
            className={INPUT_CLASS}
            placeholder={copy.passengerPlaceholder}
          />
          {errors.passengerName ? (
            <p className={ERROR_CLASS}>{errors.passengerName}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contactNumber" className={SUB_LABEL_CLASS}>
            {copy.contactNumber}
          </label>
          <input
            id="contactNumber"
            name="contactNumber"
            type="tel"
            dir="ltr"
            value={data.contactNumber}
            onChange={(event) => onChange({ contactNumber: event.target.value })}
            className={INPUT_CLASS}
            placeholder="03XX XXXXXXX"
          />
          {errors.contactNumber ? (
            <p className={ERROR_CLASS}>{errors.contactNumber}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className={SUB_LABEL_CLASS}>
            {copy.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={(event) => onChange({ email: event.target.value })}
            className={INPUT_CLASS}
            placeholder={copy.emailPlaceholder}
          />
          {errors.email ? <p className={ERROR_CLASS}>{errors.email}</p> : null}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <CounterCard
          label={copy.passengers.adults[0]}
          subtext={copy.passengers.adults[1]}
          value={data.adults}
          min={1}
          max={20}
          error={errors.adults}
          decreaseLabel={copy.decrease}
          increaseLabel={copy.increase}
          onChange={(adults) => onChange({ adults })}
        />
        <CounterCard
          label={copy.passengers.children[0]}
          subtext={copy.passengers.children[1]}
          value={data.children}
          min={0}
          max={10}
          decreaseLabel={copy.decrease}
          increaseLabel={copy.increase}
          onChange={(children) => onChange({ children })}
        />
        <CounterCard
          label={copy.passengers.infants[0]}
          subtext={copy.passengers.infants[1]}
          value={data.infants}
          min={0}
          max={5}
          decreaseLabel={copy.decrease}
          increaseLabel={copy.increase}
          onChange={(infants) => onChange({ infants })}
        />
      </div>
    </div>
  );
}
