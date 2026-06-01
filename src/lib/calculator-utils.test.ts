import { describe, expect, it } from "vitest";

import { computeNights, formatPKR } from "./calculator-utils";

describe("computeNights", () => {
  it("returns correct night count for a valid range", () => {
    expect(computeNights("2025-01-01", "2025-01-05")).toBe(4);
  });

  it("returns 1 for an overnight stay", () => {
    expect(computeNights("2025-06-10", "2025-06-11")).toBe(1);
  });

  it("returns 0 when check-out equals check-in", () => {
    expect(computeNights("2025-03-15", "2025-03-15")).toBe(0);
  });

  it("returns 0 when check-out is before check-in", () => {
    expect(computeNights("2025-03-20", "2025-03-10")).toBe(0);
  });

  it("returns 0 for empty check-in", () => {
    expect(computeNights("", "2025-03-10")).toBe(0);
  });

  it("returns 0 for empty check-out", () => {
    expect(computeNights("2025-03-01", "")).toBe(0);
  });

  it("returns 0 for both empty", () => {
    expect(computeNights("", "")).toBe(0);
  });

  it("handles month boundaries correctly (30-night month)", () => {
    expect(computeNights("2025-04-01", "2025-04-30")).toBe(29);
  });
});

describe("formatPKR", () => {
  it("formats a whole number", () => {
    expect(formatPKR(50000)).toBe("PKR 50,000");
  });

  it("formats zero", () => {
    expect(formatPKR(0)).toBe("PKR 0");
  });

  it("returns PKR 0 for null", () => {
    expect(formatPKR(null)).toBe("PKR 0");
  });

  it("returns PKR 0 for undefined", () => {
    expect(formatPKR(undefined)).toBe("PKR 0");
  });

  it("returns PKR 0 for NaN", () => {
    expect(formatPKR(NaN)).toBe("PKR 0");
  });

  it("formats large amounts with commas", () => {
    expect(formatPKR(1_500_000)).toBe("PKR 1,500,000");
  });
});
