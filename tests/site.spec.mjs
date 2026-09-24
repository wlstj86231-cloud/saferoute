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

test("agricultural transport memo works on mobile and is discoverable from sources", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseURL}/sources/`);
  await page.getByRole("link", { name: "농기계 탁송 현장 확인표" }).click();
  await expect(page).toHaveURL(/\/agri\/machinery-transport-plan\/$/);
  await page.waitForLoadState("load");
  await page.getByLabel("기계 종류").selectOption({ label: "트랙터" });
  await page.getByLabel("출발 지역 또는 현장 특징").fill("충남 예산, 진입로 협소");
  await page.getByLabel("도착 지역 또는 현장 특징").fill("경기 여주, 하차 공간 확인");
  await page.getByLabel("작업기 상태").selectOption("attached");
  await page.getByRole("button", { name: "확인표 만들기" }).click();
  const memo = page.locator("#transport-plan-text");
  await expect(memo).toContainText("충남 예산, 진입로 협소");
  await expect(memo).toContainText("작업기를 장착한 전체 크기와 중량 재확인");
  await expect(memo).toContainText("미확인 — 제원·실측 확인 필요");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test("transport quote comparison distinguishes known subtotal from missing costs", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseURL}/agri/`, { waitUntil: "load" });
  await page.getByRole("link", { name: "농기계 탁송 견적 항목 비교표" }).click();
  await expect(page).toHaveURL(/\/agri\/quote-compare\/$/);
  await page.waitForLoadState("load");
  const quoteA = page.locator("[data-quote]").first();
  await quoteA.locator('[name="base"]').fill("100000");
  await quoteA.locator('[name="load"]').fill("20000");
  await page.getByRole("button", { name: "입력 금액 비교" }).click();
  await expect(page.locator("#quote-result")).toContainText("입력 금액 합계: 120,000원");
  await expect(page.locator("#quote-result")).toContainText("미확인 3항목");
  for (const name of ["unload", "wait", "tax"]) await quoteA.locator(`[name="${name}"]`).fill("0");
  await page.getByRole("button", { name: "입력 금액 비교" }).click();
  await expect(page.locator("#quote-result")).toContainText("항목별 금액 합계: 120,000원");
  await expect(page.locator("#quote-result")).not.toContainText("확정 총액으로 비교하지 마세요");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
