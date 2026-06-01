// src/lib/cms/deep-merge.test.ts
import { describe, expect, it } from "vitest";

import { deepMerge } from "./deep-merge";

describe("deepMerge", () => {
  it("replaces a leaf value", () => {
    const result = deepMerge(
      { common: { title: "Old" } },
      { common: { title: "New" } },
    );

    expect(result).toEqual({ common: { title: "New" } });
  });

  it("replaces only a nested key and preserves siblings", () => {
    const result = deepMerge(
      { home: { hero: { title: "Old", subtitle: "Keep" } } },
      { home: { hero: { title: "New" } } },
    );

    expect(result).toEqual({
      home: { hero: { title: "New", subtitle: "Keep" } },
    });
  });

  it("adds a key inside an existing namespace", () => {
    const result = deepMerge(
      { nav: { home: "Home" } },
      { nav: { about: "About" } },
    );

    expect(result).toEqual({ nav: { home: "Home", about: "About" } });
  });

  it("adds a brand new namespace", () => {
    const result = deepMerge(
      { nav: { home: "Home" } },
      { footer: { contact: "Contact" } },
    );

    expect(result).toEqual({
      nav: { home: "Home" },
      footer: { contact: "Contact" },
    });
  });

  it("does not mutate the base object", () => {
    const base = { common: { title: "Old" } };
    const result = deepMerge(base, { common: { title: "New" } });

    expect(base).toEqual({ common: { title: "Old" } });
    expect(result).not.toBe(base);
  });
});
