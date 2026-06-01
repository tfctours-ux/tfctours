// src/lib/calculator-utils.ts

/**
 * Compute the number of nights between two ISO date strings.
 * Returns 0 for missing, invalid, or negative ranges.
 */
export function computeNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  const nights = Math.round(diff / 86_400_000);
  return nights > 0 ? nights : 0;
}

/**
 * Format a PKR amount with comma separators.
 * Returns "PKR 0" for zero, NaN, null, or undefined inputs.
 */
export function formatPKR(amount: number | null | undefined): string {
  const safe =
    typeof amount === "number" &&
    !Number.isNaN(amount) &&
    Number.isFinite(amount)
      ? amount
      : 0;
  return `PKR ${safe.toLocaleString("en-PK")}`;
}
