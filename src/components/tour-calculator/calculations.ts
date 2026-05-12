import type {
  CountryDerived,
  FlightBlock,
  FlightDerived,
  HotelDerived,
  HotelEntry,
  TourDerivedValues,
  TourWizardState,
} from "./types";

// Compute nights between two date strings. Returns 0 for invalid/missing/negative.
export function computeNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  const nights = Math.round(diff / 86_400_000);
  return nights > 0 ? nights : 0;
}

// Compute cost for a single hotel entry
export function computeHotelDerived(hotel: HotelEntry): HotelDerived {
  const nights = computeNights(hotel.checkIn, hotel.checkOut);
  const rate = parseFloat(hotel.pricePerNight) || 0;

  return {
    hotelId: hotel.id,
    nights,
    totalCost: Math.round(nights * rate),
  };
}

// Compute totals for a single flight block given passenger counts
export function computeFlightDerived(
  flight: FlightBlock,
  adults: number,
  children: number,
  infants: number,
): FlightDerived {
  const adultRate = parseFloat(flight.ticketAdult) || 0;
  const childRate = parseFloat(flight.ticketChild) || 0;
  const infantRate = parseFloat(flight.ticketInfant) || 0;
  const adultTotal = Math.round(adultRate * adults);
  const childTotal = Math.round(childRate * children);
  const infantTotal = Math.round(infantRate * infants);

  return {
    flightId: flight.id,
    adultTotal,
    childTotal,
    infantTotal,
    flightTotal: adultTotal + childTotal + infantTotal,
  };
}

// Main derived values calculator — accepts full wizard state
export function computeTourDerived(state: TourWizardState): TourDerivedValues {
  const { step1, step2, step3 } = state;
  const { adults, children, infants } = step1;

  const totalPassengers = adults + children + infants;

  // Countries + hotels
  const countries: CountryDerived[] = step2.countries.map((block) => {
    const hotels: HotelDerived[] = block.hotels.map(computeHotelDerived);
    const countryNights = hotels.reduce((sum, hotel) => sum + hotel.nights, 0);
    const countryCost = hotels.reduce((sum, hotel) => sum + hotel.totalCost, 0);

    return {
      countryId: block.id,
      country: block.country,
      hotels,
      countryNights,
      countryCost,
    };
  });

  const totalHotelNights = countries.reduce((sum, country) => sum + country.countryNights, 0);
  const totalHotelCost = countries.reduce((sum, country) => sum + country.countryCost, 0);

  // Flights
  const flights: FlightDerived[] = step3.flights.map((flight) =>
    computeFlightDerived(flight, adults, children, infants),
  );
  const totalFlightCost = flights.reduce((sum, flight) => sum + flight.flightTotal, 0);

  return {
    totalPassengers,
    countries,
    totalHotelNights,
    totalHotelCost,
    flights,
    totalFlightCost,
    grandTotal: totalHotelCost + totalFlightCost,
  };
}

// Format PKR with commas — returns "PKR 0" for zero, never NaN
export function formatPKR(amount: number | null | undefined): string {
  const safe = typeof amount === 'number' && !Number.isNaN(amount) && Number.isFinite(amount) ? amount : 0;
  return `PKR ${safe.toLocaleString("en-PK")}`;
}
