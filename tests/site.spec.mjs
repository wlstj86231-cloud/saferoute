import { test, expect } from "@playwright/test";

const baseURL = process.env.SITE_URL || "http://127.0.0.1:4198";

test.use({ serviceWorkers: "block" });

test("desktop map keeps its layout and removes misleading community signals", async ({ page }) => {
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseURL}/`, { waitUntil: "networkidle" });

  await expect(page.locator(".topbar")).toBeVisible();
  await expect(page.locator(".bottom-nav")).toBeVisible();
  await expect(page.locator("[data-spot-marker]").first()).toBeVisible();
  await expect(page.locator("body")).not.toContainText("평균 위험");
  await expect(page.locator("body")).not.toContainText("실시간 제보");

  await page.locator('[data-panel="cities"]').click();
  await expect(page.locator(".compare-card")).toContainText("도시별 안내 범위");
  await expect(page.locator(".compare-card")).not.toContainText(/\d+\.\s/);

  await page.screenshot({ path: "output/playwright/trip-local-desktop.png", fullPage: true });
  expect(consoleErrors).toEqual([]);
});

test("mobile map remains usable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseURL}/`, { waitUntil: "networkidle" });
  await expect(page.locator("[data-spot-marker]").first()).toBeVisible();

  const overflow = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth
  }));
  expect(overflow.document).toBeLessThanOrEqual(overflow.viewport);
  expect(overflow.body).toBeLessThanOrEqual(overflow.viewport);

  await page.locator("[data-spot-marker]").last().click();
  await expect(page.locator(".spot-brief-card")).toBeVisible();
  await page.screenshot({ path: "output/playwright/trip-local-mobile.png", fullPage: true });
});

test("sources, true 404, disabled API and legacy redirects behave correctly", async ({ page, request }) => {
  await page.goto(`${baseURL}/sources/`);
  await expect(page).toHaveTitle(/공식 출처와 검수 기준/);
  await expect(page.locator("#barcelona")).toBeVisible();
  await expect(page.locator("#mexicocity")).toBeVisible();

  const article = await request.get(`${baseURL}/cities/paris/`);
  expect(article.status()).toBe(200);
  expect(await article.text()).toContain("SOURCE_NOTE_START");

  const missing = await request.get(`${baseURL}/definitely-not-a-route-20260814`);
  expect(missing.status()).toBe(404);
  expect(missing.headers()["x-robots-tag"]).toContain("noindex");
  expect(await missing.text()).toContain("페이지를 찾을 수 없습니다");

  const api = await request.get(`${baseURL}/api/reports`);
  expect(api.status()).toBe(404);
  expect(await api.json()).toEqual({ ok: false, error: "not found" });

  const legacy = await request.get(`${baseURL}/paris-pickpocket-guide/?from=test`, { maxRedirects: 0 });
  expect(legacy.status()).toBe(301);
  expect(legacy.headers().location).toBe("https://tripmarking.com/cities/paris/?from=test");
});
