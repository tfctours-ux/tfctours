// SERVER ONLY — do not import from client components.
// Safe: called only from server components and API routes.
// src/lib/cms/deep-merge.ts
export function deepMerge<T extends Record<string, unknown>>(
  base: T,
  overrides: T,
): T {
  if (Object.keys(overrides).length === 0) {
    return base;
  }

  const result: Record<string, unknown> = { ...base };

  for (const [key, overrideValue] of Object.entries(overrides)) {
    const baseValue = result[key];

    if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
      result[key] = deepMerge(
        baseValue as Record<string, unknown>,
        overrideValue as Record<string, unknown>,
      );
      continue;
    }

    result[key] = overrideValue;
  }

  return result as T;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}
