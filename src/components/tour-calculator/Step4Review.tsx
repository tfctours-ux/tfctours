// src/components/tour-calculator/Step4Review.tsx
"use client";

import type { ReactNode } from "react";

import { useLocale } from "next-intl";

import {
  computeNights,
  computeTourDerived,
  formatPKR,
} from "./calculations";
import { isUrdu, tourCopy } from "./copy";
import type { TourWizardState } from "./types";

interface Step4ReviewProps {
  formData: TourWizardState;
  onCouponChange: (coupon: string) => void;
}

const MAP_PIN = "\u{1F4CD}";
const PLANE = "\u2708";
const EM_DASH = "\u2014";
const RIGHT_ARROW = "\u2192";
const MULTIPLY = "\u00D7";

interface ReviewCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

interface ReviewRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

function ReviewCard({ title, children, className }: ReviewCardProps) {
  return (
    <article
      className={[
        "rounded-[2rem] border border-border bg-surface-elevated/40 p-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold">
        {title}
      </p>
      <div className="mt-4">{children}</div>
    </article>
  );
}

function ReviewRow({ label, value, highlight = false }: ReviewRowProps) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border py-2 last:border-0">
      <span className="text-sm text-foreground-muted">{label}</span>
      <span
        className={[
          "text-right text-sm font-medium text-foreground",
          highlight && "font-display text-base font-bold text-gold",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {value}
      </span>
    </div>
  );
}

export function Step4Review({ formData, onCouponChange }: Step4ReviewProps) {
  const locale = useLocale();
  const copy = tourCopy[isUrdu(locale) ? "ur" : "en"].review;
  const derived = computeTourDerived(formData);

  return (
    <section>
      <h2 className="font-display text-2xl font-black text-foreground">
        {copy.title}
      </h2>
      <p className="mb-6 mt-2 text-sm text-foreground-muted">
        {copy.description}
      </p>

      <div className="mb-8 rounded-[2rem] border border-border bg-surface-elevated/40 p-5">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.32em] text-gold">
          {copy.couponTitle}
        </p>
        <input
          type="text"
          placeholder={copy.couponPlaceholder}
          value={formData.step4.coupon}
          onChange={(event) => onCouponChange(event.target.value)}
          className="w-full rounded-2xl border border-input-border bg-input px-4 py-3 text-input-foreground placeholder:text-input-placeholder outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-ring/30"
        />
        <p className="mt-2 text-xs text-foreground-subtle">
          {copy.couponNote}
        </p>
      </div>

      <div className="space-y-6">
        <ReviewCard title={copy.customer}>
          <ReviewRow label={copy.name} value={formData.step1.passengerName} />
          <ReviewRow label={copy.contact} value={formData.step1.contactNumber} />
          <ReviewRow label={copy.email} value={formData.step1.email} />
        </ReviewCard>

        <ReviewCard title={copy.passengers}>
          <ReviewRow label={copy.adults} value={`${formData.step1.adults} (${copy.age12})`} />
          <ReviewRow label={copy.children} value={`${formData.step1.children} (${copy.age2to11})`} />
          <ReviewRow label={copy.infants} value={`${formData.step1.infants} (${copy.under2})`} />
          <ReviewRow
            label={copy.totalPassengers}
            value={String(derived.totalPassengers)}
            highlight
          />
        </ReviewCard>

        <ReviewCard title={copy.countriesHotels}>
          {derived.countries.map((country) => {
            const sourceCountry = formData.step2.countries.find(
              (block) => block.id === country.countryId,
            );

            return (
              <div key={country.countryId} className="mt-4 first:mt-0">
                <p className="mb-3 text-xs font-bold uppercase text-foreground-muted">
                  {MAP_PIN} {country.country || copy.selectedCountry}
                </p>

                {country.hotels.map((derivedHotel) => {
                  const hotel = sourceCountry?.hotels.find(
                    (entry) => entry.id === derivedHotel.hotelId,
                  );
                  const nights = hotel
                    ? computeNights(hotel.checkIn, hotel.checkOut)
                    : derivedHotel.nights;
                  const rate = parseFloat(hotel?.pricePerNight ?? "") || 0;

                  return (
                    <div
                      key={derivedHotel.hotelId}
                      className="mb-4 rounded-[1.5rem] border border-border bg-surface-muted p-4 last:mb-0"
                    >
                      <ReviewRow label={copy.hotelName} value={hotel?.hotelName || copy.notProvided} />
                      <ReviewRow
                        label={copy.checkInOut}
                        value={`${hotel?.checkIn || EM_DASH} ${RIGHT_ARROW} ${hotel?.checkOut || EM_DASH}`}
                      />
                      <ReviewRow label={copy.nights} value={`${nights} ${copy.nightsLower}`} />
                      <ReviewRow label={copy.rate} value={`${formatPKR(rate)} / ${copy.night}`} />
                      <ReviewRow
                        label={copy.hotelCost}
                        value={formatPKR(derivedHotel.totalCost)}
                      />
                    </div>
                  );
                })}

                <div className="flex items-baseline justify-between gap-4 border-b border-border py-2 last:border-0">
                  <span className="text-sm font-semibold text-foreground">
                    {country.country || copy.countryFallback} {copy.subtotal}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {formatPKR(country.countryCost)}
                  </span>
                </div>
              </div>
            );
          })}

          <div className="mt-4">
            <ReviewRow
              label={copy.totalHotelNights}
              value={`${derived.totalHotelNights} ${copy.nightsLower}`}
              highlight
            />
            <ReviewRow
              label={copy.totalHotelCost}
              value={formatPKR(derived.totalHotelCost)}
              highlight
            />
          </div>
        </ReviewCard>

        <ReviewCard title={copy.flights}>
          {derived.flights.map((derivedFlight, index) => {
            const flight = formData.step3.flights.find(
              (entry) => entry.id === derivedFlight.flightId,
            );

            if (!flight) return null;

            return (
              <div key={derivedFlight.flightId} className="mt-4 first:mt-0">
                <p className="mb-3 text-xs font-bold uppercase text-foreground-muted">
                  {PLANE} {copy.flight} {index + 1}: {flight.from || EM_DASH} {RIGHT_ARROW}{" "}
                  {flight.to || EM_DASH}
                </p>
                <div className="rounded-[1.5rem] border border-border bg-surface-muted p-4">
                  <ReviewRow label={copy.airline} value={flight.airline || copy.notProvided} />
                  <ReviewRow
                    label={copy.date}
                    value={[flight.date, flight.time].filter(Boolean).join(" ") || copy.notProvided}
                  />
                  <ReviewRow
                    label={copy.adultTickets}
                    value={`${formatPKR(derivedFlight.adultTotal)} (${formData.step1.adults} ${MULTIPLY} ${flight.ticketAdult || "0"})`}
                  />
                  {formData.step1.children > 0 ? (
                    <ReviewRow
                      label={copy.childTickets}
                      value={`${formatPKR(derivedFlight.childTotal)} (${formData.step1.children} ${MULTIPLY} ${flight.ticketChild || "0"})`}
                    />
                  ) : null}
                  {formData.step1.infants > 0 ? (
                    <ReviewRow
                      label={copy.infantTickets}
                      value={`${formatPKR(derivedFlight.infantTotal)} (${formData.step1.infants} ${MULTIPLY} ${flight.ticketInfant || "0"})`}
                    />
                  ) : null}
                  <ReviewRow
                    label={copy.flightTotal}
                    value={formatPKR(derivedFlight.flightTotal)}
                  />
                </div>
              </div>
            );
          })}

          <div className="mt-4">
            <ReviewRow
              label={copy.totalFlightCost}
              value={formatPKR(derived.totalFlightCost)}
              highlight
            />
          </div>
        </ReviewCard>

        <ReviewCard title={copy.coupon}>
          <ReviewRow
            label={copy.couponCode}
            value={formData.step4.coupon || copy.none}
          />
          {formData.step4.coupon ? (
            <p className="mt-3 text-sm text-foreground-muted">
              {copy.discountNote}
            </p>
          ) : null}
        </ReviewCard>

        <ReviewCard
          title={copy.totalSummary}
          className="border-gold/20 bg-gold/10"
        >
          <ReviewRow label={copy.totalHotelCost} value={formatPKR(derived.totalHotelCost)} />
          <ReviewRow label={copy.totalFlightCost} value={formatPKR(derived.totalFlightCost)} />

          <div className="my-4 h-px bg-border" />

          <div className="flex items-end justify-between gap-4">
            <span className="text-sm text-foreground-muted">{copy.grandTotal}</span>
            <span className="font-display text-2xl font-bold text-gold">
              {formatPKR(derived.grandTotal)}
            </span>
          </div>

          <p className="mt-5 border-t border-border pt-4 text-xs leading-5 text-foreground-subtle">
            {copy.estimateNote}
          </p>
        </ReviewCard>
      </div>
    </section>
  );
}
