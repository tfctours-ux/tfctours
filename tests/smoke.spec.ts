// tests/smoke.spec.ts
import { expect, test } from "@playwright/test";

test("home page loads without DB", async ({ page }) => {
  page.on("pageerror", (error) => {
    throw error;
  });

  await page.goto("/");
  await expect(page).toHaveTitle(/Flight Centre/);
  await expect(page.locator("section[aria-label]").first()).toBeVisible();
});

test("services page loads", async ({ page }) => {
  page.on("pageerror", (error) => {
    throw error;
  });

  await page.goto("/en/services");
  await expect(page.locator("h1, h2").first()).toBeVisible();
});

test("umrah calculator page loads", async ({ page }) => {
  page.on("pageerror", (error) => {
    throw error;
  });

  await page.goto("/en/umrah-calculator");
  await expect(page.locator("form, [data-wizard]").first()).toBeVisible();
});

test("cms-health endpoint responds", async ({ request }) => {
  const response = await request.get("/api/cms-health");

  expect(response.ok()).toBe(true);
  const body = (await response.json()) as {
    ok: boolean;
    cms: "connected" | "disabled" | "error";
  };
  expect(body.ok).toBe(true);
  expect(["connected", "disabled", "error"]).toContain(body.cms);
});
