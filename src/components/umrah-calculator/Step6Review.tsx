// src/components/umrah-calculator/Step6Review.tsx
"use client";

import { useLocale } from "next-intl";

import { computeDerivedValues, computeNights, formatPKR } from "./calculations";
import type { TransportOption } from "./config";
import { isUrdu, umrahCopy, type UmrahReviewCopy } from "./copy";
import type { FlightLeg, HotelBlock, WizardState } from "./types";

const REVIEW_CARD_CLASS =
  "rounded-[2rem] border border-border bg-surface-elevated/40 p-6";
const SECTION_LABEL_CLASS =
  "mb-4 text-[10px] font-bold uppercase tracking-[0.32em] text-gold";
const EMPTY_VALUE = "\u2014";
const MULTIPLY_SIGN = "\u00D7";

interface Step6ReviewProps {
  formData: WizardState;
  transportOptions: TransportOption[];
}

interface ReviewRowProps {
  label: string;
  value: string | number;
  valueClassName?: string;
}

function ReviewRow({ label, value, valueClassName }: ReviewRowProps) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-foreground-muted">{label}</span>
      <span className={["font-medium text-foreground", valueClassName].filter(Boolean).join(" ")}>
        {value}
      </span>
    </div>
  );
}

function FlightSection({
  title,
  flight,
  copy,
}: {
  title: string;
  flight: FlightLeg;
  copy: UmrahReviewCopy;
}) {
  return (
    <div className="space-y-3">
      <p className="mb-2 text-xs font-semibold text-foreground-subtle">{title}</p>
      <ReviewRow label={copy.airline} value={flight.airline || EMPTY_VALUE} />
      <ReviewRow label={copy.from} value={flight.from || EMPTY_VALUE} />
      <ReviewRow label={copy.to} value={flight.to || EMPTY_VALUE} />
      <ReviewRow label={copy.date} value={flight.date || EMPTY_VALUE} />
      <ReviewRow label={copy.time} value={flight.time || EMPTY_VALUE} />
    </div>
  );
}

function HotelSection({
  block,
  index,
  copy,
}: {
  block: HotelBlock;
  index: number;
  copy: UmrahReviewCopy;
}) {
  return (
    <div className="space-y-3">
      <p className="mb-2 text-xs font-semibold text-foreground-subtle">{copy.hotelNumber} {index + 1}</p>
      <ReviewRow label={copy.hotel} value={block.hotelName || EMPTY_VALUE} />
      <ReviewRow label={copy.roomType} value={block.roomType || EMPTY_VALUE} />
      <ReviewRow label={copy.rooms} value={block.rooms} />
      <ReviewRow label={copy.checkIn} value={block.checkIn || EMPTY_VALUE} />
      <ReviewRow label={copy.checkOut} value={block.checkOut || EMPTY_VALUE} />
      <ReviewRow
        label={copy.nights}
        value={`${computeNights(block.checkIn, block.checkOut)} ${copy.nights}`}
      />
    </div>
  );
}

