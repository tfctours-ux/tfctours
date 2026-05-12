import type { HotelBlock, WizardState } from "./types";

export const AIRLINES = [
  "Pakistan International Airlines (PIA)",
  "Saudia Airlines",
  "Emirates",
  "Qatar Airways",
  "Turkish Airlines",
  "AirBlue",
  "Other",
] as const;

export const PK_CITIES = [
  "Islamabad (ISB)",
  "Lahore (LHE)",
  "Karachi (KHI)",
  "Peshawar (PEW)",
  "Quetta (UET)",
  "Other",
] as const;

export const SAUDI_CITIES = [
  "Jeddah (JED)",
  "Madinah (MED)",
  "Other",
] as const;

export const ROOM_TYPES = [
  "Single (1 person room)",
  "Double (with 02 beds separate room)",
  "Triple (with 03 beds separate room)",
  "Quad (with 04 beds separate room)",
  "Quint (with 05 beds separate room)",
  "Sharing",
] as const;

export const MAKKAH_HOTELS = [
  "Hassad Al-Mashaar | 2000 Mtr (Shuttle Service) | Chk/In: 10 Jul",
  "Hiba Hijrah-6 | 1800-2000 Mtr (Shuttle Service) | Chk/In: 01 Jul",
  "Dewaniya Al-Hajla | 900 Mtr (Hijrah Road) | Chk/In: 25 Jun",
  "Nada Al-Hijrah | 800-850 Mtr (Hijrah Road-Inside Kubri) | Chk/In: 01 Jul",
  "Hijrah Al-Khair | 600-650 Mtr (Off Hijrah Road) | Chk/In: 01 Jul",
  "Jawhra Al-Hijrah | 600-650 Mtr (Manshia Road) | Chk/In: 25 Jun",
  "Mather Al-Jewar | 500-550 Mtr (Hijrah Road) | Chk/In: 10 Jul",
  "Majd Munajeen | 350-400 Mtr (Hijrah Road) | Chk/In: 01 Jul",
  "Other",
] as const;

export const MADINAH_HOTELS = [
  "Fundaq Saeeda | 1000-1100 Mtr (Shuttle Service) | Chk/In: 01 Jul",
  "Najoom Al-Khair / Manazil Fouz / Majd Silver | 550-600 Mtr (Masjid Bilal Side) | Chk/In: 05 Jul",
  "Rowda Golden / Ikram Taibah | 500-550 Mtr from Haram (Backside Burj Mukhtara) | Chk/In: 01 Jul",
  "Mather Taibah-2/Similar | 300-350 Mtr from Haram (Markazia) | Chk/In: 05 Jul",
  "Sky View | 100 Mtr from Haram (Markazia) | Chk/In: 05 Jul",
  "Other",
] as const;

export interface TransportOption {
  label: string;
  sar: number;
}

export const TRANSPORT_OPTIONS: TransportOption[] = [
  { label: "By Bus (40-47 Pax Group)", sar: 570 },
  { label: "By Bus (30-39 Pax Group)", sar: 580 },
  { label: "By Bus (17-29 Pax Group)", sar: 700 },
  { label: "By Coaster (10-16 Pax Group)", sar: 750 },
  { label: "By HIACE (7-9 Pax Group)", sar: 750 },
  { label: "By STARIA/H1 (5-6 Pax Group)", sar: 750 },
  { label: "By Car (4 Pax)", sar: 750 },
  { label: "By Car (3 Pax)", sar: 780 },
  { label: "By Car (2 Pax)", sar: 820 },
  { label: "By Car (1 Pax)", sar: 950 },
];

export function createEmptyHotelBlock(): HotelBlock {
  return {
    id: crypto.randomUUID(),
    roomType: "",
    hotelName: "",
    rooms: 1,
    checkIn: "",
    checkOut: "",
  };
}

export const INITIAL_WIZARD_STATE: WizardState = {
  step1: {
    passengerName: "",
    contactNumber: "",
    email: "",
    adults: 1,
    children: 0,
    infants: 0,
  },
  step2: {
    departureFlight: { airline: "", from: "", to: "", date: "", time: "" },
    returnFlight: { airline: "", from: "", to: "", date: "", time: "" },
  },
  step3: { hotels: [createEmptyHotelBlock()] },
  step4: { hotels: [createEmptyHotelBlock()] },
  step5: {
    transportVisa: "",
    coupon: "",
    ticketAdult: "",
    ticketChild: "",
    ticketInfant: "",
    exchangeRate: "",
  },
};
