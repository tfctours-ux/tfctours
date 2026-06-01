// src/components/umrah-calculator/Step5.tsx
"use client";

import { useLocale } from "next-intl";

import type { TransportOption } from "./config";
import { isUrdu, umrahCopy } from "./copy";
import type { Step5Data } from "./types";

const INPUT_CLASS =
  "w-full rounded-2xl border border-input-border bg-input px-4 py-3 text-input-foreground placeholder:text-input-placeholder outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-ring/30 autofill:shadow-[inset_0_0_0_1000px_rgb(var(--tfc-input))] autofill:[-webkit-text-fill-color:rgb(var(--tfc-input-foreground))]";
const SELECT_CLASS = `${INPUT_CLASS} appearance-none`;
const ERROR_CLASS = "mt-1 text-xs text-danger";
const TITLE_CLASS = "font-display text-2xl font-black text-foreground";
const SUB_LABEL_CLASS = "mb-2 text-sm font-medium text-foreground-muted";

interface Step5Props {
  data: Step5Data;
  transportOptions: TransportOption[];
  errors: Record<string, string>;
  onChange: (d: Partial<Step5Data>) => void;
  passengers: { adults: number; children: number; infants: number };
}

export function Step5({
  data,
  transportOptions,
  errors,
  onChange,
  passengers,
}: Step5Props) {
  const locale = useLocale();
  const copy = umrahCopy[isUrdu(locale) ? "ur" : "en"].step5;
  const selectedOption =
    transportOptions.find((option) => option.label === data.transportVisa) ?? null;
  const rate = Number.parseFloat(data.exchangeRate || "0") || 0;
  const ticketAdult = Number.parseFloat(data.ticketAdult || "0") || 0;
  const ticketChild = Number.parseFloat(data.ticketChild || "0") || 0;
  const ticketInfant = Number.parseFloat(data.ticketInfant || "0") || 0;
  const totalPassengers =
    passengers.adults + passengers.children + passengers.infants;

  return (
    <div className="space-y-6">
      <div>
        <h2 className={TITLE_CLASS}>{copy.title}</h2>
        <p className="mt-3 text-sm leading-7 text-foreground-muted">
          {copy.description}
        </p>
      </div>

      <div>
        <label className={SUB_LABEL_CLASS}>{copy.package}</label>
        <select
          value={data.transportVisa}
          onChange={(event) => onChange({ transportVisa: event.target.value })}
          className={SELECT_CLASS}
        >
          <option value="" className="bg-input text-input-foreground">{copy.selectPackage}</option>
          {transportOptions.map((option) => (
            <option key={option.label} value={option.label} className="bg-input text-input-foreground">
              {`${option.label} \u2014 ${option.sar} SAR`}
            </option>
          ))}
        </select>
        {errors.transportVisa ? (
          <p className={ERROR_CLASS}>{errors.transportVisa}</p>
        ) : null}
        {selectedOption ? (
          <div className="mt-3">
            <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs text-gold">
              {selectedOption.sar} SAR {copy.selected}
            </span>
          </div>
        ) : null}
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <label className={SUB_LABEL_CLASS}>{copy.adultTicket}</label>
          <input
            type="number"
            min="0"
            value={data.ticketAdult}
            onChange={(event) => onChange({ ticketAdult: event.target.value })}
            className={INPUT_CLASS}
            placeholder="0"
          />
        </div>
        <div>
          <label className={SUB_LABEL_CLASS}>{copy.childTicket}</label>
          <input
            type="number"
            min="0"
            value={data.ticketChild}
            onChange={(event) => onChange({ ticketChild: event.target.value })}
            className={INPUT_CLASS}
            placeholder="0"
          />
        </div>
        <div>
          <label className={SUB_LABEL_CLASS}>{copy.infantTicket}</label>
          <input
            type="number"
            min="0"
            value={data.ticketInfant}
            onChange={(event) => onChange({ ticketInfant: event.target.value })}
            className={INPUT_CLASS}
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label className={SUB_LABEL_CLASS}>{copy.exchangeRate}</label>
        <input
          type="number"
          min="1"
          value={data.exchangeRate}
          onChange={(event) => onChange({ exchangeRate: event.target.value })}
          className={INPUT_CLASS}
          placeholder={copy.exchangePlaceholder}
        />
        {errors.exchangeRate ? (
          <p className={ERROR_CLASS}>{errors.exchangeRate}</p>
        ) : null}
      </div>

      <div>
        <label className={SUB_LABEL_CLASS}>{copy.coupon}</label>
        <input
          type="text"
          value={data.coupon}
          onChange={(event) => onChange({ coupon: event.target.value })}
          className={INPUT_CLASS}
          placeholder={copy.couponPlaceholder}
        />
        <p className="mt-2 text-xs text-foreground-muted">
          {copy.couponNote}
        </p>
      </div>

      <div className="rounded-[2rem] border border-gold/20 bg-surface-elevated/40 p-6 backdrop-blur-sm">
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold">
          {copy.totals}
        </p>
        <div className="mt-5 space-y-3 text-sm text-foreground-muted">
          <div className="flex items-center justify-between gap-4">
            <span>{copy.totalPassengers}</span>
            <span className="font-semibold text-foreground">{totalPassengers}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>{copy.transportCost}</span>
            <span className="text-right font-semibold text-foreground">
              {selectedOption?.sar ?? 0} SAR ={" "}
              {Math.round((selectedOption?.sar ?? 0) * rate)} PKR
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>{copy.ticketAdults}</span>
            <span className="text-right font-semibold text-foreground">
              {data.ticketAdult || 0} {"\u00D7"} {passengers.adults} ={" "}
              {Math.round(ticketAdult * passengers.adults)} PKR
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>{copy.ticketChildren}</span>
            <span className="text-right font-semibold text-foreground">
              {data.ticketChild || 0} {"\u00D7"} {passengers.children} ={" "}
              {Math.round(ticketChild * passengers.children)} PKR
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>{copy.ticketInfants}</span>
            <span className="text-right font-semibold text-foreground">
              {data.ticketInfant || 0} {"\u00D7"} {passengers.infants} ={" "}
              {Math.round(ticketInfant * passengers.infants)} PKR
            </span>
          </div>
        </div>
        <p className="mt-5 text-xs text-foreground-muted">
          {copy.hotelNote}
        </p>
      </div>
    </div>
  );
}
