// src/components/umrah-calculator/UmrahCalculatorWizard.tsx
"use client";

import { useCallback, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Check, LoaderCircle } from "lucide-react";
import { useLocale } from "next-intl";

import { Button } from "@/components/ui/Button";
import { Turnstile } from "@/components/shared/Turnstile";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { EMAIL_REGEX, hasValidDateRange, WIZARD_CARD_CLASS } from "@/lib/validation";

import { computeDerivedValues } from "./calculations";
import {
  AIRLINES,
  INITIAL_WIZARD_STATE,
  MADINAH_HOTELS,
  MAKKAH_HOTELS,
  PK_CITIES,
  ROOM_TYPES,
  SAUDI_CITIES,
  TRANSPORT_OPTIONS,
  type TransportOption,
} from "./config";
import { isUrdu, umrahCopy, type UmrahErrorCopy } from "./copy";
import { SuccessScreen } from "./SuccessScreen";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { Step5 } from "./Step5";
import { Step6Review } from "./Step6Review";
import type {
  FlightLeg,
  HotelBlock,
  Step1Data,
  Step2Data,
  Step5Data,
  WizardState,
} from "./types";

type UmrahCalculatorWizardProps = {
  initialAirlines?: string[];
  initialPakistanCities?: string[];
  initialSaudiCities?: string[];
  initialRoomTypes?: string[];
  initialMakkahHotels?: string[];
  initialMadinahHotels?: string[];
  initialTransportOptions?: TransportOption[];
};

function validateFlightLeg(
  prefix: "departureFlight" | "returnFlight",
  flight: FlightLeg,
  nextErrors: Record<string, string>,
  errorCopy: UmrahErrorCopy,
) {
  if (!flight.airline) nextErrors[`${prefix}_airline`] = errorCopy.airline;
  if (!flight.from) nextErrors[`${prefix}_from`] = errorCopy.departureCity;
  if (!flight.to) nextErrors[`${prefix}_to`] = errorCopy.arrivalCity;
  if (!flight.date) nextErrors[`${prefix}_date`] = errorCopy.travelDate;
}

function validateHotels(
  hotels: HotelBlock[],
  nextErrors: Record<string, string>,
  errorCopy: UmrahErrorCopy,
) {
  if (hotels.length === 0) {
    nextErrors.hotels = errorCopy.hotelBlock;
    return;
  }

  for (const block of hotels) {
    if (!block.roomType) {
      nextErrors[`hotel_${block.id}_roomType`] = errorCopy.roomType;
    }

    if (!block.hotelName) {
      nextErrors[`hotel_${block.id}_hotelName`] = errorCopy.hotel;
    }

    if (block.rooms < 1) {
      nextErrors[`hotel_${block.id}_rooms`] = errorCopy.rooms;
    }

    if (!block.checkIn) {
      nextErrors[`hotel_${block.id}_checkIn`] = errorCopy.checkIn;
    }

    if (!block.checkOut) {
      nextErrors[`hotel_${block.id}_checkOut`] = errorCopy.checkOut;
    }

    if (block.checkIn && block.checkOut && !hasValidDateRange(block.checkIn, block.checkOut)) {
      nextErrors[`hotel_${block.id}_checkOut`] = errorCopy.dateOrder;
    }
  }
}

