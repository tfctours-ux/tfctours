// src/components/umrah-calculator/Step2.tsx
"use client";

import { PlaneTakeoff } from "lucide-react";
import { useLocale } from "next-intl";

import { isUrdu, umrahCopy, type UmrahStep2Copy } from "./copy";
import type { FlightLeg, Step2Data } from "./types";

const SURFACE_CARD_CLASS =
  "rounded-[2rem] border border-border bg-surface-elevated/40 backdrop-blur-sm";
const INPUT_CLASS =
  "w-full rounded-2xl border border-input-border bg-input px-4 py-3 text-input-foreground placeholder:text-input-placeholder outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-ring/30 autofill:shadow-[inset_0_0_0_1000px_rgb(var(--tfc-input))] autofill:[-webkit-text-fill-color:rgb(var(--tfc-input-foreground))]";
const SELECT_CLASS = `${INPUT_CLASS} appearance-none`;
const ERROR_CLASS = "mt-1 text-xs text-danger";
const TITLE_CLASS = "font-display text-2xl font-black text-foreground";
const SUB_LABEL_CLASS = "mb-2 text-sm font-medium text-foreground-muted";

interface Step2Props {
  data: Step2Data;
  airlineOptions: string[];
  pakistanCityOptions: string[];
  saudiCityOptions: string[];
  errors: Record<string, string>;
  onChange: (d: Partial<Step2Data>) => void;
}

interface FlightPanelProps {
  title: string;
  prefix: "departureFlight" | "returnFlight";
  flight: FlightLeg;
  fromOptions: readonly string[];
  toOptions: readonly string[];
  airlineOptions: readonly string[];
  errors: Record<string, string>;
  onUpdate: (flight: FlightLeg) => void;
  copy: UmrahStep2Copy;
}

function FlightPanel({
  title,
  prefix,
  flight,
  fromOptions,
  toOptions,
  airlineOptions,
  errors,
  onUpdate,
  copy,
}: FlightPanelProps) {
  function update<K extends keyof FlightLeg>(key: K, value: FlightLeg[K]) {
    onUpdate({ ...flight, [key]: value });
  }

  return (
    <div className={`${SURFACE_CARD_CLASS} p-6`}>
      <div className="flex items-center gap-3">
        <PlaneTakeoff className="h-5 w-5 text-gold" />
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>

      <div className="mt-6 grid gap-4">
        <div>
          <label className={SUB_LABEL_CLASS}>{copy.airline}</label>
          <select
            value={flight.airline}
            onChange={(event) => update("airline", event.target.value)}
            className={SELECT_CLASS}
          >
            <option value="" className="bg-input text-input-foreground">{copy.selectAirline}</option>
            {airlineOptions.map((option) => (
              <option key={option} value={option} className="bg-input text-input-foreground">
                {option}
              </option>
            ))}
          </select>
          {errors[`${prefix}_airline`] ? (
            <p className={ERROR_CLASS}>{errors[`${prefix}_airline`]}</p>
          ) : null}
        </div>

        <div>
          <label className={SUB_LABEL_CLASS}>{copy.from}</label>
          <select
            value={flight.from}
            onChange={(event) => update("from", event.target.value)}
            className={SELECT_CLASS}
          >
            <option value="" className="bg-input text-input-foreground">{copy.selectDeparture}</option>
            {fromOptions.map((option) => (
              <option key={option} value={option} className="bg-input text-input-foreground">
                {option}
              </option>
            ))}
          </select>
          {errors[`${prefix}_from`] ? (
            <p className={ERROR_CLASS}>{errors[`${prefix}_from`]}</p>
          ) : null}
        </div>

        <div>
          <label className={SUB_LABEL_CLASS}>{copy.to}</label>
          <select
            value={flight.to}
            onChange={(event) => update("to", event.target.value)}
            className={SELECT_CLASS}
          >
            <option value="" className="bg-input text-input-foreground">{copy.selectArrival}</option>
            {toOptions.map((option) => (
              <option key={option} value={option} className="bg-input text-input-foreground">
                {option}
              </option>
            ))}
          </select>
          {errors[`${prefix}_to`] ? (
            <p className={ERROR_CLASS}>{errors[`${prefix}_to`]}</p>
          ) : null}
        </div>

        <div>
          <label className={SUB_LABEL_CLASS}>{copy.date}</label>
          <input
            type="date"
            value={flight.date}
            onChange={(event) => update("date", event.target.value)}
            className={INPUT_CLASS}
          />
          {errors[`${prefix}_date`] ? (
            <p className={ERROR_CLASS}>{errors[`${prefix}_date`]}</p>
          ) : null}
        </div>

        <div>
          <label className={SUB_LABEL_CLASS}>{copy.time}</label>
          <input
            type="time"
            value={flight.time}
            onChange={(event) => update("time", event.target.value)}
            className={INPUT_CLASS}
          />
          {errors[`${prefix}_time`] ? (
            <p className={ERROR_CLASS}>{errors[`${prefix}_time`]}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function Step2({
  data,
  airlineOptions,
  pakistanCityOptions,
  saudiCityOptions,
  errors,
  onChange,
}: Step2Props) {
  const locale = useLocale();
  const copy = umrahCopy[isUrdu(locale) ? "ur" : "en"].step2;

  return (
    <div className="space-y-6">
      <div>
        <h2 className={TITLE_CLASS}>{copy.title}</h2>
        <p className="mt-3 text-sm leading-7 text-foreground-muted">
          {copy.description}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FlightPanel
          title={copy.departure}
          prefix="departureFlight"
          flight={data.departureFlight}
          fromOptions={pakistanCityOptions}
          toOptions={saudiCityOptions}
          airlineOptions={airlineOptions}
          errors={errors}
          onUpdate={(departureFlight) => onChange({ departureFlight })}
          copy={copy}
        />
        <FlightPanel
          title={copy.return}
          prefix="returnFlight"
          flight={data.returnFlight}
          fromOptions={saudiCityOptions}
          toOptions={pakistanCityOptions}
          airlineOptions={airlineOptions}
          errors={errors}
          onUpdate={(returnFlight) => onChange({ returnFlight })}
          copy={copy}
        />
      </div>
    </div>
  );
}
