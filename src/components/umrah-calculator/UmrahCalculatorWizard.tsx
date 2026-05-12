"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Check, LoaderCircle } from "lucide-react";
import { useLocale } from "next-intl";

import { Button } from "@/components/ui/Button";
import { EASE_OUT_EXPO } from "@/lib/motion";

import { computeDerivedValues } from "./calculations";
import { INITIAL_WIZARD_STATE } from "./config";
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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WIZARD_CARD_CLASS =
  "rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl md:p-8";

function hasValidHotelDates(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return false;
  return new Date(checkOut).getTime() > new Date(checkIn).getTime();
}

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

    if (block.checkIn && block.checkOut && !hasValidHotelDates(block.checkIn, block.checkOut)) {
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
                    <span className="absolute inset-0 animate-ping rounded-full bg-brand-red/35" />
                  ) : null}
                  <span
                    className={[
                      "relative flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold transition",
                      isCompleted && "bg-brand-gold text-brand-black",
                      isActive && "bg-brand-red text-white",
                      !isCompleted && !isActive && "bg-white/10 text-white/40",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : stepNumber}
                  </span>
                </div>
                <span className="mt-3 hidden text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 sm:block">
                  {label}
                </span>
              </div>
              {stepNumber < labels.length ? (
                <div className="mt-5 h-px flex-1 bg-white/[0.08]" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function UmrahCalculatorWizard() {
  const locale = useLocale();
  const copy = umrahCopy[isUrdu(locale) ? "ur" : "en"];
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [formData, setFormData] = useState<WizardState>(INITIAL_WIZARD_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState("");

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

    const derived = computeDerivedValues(formData);

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
      if (!res.ok || !result.ok) throw new Error(copy.nav.submissionFailed);
      setReferenceId(result.referenceId ?? "");
      setSubmitSuccess(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : copy.nav.genericError,
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
            <Step2 data={formData.step2} errors={errors} onChange={updateStep2} />
          )}
          {currentStep === 3 && (
            <Step3
              hotels={formData.step3.hotels}
              errors={errors}
              onChange={updateStep3}
            />
          )}
          {currentStep === 4 && (
            <Step4
              hotels={formData.step4.hotels}
              errors={errors}
              onChange={updateStep4}
            />
          )}
          {currentStep === 5 && (
            <Step5
              data={formData.step5}
              errors={errors}
              onChange={updateStep5}
              passengers={{
                adults: formData.step1.adults,
                children: formData.step1.children,
                infants: formData.step1.infants,
              }}
            />
          )}
          {currentStep === 6 && <Step6Review formData={formData} />}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between border-t border-white/[0.08] pt-6">
        <div>
          {currentStep > 1 ? (
            <Button
              variant="outline"
              onClick={goBack}
              className="border-white/20 text-white hover:border-white hover:bg-white hover:text-brand-black"
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
              disabled={isSubmitting}
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
        <div className="mt-4 rounded-2xl border border-brand-red/20 bg-brand-red/5 px-4 py-3 text-sm text-brand-red">
          {submitError}
        </div>
      ) : null}
    </div>
  );
}
