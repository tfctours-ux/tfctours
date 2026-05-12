"use client";

import { useLocale } from "next-intl";

import { TRANSPORT_OPTIONS } from "./config";
import { isUrdu, umrahCopy } from "./copy";
import type { Step5Data } from "./types";

const INPUT_CLASS =
  "w-full rounded-2xl border border-white/[0.08] bg-white/[0.05] px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-brand-red focus:bg-white/[0.08]";
const SELECT_CLASS = `${INPUT_CLASS} appearance-none`;
const ERROR_CLASS = "mt-1 text-xs text-brand-red";
const TITLE_CLASS = "font-display text-2xl font-black text-white";
const SUB_LABEL_CLASS = "mb-2 text-sm font-medium text-white/70";

interface Step5Props {
  data: Step5Data;
  errors: Record<string, string>;
  onChange: (d: Partial<Step5Data>) => void;
  passengers: { adults: number; children: number; infants: number };
}

export function Step5({ data, errors, onChange, passengers }: Step5Props) {
  const locale = useLocale();
  const copy = umrahCopy[isUrdu(locale) ? "ur" : "en"].step5;
  const selectedOption =
    TRANSPORT_OPTIONS.find((option) => option.label === data.transportVisa) ?? null;
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
        <p className="mt-3 text-sm leading-7 text-white/70">
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
          <option value="">{copy.selectPackage}</option>
          {TRANSPORT_OPTIONS.map((option) => (
            <option key={option.label} value={option.label}>
              {`${option.label} \u2014 ${option.sar} SAR`}
            </option>
          ))}
        </select>
        {errors.transportVisa ? (
          <p className={ERROR_CLASS}>{errors.transportVisa}</p>
        ) : null}
        {selectedOption ? (
          <div className="mt-3">
            <span className="rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1 text-xs text-brand-gold">
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
        <p className="mt-2 text-xs text-white/50">
          {copy.couponNote}
        </p>
      </div>

      <div className="rounded-[2rem] border border-brand-gold/20 bg-white/[0.04] p-6 backdrop-blur-sm">
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-gold">
          {copy.totals}
        </p>
        <div className="mt-5 space-y-3 text-sm text-white/78">
          <div className="flex items-center justify-between gap-4">
            <span>{copy.totalPassengers}</span>
            <span className="font-semibold text-white">{totalPassengers}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>{copy.transportCost}</span>
            <span className="text-right font-semibold text-white">
              {selectedOption?.sar ?? 0} SAR ={" "}
              {Math.round((selectedOption?.sar ?? 0) * rate)} PKR
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>{copy.ticketAdults}</span>
            <span className="text-right font-semibold text-white">
              {data.ticketAdult || 0} {"\u00D7"} {passengers.adults} ={" "}
              {Math.round(ticketAdult * passengers.adults)} PKR
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>{copy.ticketChildren}</span>
            <span className="text-right font-semibold text-white">
              {data.ticketChild || 0} {"\u00D7"} {passengers.children} ={" "}
              {Math.round(ticketChild * passengers.children)} PKR
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>{copy.ticketInfants}</span>
            <span className="text-right font-semibold text-white">
              {data.ticketInfant || 0} {"\u00D7"} {passengers.infants} ={" "}
              {Math.round(ticketInfant * passengers.infants)} PKR
            </span>
          </div>
        </div>
        <p className="mt-5 text-xs text-white/50">
          {copy.hotelNote}
        </p>
      </div>
    </div>
  );
}
