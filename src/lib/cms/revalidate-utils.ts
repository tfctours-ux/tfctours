// SERVER ONLY — do not import from client components.
// Safe: called only from server components and API routes.
// src/lib/cms/revalidate-utils.ts
import { createHmac, timingSafeEqual } from "node:crypto";

export function verifyRevalidateSignature(
  body: string,
  signature: string | null,
): boolean {
  if (!signature) {
    return false;
  }

  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return false;
  }

  const expected = createHmac("sha256", secret).update(body).digest("hex");
  if (expected.length !== signature.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}