export function Step6Review({ formData, transportOptions }: Step6ReviewProps) {
  const locale = useLocale();
  const copy = umrahCopy[isUrdu(locale) ? "ur" : "en"].review;
  const derived = computeDerivedValues(formData, transportOptions);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-black text-foreground">
          {copy.title}
        </h2>
        <p className="mt-3 text-sm text-foreground-muted">
          {copy.description}
        </p>
      </div>

      <div className={REVIEW_CARD_CLASS}>
        <p className={SECTION_LABEL_CLASS}>{copy.customer}</p>
        <div className="space-y-3">
          <ReviewRow label={copy.name} value={formData.step1.passengerName || EMPTY_VALUE} />
          <ReviewRow label={copy.contact} value={formData.step1.contactNumber || EMPTY_VALUE} />
          <ReviewRow label={copy.email} value={formData.step1.email || EMPTY_VALUE} />
        </div>
      </div>

      <div className={REVIEW_CARD_CLASS}>
        <p className={SECTION_LABEL_CLASS}>{copy.passengers}</p>
        <div className="space-y-3">
          <ReviewRow label={copy.adults} value={formData.step1.adults} />
          <ReviewRow label={copy.children} value={formData.step1.children} />
          <ReviewRow label={copy.infants} value={formData.step1.infants} />
          <ReviewRow
            label={copy.totalPassengers}
            value={derived.totalPassengers}
            valueClassName="font-bold text-gold"
          />
        </div>
      </div>

      <div className={REVIEW_CARD_CLASS}>
        <p className={SECTION_LABEL_CLASS}>{copy.flights}</p>
        <div className="grid gap-6 md:grid-cols-2">
          <FlightSection title={copy.departure} flight={formData.step2.departureFlight} copy={copy} />
          <FlightSection title={copy.return} flight={formData.step2.returnFlight} copy={copy} />
        </div>
      </div>

      <div className={REVIEW_CARD_CLASS}>
        <p className={SECTION_LABEL_CLASS}>{copy.makkahHotels}</p>
        <div className="space-y-6">
          {formData.step3.hotels.map((block, index) => (
            <HotelSection key={block.id} block={block} index={index} copy={copy} />
          ))}
          <div className="border-t border-border pt-2">
            <ReviewRow
              label={copy.totalMakkahNights}
              value={`${derived.makkahNights} ${copy.nights}`}
              valueClassName="font-bold text-gold"
            />
          </div>
        </div>
      </div>

      <div className={REVIEW_CARD_CLASS}>
        <p className={SECTION_LABEL_CLASS}>{copy.madinahHotels}</p>
        <div className="space-y-6">
          {formData.step4.hotels.map((block, index) => (
            <HotelSection key={block.id} block={block} index={index} copy={copy} />
          ))}
          <div className="border-t border-border pt-2">
            <ReviewRow
              label={copy.totalMadinahNights}
              value={`${derived.madinahNights} ${copy.nights}`}
              valueClassName="font-bold text-gold"
            />
          </div>
        </div>
      </div>

      <div className={REVIEW_CARD_CLASS}>
        <p className={SECTION_LABEL_CLASS}>{copy.transportPricing}</p>
        <div className="space-y-3">
          <ReviewRow
            label={copy.transportPackage}
            value={formData.step5.transportVisa || EMPTY_VALUE}
          />
          <ReviewRow
            label={copy.transportCost}
            value={`${derived.transportSAR} SAR = ${formatPKR(derived.transportPKR)}`}
          />
          <ReviewRow
            label={copy.exchangeRate}
            value={`1 SAR = ${formData.step5.exchangeRate || EMPTY_VALUE} PKR`}
          />
          <ReviewRow
            label={copy.ticketAdults}
            value={`${formData.step5.ticketAdult || EMPTY_VALUE} ${MULTIPLY_SIGN} ${formData.step1.adults} = ${formatPKR(
              derived.ticketTotalAdult,
            )}`}
          />
          <ReviewRow
            label={copy.ticketChildren}
            value={`${formData.step5.ticketChild || EMPTY_VALUE} ${MULTIPLY_SIGN} ${formData.step1.children} = ${formatPKR(
              derived.ticketTotalChild,
            )}`}
          />
          <ReviewRow
            label={copy.ticketInfants}
            value={`${formData.step5.ticketInfant || EMPTY_VALUE} ${MULTIPLY_SIGN} ${formData.step1.infants} = ${formatPKR(
              derived.ticketTotalInfant,
            )}`}
          />
          <ReviewRow label={copy.couponCode} value={formData.step5.coupon || EMPTY_VALUE} />
        </div>
      </div>

      <div className="rounded-[2rem] border border-gold/20 bg-gold/10 p-6">
        <p className={SECTION_LABEL_CLASS}>{copy.totalSummary}</p>
        <div className="space-y-4">
          <div className="flex justify-between gap-4">
            <span className="text-sm text-foreground-muted">{copy.totalTicketCost}</span>
            <span className="font-display text-2xl font-black text-foreground">
              {formatPKR(derived.ticketGrandTotal)}
            </span>
          </div>
          <ReviewRow label={copy.transportCost} value={formatPKR(derived.transportPKR)} />
        </div>
        <div className="mt-4 border-t border-border pt-4 text-xs text-foreground-subtle">
          {copy.note}
        </div>
      </div>
    </div>
  );
}
