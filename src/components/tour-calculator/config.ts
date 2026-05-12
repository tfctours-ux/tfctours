import type {
  CountryBlock,
  FlightBlock,
  HotelEntry,
  TourWizardState,
} from "./types";

export const TOUR_COUNTRIES = [
  "Saudi Arabia",
  "Qatar",
  "Bahrain",
  "Dubai (UAE)",
  "Oman",
  "Turkey",
  "Thailand",
  "Malaysia",
  "Singapore",
  "Indonesia",
  "Cambodia",
  "Sri Lanka",
  "Maldives",
  "Egypt",
  "Iran",
  "Iraq",
  "Baku (Azerbaijan)",
  "Jordan",
  "Hong Kong",
  "China",
  "Kenya",
  "Ethiopia",
  "Tanzania",
  "South Africa",
  "Vietnam",
  "Japan",
  "USA",
  "UK",
  "Schengen Area",
  "Canada",
] as const;

export const TOUR_AIRLINES = [
  "Pakistan International Airlines (PIA)",
  "Emirates",
  "Qatar Airways",
  "Turkish Airlines",
  "Singapore Airlines",
  "Thai Airways",
  "Other",
] as const;

export const DEPARTURE_CITIES = [
  "Islamabad (ISB)",
  "Lahore (LHE)",
  "Karachi (KHI)",
  "Peshawar (PEW)",
  "Quetta (UET)",
] as const;

export const DESTINATION_CITIES = [
  "Istanbul (IST)",
  "Bangkok (BKK)",
  "Kuala Lumpur (KUL)",
  "Dubai (DXB)",
  "Singapore (SIN)",
  "Paris (CDG)",
  "Zurich (ZRH)",
  "Doha (DOH)",
  "Muscat (MCT)",
  "Riyadh (RUH)",
  "Jeddah (JED)",
  "Cairo (CAI)",
  "Nairobi (NBO)",
  "Tokyo (NRT)",
  "Other",
] as const;

// Helper — call at any point to create a blank hotel entry
export function createEmptyHotel(): HotelEntry {
  return {
    id: crypto.randomUUID(),
    hotelName: "",
    pricePerNight: "",
    checkIn: "",
    checkOut: "",
  };
}

// Helper — call at any point to create a blank country block with one hotel
export function createEmptyCountry(): CountryBlock {
  return {
    id: crypto.randomUUID(),
    country: "",
    hotels: [createEmptyHotel()],
  };
}

// Helper — call at any point to create a blank flight block
export function createEmptyFlight(): FlightBlock {
  return {
    id: crypto.randomUUID(),
    airline: "",
    from: "",
    to: "",
    date: "",
    time: "",
    ticketAdult: "",
    ticketChild: "",
    ticketInfant: "",
  };
}

// Initial wizard state — import this to seed useState
export const INITIAL_TOUR_STATE: TourWizardState = {
  step1: {
    passengerName: "",
    contactNumber: "",
    email: "",
    adults: 1,
    children: 0,
    infants: 0,
  },
  step2: { countries: [createEmptyCountry()] },
  step3: { flights: [createEmptyFlight()] },
  step4: { coupon: "" },
};

// Re-export types so consumers can import from one place
export type { HotelEntry, CountryBlock, FlightBlock, TourWizardState } from "./types";
