// src/lib/cms/__tests__/revalidate.test.ts
import { createHmac } from "node:crypto";
import { afterEach, describe, expect, it } from "vitest";

import { verifyRevalidateSignature } from "../revalidate-utils";

const SECRET =
  "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
const BODY = JSON.stringify({ tags: ["cms:services"] });

describe("verifyRevalidateSignature", () => {
  afterEach(() => {
    delete process.env.REVALIDATE_SECRET;
  });

  it("returns true for a known input and correct HMAC", () => {
    process.env.REVALIDATE_SECRET = SECRET;
    const signature = sign(BODY);

    expect(verifyRevalidateSignature(BODY, signature)).toBe(true);
  });

  it("returns false for a wrong HMAC", () => {
    process.env.REVALIDATE_SECRET = SECRET;

    expect(verifyRevalidateSignature(BODY, sign("wrong"))).toBe(false);
  });

  it("returns false for a null signature", () => {
    process.env.REVALIDATE_SECRET = SECRET;

    expect(verifyRevalidateSignature(BODY, null)).toBe(false);
  });

  it("returns false when REVALIDATE_SECRET is missing", () => {
    expect(verifyRevalidateSignature(BODY, sign(BODY))).toBe(false);
  });

  it("returns false for a different-length signature", () => {
    process.env.REVALIDATE_SECRET = SECRET;

    expect(verifyRevalidateSignature(BODY, "abc")).toBe(false);
  });

  it("returns false for a tampered body", () => {
    process.env.REVALIDATE_SECRET = SECRET;
    const signature = sign(BODY);

    expect(
      verifyRevalidateSignature(JSON.stringify({ tags: ["cms:guides"] }), signature),
    ).toBe(false);
  });
});

function sign(body: string): string {
  return createHmac("sha256", SECRET).update(body).digest("hex");
}
