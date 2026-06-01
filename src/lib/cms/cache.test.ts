// src/lib/cms/cache.test.ts
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

vi.mock("next/cache", () => ({
  unstable_cache:
    (fn: (...args: unknown[]) => Promise<unknown>) =>
    (...args: unknown[]) =>
      fn(...args),
}));

import { withCmsCache } from "./cache";

describe("withCmsCache", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it("returns the resolved value", async () => {
    vi.stubEnv("NEON_DATABASE_URL", "postgres://test");
    const fn = vi.fn(async (value: string) => ({ value }));
    const cached = withCmsCache(fn, ["test"], ["cms:test"]);

    await expect(cached("ok")).resolves.toEqual({ value: "ok" });
    expect(fn).toHaveBeenCalledWith("ok");
  });

  it("returns null when the wrapped function throws", async () => {
    vi.stubEnv("NEON_DATABASE_URL", "postgres://test");
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const fn = vi.fn(async () => {
      throw new Error("boom");
    });
    const cached = withCmsCache(fn, ["test"], ["cms:test"]);

    await expect(cached()).resolves.toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.objectContaining({ action: "cms_cache_miss" }),
    );
    consoleSpy.mockRestore();
  });

  it("returns null without calling fn when NEON_DATABASE_URL is not set", async () => {
    vi.stubEnv("NEON_DATABASE_URL", "");
    const fn = vi.fn(async () => "called");
    const cached = withCmsCache(fn, ["test"], ["cms:test"]);

    await expect(cached()).resolves.toBeNull();
    expect(fn).not.toHaveBeenCalled();
  });
});
