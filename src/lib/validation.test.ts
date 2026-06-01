import { describe, expect, it } from "vitest";

import { EMAIL_REGEX, hasValidDateRange } from "./validation";

describe("EMAIL_REGEX", () => {
  it("matches valid emails", () => {
    expect(EMAIL_REGEX.test("user@example.com")).toBe(true);
    expect(EMAIL_REGEX.test("info@tfctours.com.pk")).toBe(true);
    expect(EMAIL_REGEX.test("name+tag@domain.org")).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(EMAIL_REGEX.test("notanemail")).toBe(false);
    expect(EMAIL_REGEX.test("@nodomain.com")).toBe(false);
    expect(EMAIL_REGEX.test("missing@")).toBe(false);
    expect(EMAIL_REGEX.test("spaces in@email.com")).toBe(false);
    expect(EMAIL_REGEX.test("")).toBe(false);
  });
});

describe("hasValidDateRange", () => {
  it("returns true when check-out is after check-in", () => {
    expect(hasValidDateRange("2025-01-01", "2025-01-05")).toBe(true);
  });

  it("returns false when dates are equal", () => {
    expect(hasValidDateRange("2025-01-01", "2025-01-01")).toBe(false);
  });

  it("returns false when check-out is before check-in", () => {
    expect(hasValidDateRange("2025-01-10", "2025-01-05")).toBe(false);
  });

  it("returns false for empty check-in", () => {
    expect(hasValidDateRange("", "2025-01-05")).toBe(false);
  });

  it("returns false for empty check-out", () => {
    expect(hasValidDateRange("2025-01-01", "")).toBe(false);
  });

  it("returns false for both empty", () => {
    expect(hasValidDateRange("", "")).toBe(false);
  });
});
