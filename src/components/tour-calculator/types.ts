// ── Primitives ────────────────────────────────────────────────────────────────

export interface HotelEntry {
  id: string; // crypto.randomUUID() at creation, used as React key
  hotelName: string;
  pricePerNight: string; // PKR string — allow empty during editing
  checkIn: string; // "YYYY-MM-DD"
  checkOut: string; // "YYYY-MM-DD"
}

export interface CountryBlock {
  id: string; // crypto.randomUUID()
  country: string;
  hotels: HotelEntry[];
}

export interface FlightBlock {
  id: string; // crypto.randomUUID()
  airline: string;
  from: string;
  to: string;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:MM"
  ticketAdult: string; // PKR string
  ticketChild: string;
  ticketInfant: string;
}

// ── Step data ─────────────────────────────────────────────────────────────────

export interface Step1Data {
  passengerName: string;
  contactNumber: string;
  email: string;
  adults: number;
  children: number;
  infants: number;
}

export interface Step2Data {
  countries: CountryBlock[]; // at least 1 block required
}

export interface Step3Data {
  flights: FlightBlock[]; // at least 1 block required
}

export interface Step4Data {
  coupon: string;
}

// ── Full wizard state ─────────────────────────────────────────────────────────

export interface TourWizardState {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
}

// ── Derived values (output of calculateDerived()) ────────────────────────────

export interface HotelDerived {
  hotelId: string;
  nights: number;
  totalCost: number; // nights × pricePerNight (0 if either is invalid)
}

export interface CountryDerived {
  countryId: string;
  country: string;
  hotels: HotelDerived[];
  countryNights: number;
  countryCost: number;
}

export interface FlightDerived {
  flightId: string;
  adultTotal: number; // ticketAdult × adults
  childTotal: number;
  infantTotal: number;
  flightTotal: number;
}

export interface TourDerivedValues {
  totalPassengers: number;
  countries: CountryDerived[];
  totalHotelNights: number;
  totalHotelCost: number;
  flights: FlightDerived[];
  totalFlightCost: number;
  grandTotal: number; // totalHotelCost + totalFlightCost
}
