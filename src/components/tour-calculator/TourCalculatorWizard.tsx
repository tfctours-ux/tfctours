// src/components/tour-calculator/TourCalculatorWizard.tsx
"use client";

import { useCallback, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  Send,
} from "lucide-react";
import { useLocale } from "next-intl";

import { Button } from "@/components/ui/Button";
import { Turnstile } from "@/components/shared/Turnstile";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { EMAIL_REGEX, hasValidDateRange, WIZARD_CARD_CLASS } from "@/lib/validation";

import { computeTourDerived } from "./calculations";
import {
  DEPARTURE_CITIES,
  DESTINATION_CITIES,
  INITIAL_TOUR_STATE,
  TOUR_AIRLINES,
  TOUR_COUNTRIES,
} from "./config";
import { isUrdu, tourCopy } from "./copy";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4Review } from "./Step4Review";
import { SuccessScreen } from "./SuccessScreen";
import type {
  CountryBlock,
  FlightBlock,
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  TourWizardState,
} from "./types";

type TourCalculatorWizardProps = {
  initialCountries?: string[];
  initialAirlines?: string[];
  initialDepartureCities?: string[];
  initialDestinationCities?: string[];
};

export function TourCalculatorWizard({
  initialCountries,
  initialAirlines,
  initialDepartureCities,
  initialDestinationCities,
}: TourCalculatorWizardProps) {
  const locale = useLocale();
  const copy = tourCopy[isUrdu(locale) ? "ur" : "en"];
  const countries = initialCountries ?? [...TOUR_COUNTRIES];
  const airlines = initialAirlines ?? [...TOUR_AIRLINES];
  const departureCities = initialDepartureCities ?? [...DEPARTURE_CITIES];
  const destinationCities = initialDestinationCities ?? [...DESTINATION_CITIES];
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [formData, setFormData] = useState<TourWizardState>(INITIAL_TOUR_STATE);
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

  function updateStep2(countries: CountryBlock[]) {
    setFormData((prev) => ({ ...prev, step2: { countries } }));
  }

  function updateStep3(flights: FlightBlock[]) {
    setFormData((prev) => ({ ...prev, step3: { flights } }));
  }

  function updateStep4(data: Partial<Step4Data>) {
    setFormData((prev) => ({ ...prev, step4: { ...prev.step4, ...data } }));
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
    }

    if (currentStep === 2) {
      const step2: Step2Data = formData.step2;

      if (step2.countries.length < 1) {
        nextErrors.countries = copy.errors.countries;
      }

      for (const countryBlock of step2.countries) {
        if (!countryBlock.country) {
          nextErrors[`country_${countryBlock.id}`] = copy.errors.country;
        }

        for (const hotel of countryBlock.hotels) {
          if (!hotel.hotelName) {
            nextErrors[`hotel_name_${hotel.id}`] = copy.errors.hotelName;
          }

          if (!hotel.checkIn) {
            nextErrors[`hotel_checkin_${hotel.id}`] = copy.errors.checkIn;
          }

          if (!hotel.checkOut) {
            nextErrors[`hotel_checkout_${hotel.id}`] = copy.errors.checkOut;
          }

          if (
            hotel.checkIn &&
            hotel.checkOut &&
            !hasValidDateRange(hotel.checkIn, hotel.checkOut)
          ) {
            nextErrors[`hotel_dates_${hotel.id}`] = copy.errors.dateOrder;
          }
        }
      }
    }

    if (currentStep === 3) {
      const step3: Step3Data = formData.step3;

      if (step3.flights.length < 1) {
        nextErrors.flights = copy.errors.flights;
      }

      for (const flight of step3.flights) {
        if (!flight.airline) {
          nextErrors[`flight_airline_${flight.id}`] = copy.errors.airline;
        }

        if (!flight.from) {
          nextErrors[`flight_from_${flight.id}`] = copy.errors.departureCity;
        }

        if (!flight.to) {
          nextErrors[`flight_to_${flight.id}`] = copy.errors.destination;
        }

        if (!flight.date) {
          nextErrors[`flight_date_${flight.id}`] = copy.errors.date;
        }
      }
    }

    if (currentStep === 4) {
      const step4: Step4Data = formData.step4;
      void step4;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goNext() {
    if (!validateCurrentStep()) return;
    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, 4));
  }

  function goBack() {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 1));
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setSubmitError(null);

    const derived = computeTourDerived(formData);

    const payload = {
      passengerName: formData.step1.passengerName,
      contactNumber: formData.step1.contactNumber,
      email: formData.step1.email,
      adults: formData.step1.adults,
      children: formData.step1.children,
      infants: formData.step1.infants,
      countries: formData.step2.countries.map((countryBlock) => {
        const { id, hotels, ...country } = countryBlock;
        void id;

        return {
          ...country,
          hotels: hotels.map((hotel) => {
            const { id: hotelId, ...hotelRest } = hotel;
            void hotelId;
            return hotelRest;
          }),
        };
      }),
      flights: formData.step3.flights.map((flight) => {
        const { id, ...flightRest } = flight;
        void id;
        return flightRest;
      }),
      coupon: formData.step4.coupon,
      totalHotelNights: derived.totalHotelNights,
      totalHotelCost: derived.totalHotelCost,
      totalFlightCost: derived.totalFlightCost,
      grandTotal: derived.grandTotal,
      turnstileToken,
    };

    try {
      const res = await fetch("/api/tour-quote", {
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
      if (!res.ok || !result.ok) {
        throw new Error(result.error ?? copy.nav.submissionFailed);
      }
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
      <div className="mb-8 flex items-center justify-between">
        {copy.steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div
              key={label}
              className="flex flex-1 items-center"
            >
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-full border",
                    isCompleted && "border-gold/40 bg-gold/20",
                    isActive &&
                      "ring-2 ring-accent-ring ring-offset-2 ring-offset-background border-accent bg-accent",
                    !isCompleted &&
                      !isActive &&
                      "border-border bg-surface-muted",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-gold" />
                  ) : (
                    <span
                      className={[
                        "text-sm",
                        isActive ? "font-bold text-accent-foreground" : "text-foreground-subtle",
                      ].join(" ")}
                    >
                      {stepNumber}
                    </span>
                  )}
                </div>
                <span className="hidden text-[10px] uppercase tracking-[0.14em] text-foreground-subtle sm:block">
                  {label}
                </span>
              </div>

              {stepNumber < copy.steps.length ? (
                <div className="mx-2 h-px flex-1 bg-border" />
              ) : null}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={{
            enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
        >
          {currentStep === 1 && (
            <Step1
              data={formData.step1}
              errors={errors}
              onChange={updateStep1}
            />
          )}
          {currentStep === 2 && (
            <Step2
              countries={formData.step2.countries}
              countryOptions={countries}
              errors={errors}
              onChange={updateStep2}
            />
          )}
          {currentStep === 3 && (
            <Step3
              flights={formData.step3.flights}
              airlineOptions={airlines}
              departureCityOptions={departureCities}
              destinationCityOptions={destinationCities}
              errors={errors}
              onChange={updateStep3}
              passengers={{
                adults: formData.step1.adults,
                children: formData.step1.children,
                infants: formData.step1.infants,
              }}
            />
          )}
          {currentStep === 4 && (
            <Step4Review
              formData={formData}
              onCouponChange={(coupon) => updateStep4({ coupon })}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Turnstile renders on review step (Step 4) */}
      {currentStep === 4 ? (
        <div className="mt-4">
          <Turnstile
            onToken={handleTurnstileToken}
            onError={handleTurnstileError}
            action="tour-quote"
          />
          <p className="mt-1 text-xs text-foreground-subtle">
            {isUrdu(locale) ? "آپ انسان ہیں، تصدیق ہو رہی ہے…" : "Verifying you're human…"}
          </p>
        </div>
      ) : null}

      <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
        <div>
          {currentStep > 1 ? (
            <Button
              variant="outline"
              onClick={goBack}
              className="border-foreground/30 text-foreground hover:border-foreground hover:bg-foreground hover:text-background"
            >
              <ChevronLeft className="h-4 w-4" />
              {copy.nav.previous}
            </Button>
          ) : (
            <div />
          )}
        </div>

        <div>
          {currentStep < 4 ? (
            <Button variant="primary" onClick={goNext}>
              {copy.nav.next}
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting || !turnstileToken}>
              {isSubmitting ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  {copy.nav.sending}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  {copy.nav.submit}
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {submitError ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-2xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger"
        >
          {submitError}
        </motion.div>
      ) : null}
    </div>
  );
}
