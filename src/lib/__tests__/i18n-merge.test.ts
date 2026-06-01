// src/lib/__tests__/i18n-merge.test.ts
import { describe, expect, it } from "vitest";

import { deepMerge, dotNotationToNested } from "@/lib/i18n-merge";

describe("dotNotationToNested", () => {
  it("converts flat dot keys into a nested object", () => {
    expect(
      dotNotationToNested({
        "a.b.c": "value",
      }),
    ).toEqual({ a: { b: { c: "value" } } });
  });

  it("keeps single-level keys at the root", () => {
    expect(dotNotationToNested({ key: "value" })).toEqual({ key: "value" });
  });

  it("handles an empty object", () => {
    expect(dotNotationToNested({})).toEqual({});
  });

  it("shares parent objects for sibling paths", () => {
    expect(
      dotNotationToNested({
        "a.b": "first",
        "a.c": "second",
      }),
    ).toEqual({ a: { b: "first", c: "second" } });
  });
});

describe("deepMerge", () => {
  it("lets override leaves win", () => {
    expect(deepMerge({ a: "base" }, { a: "override" })).toEqual({
      a: "override",
    });
  });

  it("preserves base keys not present in override", () => {
    expect(deepMerge({ a: "base", b: "kept" }, { a: "override" })).toEqual({
      a: "override",
      b: "kept",
    });
  });

  it("merges nested objects recursively", () => {
    expect(
      deepMerge(
        { a: { b: "base", c: "kept" } },
        { a: { b: "override" } },
      ),
    ).toEqual({ a: { b: "override", c: "kept" } });
  });

  it("does not mutate either input", () => {
    const base = { a: { b: "base" } };
    const override = { a: { c: "override" } };

    deepMerge(base, override);

    expect(base).toEqual({ a: { b: "base" } });
    expect(override).toEqual({ a: { c: "override" } });
  });

  it("lets an override scalar replace a base object", () => {
    expect(deepMerge({ a: { b: "base" } }, { a: "override" })).toEqual({
      a: "override",
    });
  });
});