function StepIndicator({
  currentStep,
  labels,
}: {
  currentStep: number;
  labels: readonly string[];
}) {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between gap-2">
        {labels.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div key={label} className="flex min-w-0 flex-1 items-start">
              <div className="flex flex-1 flex-col items-center">
                <div className="relative">
                  {isActive ? (
                    <span className="absolute inset-0 animate-ping rounded-full bg-accent/35" />
                  ) : null}
                  <span
                    className={[
                      "relative flex h-11 w-11 items-center justify-center rounded-full border text-sm font-bold transition",
                      isCompleted && "border-gold/40 bg-gold/20 text-gold",
                      isActive && "border-accent bg-accent text-accent-foreground ring-2 ring-accent-ring ring-offset-2 ring-offset-background",
                      !isCompleted && !isActive && "border-border bg-surface-muted text-foreground-subtle",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : stepNumber}
                  </span>
                </div>
                <span className="mt-3 hidden text-[10px] font-medium uppercase tracking-[0.18em] text-foreground-muted sm:block">
                  {label}
                </span>
              </div>
              {stepNumber < labels.length ? (
                <div className="mt-5 h-px flex-1 bg-border" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function UmrahCalculatorWizard({
  initialAirlines,
  initialPakistanCities,
  initialSaudiCities,
  initialRoomTypes,
  initialMakkahHotels,
  initialMadinahHotels,
  initialTransportOptions,
}: UmrahCalculatorWizardProps) {
  const locale = useLocale();
  const copy = umrahCopy[isUrdu(locale) ? "ur" : "en"];
  const airlines = initialAirlines ?? [...AIRLINES];
  const pakistanCities = initialPakistanCities ?? [...PK_CITIES];
  const saudiCities = initialSaudiCities ?? [...SAUDI_CITIES];
  const roomTypes = initialRoomTypes ?? [...ROOM_TYPES];
  const makkahHotels = initialMakkahHotels ?? [...MAKKAH_HOTELS];
  const madinahHotels = initialMadinahHotels ?? [...MADINAH_HOTELS];
  const transportOptions = initialTransportOptions ?? TRANSPORT_OPTIONS;
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [formData, setFormData] = useState<WizardState>(INITIAL_WIZARD_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const handleTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken("");
  }, []);

  function updateStep1(data: Partial<Step1Data>) {
    setFormData((prev) => ({ ...prev, step1: { ...prev.step1, ...data } }));
  }

  function updateStep2(data: Partial<Step2Data>) {
    setFormData((prev) => ({ ...prev, step2: { ...prev.step2, ...data } }));
  }

  function updateStep3(hotels: HotelBlock[]) {
    setFormData((prev) => ({ ...prev, step3: { hotels } }));
  }

  function updateStep4(hotels: HotelBlock[]) {
    setFormData((prev) => ({ ...prev, step4: { hotels } }));
  }

  function updateStep5(data: Partial<Step5Data>) {
    setFormData((prev) => ({ ...prev, step5: { ...prev.step5, ...data } }));
  }

  function validateCurrentStep(): boolean {
    const nextErrors: Record<string, string> = {};

    if (currentStep === 1) {
      const digits = formData.step1.contactNumber.replace(/\D/g, "");

      if (formData.step1.passengerName.trim().length < 2) {
        nextErrors.passengerName = copy.errors.passengerName;
      }

      if (digits.length < 10) {
        nextErrors.contactNumber = copy.errors.contactNumber;
      }

      if (!EMAIL_REGEX.test(formData.step1.email)) {
        nextErrors.email = copy.errors.email;
      }

      if (formData.step1.adults < 1) {
        nextErrors.adults = copy.errors.adults;
      }
    }

    if (currentStep === 2) {
      validateFlightLeg("departureFlight", formData.step2.departureFlight, nextErrors, copy.errors);
      validateFlightLeg("returnFlight", formData.step2.returnFlight, nextErrors, copy.errors);
    }

    if (currentStep === 3) {
      validateHotels(formData.step3.hotels, nextErrors, copy.errors);
    }

    if (currentStep === 4) {
      validateHotels(formData.step4.hotels, nextErrors, copy.errors);
    }

    if (currentStep === 5) {
      if (!formData.step5.transportVisa) {
        nextErrors.transportVisa = copy.errors.transportVisa;
      }

      const exchangeRate = Number(formData.step5.exchangeRate);
      if (!Number.isFinite(exchangeRate) || exchangeRate <= 0) {
        nextErrors.exchangeRate = copy.errors.exchangeRate;
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goNext() {
    const valid = validateCurrentStep();
    if (!valid) return;

    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, 6));
  }

  function goBack() {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 1));
  }

  async function handleSubmit() {
    if (isSubmitting || submitSuccess) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const derived = computeDerivedValues(formData, transportOptions);

    const payload = {
      passengerName: formData.step1.passengerName,
      contactNumber: formData.step1.contactNumber,
      email: formData.step1.email,
      adults: formData.step1.adults,
      children: formData.step1.children,
      infants: formData.step1.infants,
      departureFlight: formData.step2.departureFlight,
      returnFlight: formData.step2.returnFlight,
      makkahHotels: formData.step3.hotels.map((hotel) => {
        const { id, ...rest } = hotel;
        void id;
        return rest;
      }),
      madinahHotels: formData.step4.hotels.map((hotel) => {
        const { id, ...rest } = hotel;
        void id;
        return rest;
      }),
      transportVisa: formData.step5.transportVisa,
      coupon: formData.step5.coupon,
      ticketAdult: formData.step5.ticketAdult,
      ticketChild: formData.step5.ticketChild,
      ticketInfant: formData.step5.ticketInfant,
      exchangeRate: formData.step5.exchangeRate,
      makkahNights: derived.makkahNights,
      madinahNights: derived.madinahNights,
      transportSAR: derived.transportSAR,
      transportPKR: derived.transportPKR,
      ticketGrandTotal: derived.ticketGrandTotal,
      turnstileToken,
    };

    try {
      const res = await fetch("/api/umrah-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json() as {
        ok: boolean;
        error?: string;
        message?: string;
        referenceId?: string;
      };
      if (!res.ok || !result.ok) throw new Error(result.error ?? copy.nav.submissionFailed);
      setReferenceId(result.referenceId ?? "");
      setSubmitSuccess(true);
    } catch (err) {
      setSubmitError(
        isUrdu(locale) || !(err instanceof Error) ? copy.nav.genericError : err.message,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitSuccess) {
    return (
      <div className={WIZARD_CARD_CLASS}>
        <SuccessScreen
          referenceId={referenceId}
          contactNumber={formData.step1.contactNumber}
          email={formData.step1.email}
        />
      </div>
    );
  }

  return (
    <div className={WIZARD_CARD_CLASS}>
      <StepIndicator currentStep={currentStep} labels={copy.steps} />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          variants={{
            enter: (dir: 1 | -1) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (dir: 1 | -1) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
          }}
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
        >
          {currentStep === 1 && (
            <Step1 data={formData.step1} errors={errors} onChange={updateStep1} />
          )}
          {currentStep === 2 && (
            <Step2
              data={formData.step2}
              airlineOptions={airlines}
              pakistanCityOptions={pakistanCities}
              saudiCityOptions={saudiCities}
              errors={errors}
              onChange={updateStep2}
            />
          )}
          {currentStep === 3 && (
            <Step3
              hotels={formData.step3.hotels}
              hotelOptions={makkahHotels}
              roomTypeOptions={roomTypes}
              errors={errors}
              onChange={updateStep3}
            />
          )}
          {currentStep === 4 && (
            <Step4
              hotels={formData.step4.hotels}
              hotelOptions={madinahHotels}
              roomTypeOptions={roomTypes}
              errors={errors}
              onChange={updateStep4}
            />
          )}
          {currentStep === 5 && (
            <Step5
              data={formData.step5}
              transportOptions={transportOptions}
              errors={errors}
              onChange={updateStep5}
              passengers={{
                adults: formData.step1.adults,
                children: formData.step1.children,
                infants: formData.step1.infants,
              }}
            />
          )}
          {currentStep === 6 && (
            <Step6Review
              formData={formData}
              transportOptions={transportOptions}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Turnstile renders on review step (Step 6) */}
      {currentStep === 6 ? (
        <div className="mt-4">
          <Turnstile
            onToken={handleTurnstileToken}
            onError={handleTurnstileError}
            action="umrah-quote"
          />
          <p className="mt-1 text-xs text-foreground-subtle">
            {isUrdu(locale) ? "آپ انسان ہیں، تصدیق ہو رہی ہے…" : "Verifying you're human…"}
          </p>
        </div>
      ) : null}

      <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
        <div>
          {currentStep > 1 ? (
            <Button
              variant="outline"
              onClick={goBack}
              className="border-foreground/30 text-foreground hover:border-foreground hover:bg-foreground hover:text-background"
            >
              {copy.nav.previous}
            </Button>
          ) : null}
        </div>

        <div>
          {currentStep < 6 ? (
            <Button variant="primary" onClick={goNext}>
              {copy.nav.next}
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={isSubmitting || !turnstileToken}
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  {copy.nav.sending}
                </>
              ) : (
                copy.nav.submit
              )}
            </Button>
          )}
        </div>
      </div>

      {submitError ? (
        <div className="mt-4 rounded-2xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger">
          {submitError}
        </div>
      ) : null}
    </div>
  );
}
