import { test, expect } from "@playwright/test";

const baseURL = process.env.SITE_URL || "http://127.0.0.1:4198";

test.use({ serviceWorkers: "block" });

async function noHorizontalScroll(page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(await page.evaluate(() => window.innerWidth));
}

test("home leads to the quote request tool", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseURL}/`, { waitUntil: "load" });
  await expect(page).toHaveTitle(/농기계 이동 준비/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("농기계 이동 조건");
  await expect(page.locator("body")).not.toContainText("여행 안전 지도");
  await page.getByRole("link", { name: "견적 요청서 만들기" }).first().click();
  await expect(page).toHaveURL(/\/agri\/machinery-transport-plan\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("견적 요청서");
  await noHorizontalScroll(page);
});

test("quote request validates input and builds a standard request text", async ({ page }) => {
  const consoleErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseURL}/agri/machinery-transport-plan/`, { waitUntil: "load" });
  const submit = page.getByRole("button", { name: "견적 요청서 만들기" });
  await expect(submit).toBeEnabled();
  await submit.click();
  await expect(page.locator("#request-error")).toContainText("3군데");

  await page.locator("#machine").selectOption("트랙터");
  await page.locator("#pickupRegion").fill("충남 예산군 신암면");
  await page.locator("#dropRegion").fill("경기 여주시");
  await page.locator("#length").fill("3450");
  await submit.click();
  await expect(page.locator("#length-error")).toContainText("mm로 바꾸세요");

  await page.locator("#dimUnit").selectOption("mm");
  await page.locator("#height").fill("2600");
  await page.locator("#weight").fill("2.1톤");
  await page.locator("#hp").fill("45");
  await page.locator("#attachment").selectOption("attached");
  await page.locator("#pickupMethod").selectOption("crane");
  await submit.click();

  const text = page.locator("#request-text");
  await expect(text).toContainText("[농기계 탁송 견적 요청]");
  await expect(text).toContainText("길이 3.45m · 너비 미확인 · 높이 2.60m");
  await expect(text).toContainText("중량: 2,100kg");
  await expect(text).toContainText("상차: 크레인 필요");
  await expect(text).toContainText("6) 운송 중 파손 시 보상 기준");
  await expect(page.locator("#request-flags")).toContainText("1.40m 이하");
  await expect(page.locator("#request-flags")).toContainText("너비");
  await noHorizontalScroll(page);
  expect(consoleErrors).toEqual([]);
});

test("quote comparison normalises items and flags missing ones", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseURL}/agri/`, { waitUntil: "load" });
  await page.getByRole("link", { name: "견적 비교표" }).first().click();
  await expect(page).toHaveURL(/\/agri\/quote-compare\/$/);
  const submit = page.getByRole("button", { name: "견적 비교하기" });
  await expect(submit).toBeEnabled();

  await page.locator("#qa-label").fill("가 업체");
  await page.locator("#qa-base").fill("40만");
  await page.locator("#qa-load").fill("0");
  await page.locator("#qb-label").fill("나 업체");
  for (const [name, value] of [["base", "350,000"], ["load", "50000"], ["unload", "50000"], ["wait", "0"], ["toll", "0"], ["attach", "0"], ["tax", "0"]]) {
    await page.locator(`#qb-${name}`).fill(value);
  }
  await page.locator("#qb-insurance").selectOption("written");
  await page.locator("#qb-extra").fill("대기 30분 초과 시 추가");
  await page.locator("#qb-validUntil").fill("2099-12-31");
  await submit.click();

  const result = page.locator("#quote-result");
  await expect(result).toContainText("가 업체: 하차비·대기료·통행료·기타 실비·작업기 분리·별도 운송·부가세 미확인");
  await expect(result).toContainText("확인된 금액만 더하면 400,000원");
  await expect(result).toContainText("모든 비용 항목이 확인된 견적: 나 업체");
  await expect(result.locator("table.cmp td.missing").first()).toBeVisible();
  await expect(result.locator(".ask-block")).toHaveCount(1);
  await expect(result.locator(".ask-block pre")).toContainText("- 하차비");
  await noHorizontalScroll(page);

  await page.locator("#qa-base").fill("삼십만");
  await submit.click();
  await expect(page.locator("#qa-base-error")).toContainText("숫자로 적어");
});

test("retired travel pages answer 410 and moved pages redirect", async ({ request }) => {
  for (const path of ["/travel/", "/cities/paris/", "/guides/pickpocket/", "/spots/rome/termini-station/", "/field-notes/", "/paris-pickpocket-guide/?from=test"]) {
    const response = await request.get(`${baseURL}${path}`, { maxRedirects: 0 });
    expect(response.status(), path).toBe(410);
    expect(response.headers()["x-robots-tag"]).toContain("noindex");
    expect(await response.text()).toContain("종료되었습니다");
  }
  const moved = await request.get(`${baseURL}/travel/about/?from=test`, { maxRedirects: 0 });
  expect(moved.status()).toBe(301);
  expect(moved.headers().location).toBe("https://tripmarking.com/about/?from=test");

  const missing = await request.get(`${baseURL}/definitely-not-a-route-20261026`);
  expect(missing.status()).toBe(404);
  expect(missing.headers()["x-robots-tag"]).toContain("noindex");
  expect(await missing.text()).toContain("페이지를 찾을 수 없습니다");

  const api = await request.get(`${baseURL}/api/reports`);
  expect(api.status()).toBe(404);
  expect(await api.json()).toEqual({ ok: false, error: "not found" });
});

test("guides cite official sources and link back to the tools", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const path of ["/agri/guides/loading-limits/", "/agri/guides/transport-safety/", "/agri/guides/reading-quotes/"]) {
    await page.goto(`${baseURL}${path}`, { waitUntil: "load" });
    await expect(page.locator(".source-note")).toContainText("2026-10-26");
    await expect(page.locator('main a[href="/agri/quote-compare/"]').first()).toBeVisible();
  }
  await page.goto(`${baseURL}/sources/`);
  await expect(page).toHaveTitle(/공식 출처와 검수 기준/);
  await expect(page.locator("#law")).toBeVisible();
  await expect(page.locator("#ts")).toBeVisible();
  await expect(page.locator("#rda")).toBeVisible();
});
