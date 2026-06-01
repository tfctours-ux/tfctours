export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function hasValidDateRange(checkIn: string, checkOut: string): boolean {
  if (!checkIn || !checkOut) return false;
  return new Date(checkOut).getTime() > new Date(checkIn).getTime();
}

export const WIZARD_CARD_CLASS =
  "rounded-[2rem] border border-border bg-surface-elevated/40 backdrop-blur-xl p-6 md:p-8";
