export type PackageDuration = 15 | 21 | 28;

export interface FlightLeg {
  airline: string;
  from: string;
  to: string;
  date: string;
  time: string;
}

export interface HotelBlock {
  id: string;
  roomType: string;
  hotelName: string;
  rooms: number;
  checkIn: string;
  checkOut: string;
}

export interface Step1Data {
  passengerName: string;
  contactNumber: string;
  email: string;
  adults: number;
  children: number;
  infants: number;
}

export interface Step2Data {
  departureFlight: FlightLeg;
  returnFlight: FlightLeg;
}

export interface Step3Data {
  hotels: HotelBlock[];
}

export interface Step4Data {
  hotels: HotelBlock[];
}

export interface Step5Data {
  transportVisa: string;
  coupon: string;
  ticketAdult: string;
  ticketChild: string;
  ticketInfant: string;
  exchangeRate: string;
}

export interface WizardState {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
  step5: Step5Data;
}

export interface DerivedValues {
  totalPassengers: number;
  makkahNights: number;
  madinahNights: number;
  transportSAR: number;
  transportPKR: number;
  ticketTotalAdult: number;
  ticketTotalChild: number;
  ticketTotalInfant: number;
  ticketGrandTotal: number;
}
