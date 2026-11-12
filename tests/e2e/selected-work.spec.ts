import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function openDesktop(
  page: Page,
  width = 1440,
  reducedMotion: "reduce" | "no-preference" = "no-preference",
) {
  await page.emulateMedia({ reducedMotion });
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/");
  await expect(page.locator("#shared-navigation")).toHaveAttribute("inert", "");
  await page.setViewportSize({ width, height: 900 });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => scrollTo(0, 900));
  await expect(page.getByRole("banner")).toHaveAttribute("data-hidden", "true");
}
declare global {
  interface Window {
    selectedWorkFrames: { visible: boolean; opacity: number; scale: number }[];
  }
}
const preview = (page: Page) => page.locator("[data-project-preview]");
const projects = (page: Page) =>
  page.getByRole("list", { name: "Selected projects" }).getByRole("link");

test("desktop entrance, eased tracking, exit, stable rows and decorative layers", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.addInitScript(() => {
    window.selectedWorkFrames = [];
    const sample = () => {
      const node = document.querySelector("[data-project-preview]");
      if (node) {
        const transform = getComputedStyle(node.firstElementChild!).transform;
        window.selectedWorkFrames.push({
          visible: node.getAttribute("data-visible") === "true",
          opacity: Number(getComputedStyle(node).opacity),
          scale: transform === "none" ? 1 : new DOMMatrixReadOnly(transform).a,
        });
      }
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  await openDesktop(page);
  const before = await projects(page).evaluateAll((nodes) =>
    nodes.map((n) => {
      const r = n.getBoundingClientRect();
      return [r.x, r.y, r.width, r.height];
    }),
  );
  await page.mouse.move(280, 343);
  await expect(preview(page)).toHaveAttribute("data-project", "Nova");
  await expect(preview(page)).toHaveCSS("opacity", "1");
  expect(
    await page.evaluate(() =>
      window.selectedWorkFrames.some(
        (frame) => frame.visible && frame.opacity > 0 && frame.opacity < 1,
      ),
    ),
  ).toBe(true);
  expect(
    await page.evaluate(() =>
      window.selectedWorkFrames.some(
        (frame) => frame.scale > 0.72 && frame.scale < 1,
      ),
    ),
  ).toBe(true);
  const cursor = page.locator("[data-project-cursor]");
  await expect(cursor).toHaveCSS("width", "64px");
  await expect(preview(page)).toHaveCSS("width", "360px");
  await expect(preview(page)).toHaveCSS("height", "250px");
  await expect(preview(page)).toHaveCSS("pointer-events", "none");
  await expect(cursor).toHaveCSS("pointer-events", "none");
  expect(await preview(page).getByRole("link").count()).toBe(0);
  const start = (await preview(page).boundingBox())!.x;
  await page.mouse.move(1000, 418);
  const first = (await preview(page).boundingBox())!.x;
  expect(first).toBeGreaterThan(start);
  expect(first).toBeLessThan(819);
  await expect
    .poll(async () => (await preview(page).boundingBox())!.x)
    .toBeCloseTo(820, 0);
  expect(
    await projects(page).evaluateAll((nodes) =>
      nodes.map((n) => {
        const r = n.getBoundingClientRect();
        return [r.x, r.y, r.width, r.height];
      }),
    ),
  ).toEqual(before);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.mouse.move(2, 80);
  await expect(preview(page)).toHaveAttribute("data-visible", "false");
  await expect(preview(page)).toHaveCSS("opacity", "0");
  expect(
    await page.evaluate(() =>
      window.selectedWorkFrames.some(
        (frame) => !frame.visible && frame.opacity > 0 && frame.opacity < 1,
      ),
    ),
  ).toBe(true);
  await expect
    .poll(() =>
      preview(page)
        .locator("img")
        .evaluateAll((nodes) =>
          nodes.reduce((sum, n) => sum + n.getAnimations().length, 0),
        ),
    )
    .toBe(0);
  expect(errors).toEqual([]);
});

test("image mapping, intermediate wipes and interrupted project reversals", async ({
  page,
}) => {
  await openDesktop(page);
  await page.mouse.move(300, 340);
  await expect(preview(page)).toHaveAttribute("data-project", "Nova");
  await expect
    .poll(() =>
      preview(page)
        .locator("img")
        .evaluateAll((nodes) =>
          nodes.every((n) => (n as HTMLImageElement).naturalWidth === 1440),
        ),
    )
    .toBe(true);
  const labels = [
    "Nova",
    "Southlight",
    "Design Spaces",
    "Brew & Bond",
    "Photographer Portfolio",
  ];
  const assets = ["nova", "south", "design", "brew", "photo"];
  for (let i = 0; i < labels.length; i++)
    await expect(
      preview(page).locator(`img[data-preview-image="${labels[i]}"]`),
    ).toHaveAttribute("src", `/images/selected-work/${assets[i]}.png`);
  await page.mouse.move(680, 560);
  const incoming = preview(page).locator(
    'img[data-preview-image="Southlight"]',
  );
  await expect
    .poll(() => incoming.evaluate((n) => n.getAnimations().length))
    .toBeGreaterThan(0);
  const y = await incoming.evaluate(
    (n) => new DOMMatrixReadOnly(getComputedStyle(n).transform).m42,
  );
  expect(y).toBeGreaterThan(0);
  expect(y).toBeLessThanOrEqual(250);
  for (const y of [790, 350, 570, 780, 340, 780, 570])
    await page.mouse.move(700, y);
  await expect(preview(page)).toHaveAttribute("data-project", "Southlight");
  await expect
    .poll(() =>
      preview(page)
        .locator("img")
        .evaluateAll((nodes) =>
          nodes.reduce((sum, n) => sum + n.getAnimations().length, 0),
        ),
    )
    .toBe(0);
  await expect(incoming).toHaveCSS("opacity", "1");
  await expect(incoming).toHaveCSS("transform", "none");
  expect(
    await preview(page)
      .locator("img")
      .evaluateAll(
        (nodes) =>
          nodes.filter((n) => getComputedStyle(n).opacity === "1").length,
      ),
  ).toBe(1);
});

test("viewport edges, keyboard/click pass-through, resize and route cleanup", async ({
  page,
}) => {
  await openDesktop(page, 1024);
  await page.mouse.move(970, 350);
  await expect(preview(page)).toHaveAttribute("data-visible", "true");
  await expect
    .poll(async () => (await preview(page).boundingBox())!.x)
    .toBeCloseTo(648, 0);
  for (const [x, y] of [
    [50, 250],
    [970, 880],
  ]) {
    await page.mouse.move(x, y);
    await expect
      .poll(async () => {
        const r = (await preview(page).boundingBox())!;
        return (
          r.x >= 15.9 &&
          r.y >= 15.9 &&
          r.x + r.width <= 1008.1 &&
          r.y + r.height <= 884.1
        );
      })
      .toBe(true);
  }
  // Intercept only the verified destination; no live external site interaction.
  await page.route("https://beeejooorn.github.io/Nova/", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<title>Verified project destination</title>",
    }),
  );
  const popupPromise = page.waitForEvent("popup");
  await projects(page).first().click();
  const popup = await popupPromise;
  await expect(popup).toHaveURL("https://beeejooorn.github.io/Nova/");
  await popup.close();
  await projects(page).first().focus();
  await page.keyboard.press("Tab");
  await expect(projects(page).nth(1)).toBeFocused();
  await expect(preview(page)).toHaveAttribute("data-visible", "false");
  await page.route("https://southlight-portfolio.webflow.io/", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<title>Verified keyboard destination</title>",
    }),
  );
  const keyboardPopup = page.waitForEvent("popup");
  await page.keyboard.press("Enter");
  const keyboardDestination = await keyboardPopup;
  await expect(keyboardDestination).toHaveURL(
    "https://southlight-portfolio.webflow.io/",
  );
  await keyboardDestination.close();
  await page.setViewportSize({ width: 390, height: 900 });
  await expect(preview(page)).toHaveCount(0);
  await page.getByRole("link", { name: "View all projects ↗" }).click();
  await expect(
    page.getByRole("heading", { name: "Works", exact: true }),
  ).toBeVisible();
  await expect(
    page.locator("[data-project-preview], [data-project-cursor]"),
  ).toHaveCount(0);
});

test("reduced motion keeps the same preview without eased travel or image wipes", async ({
  page,
}) => {
  await openDesktop(page, 1440, "reduce");
  await page.mouse.move(300, 340);
  await expect(preview(page)).toHaveAttribute("data-project", "Nova");
  await expect(preview(page)).toHaveCSS("transition-duration", "0s");
  await page.mouse.move(1000, 400);
  await expect
    .poll(async () => (await preview(page).boundingBox())!.x)
    .toBeCloseTo(820, 0);
  await page.mouse.move(700, 560);
  await expect(preview(page)).toHaveAttribute("data-project", "Southlight");
  expect(
    await preview(page)
      .locator("img")
      .evaluateAll((nodes) =>
        nodes.reduce((sum, n) => sum + n.getAnimations().length, 0),
      ),
  ).toBe(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(preview(page)).toHaveAttribute("data-visible", "false");
  await page.mouse.move(710, 570);
  await expect(preview(page)).toHaveAttribute("data-visible", "true");
});

for (const width of [320, 390, 768]) {
  test(`touch-first presentation at ${width}px requires no preview or image downloads`, async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    const images: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("/images/selected-work/"))
        images.push(request.url());
    });
    await page.goto(baseURL!);
    await expect(projects(page)).toHaveCount(5);
    await projects(page).first().scrollIntoViewIfNeeded();
    await page.mouse.move(180, 450);
    await expect(preview(page)).toHaveCount(0);
    expect(images).toEqual([]);
    // Scan the settled UI, whether scrolling leaves the M2 navbar shown or hidden.
    const header = page.getByRole("banner");
    await expect(header).toHaveAttribute(
      "data-scrolled",
      String(await page.evaluate(() => scrollY > 12)),
    );
    await expect
      .poll(() =>
        header.evaluate((node) => {
          const opacity = Number(getComputedStyle(node).opacity);
          return (
            node.getAnimations().length === 0 &&
            (opacity === 0 || opacity === 1)
          );
        }),
      )
      .toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await context.close();
  });
}

for (const reducedMotion of ["no-preference", "reduce"] as const) {
  test(`production ignores diagnostic parameters: ${reducedMotion}`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion });
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto("/?motionReview=1&forceMotion=1");
    await expect(page.locator("#shared-navigation")).toHaveAttribute(
      "inert",
      "",
    );
    await expect(
      page.getByRole("complementary", { name: "Local motion review" }),
    ).toHaveCount(0);
    await expect(page.locator("html")).not.toHaveAttribute(
      "data-m4-motion-review",
    );
    const menu = page.locator("#shared-navigation");
    await expect(menu).toHaveCSS(
      "transition-duration",
      reducedMotion === "reduce" ? "0s" : "0.3s, 0.3s, 0s",
    );
    const toggle = page.locator('button[aria-controls="shared-navigation"]');
    await toggle.click();
    if (reducedMotion === "no-preference")
      await expect
        .poll(() => menu.evaluate((n) => n.getAnimations().length))
        .toBeGreaterThan(0);
    else expect(await menu.evaluate((n) => n.getAnimations().length)).toBe(0);
    await expect(menu).toHaveCSS("opacity", "1");
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.evaluate(() => scrollTo(0, 900));
    await expect(page.getByRole("banner")).toHaveAttribute(
      "data-hidden",
      "true",
    );
    await page.mouse.move(280, 343);
    const preview = page.locator("[data-project-preview]");
    await expect(preview).toHaveAttribute("data-visible", "true");
    await expect(preview).toHaveCSS("opacity", "1");
    await expect(preview).toHaveCSS(
      "transition-duration",
      reducedMotion === "reduce" ? "0s" : "0.18s, 0s",
    );
    await page.mouse.move(1000, 418);
    if (reducedMotion === "no-preference")
      expect((await preview.boundingBox())!.x).toBeLessThan(819);
    await expect
      .poll(async () => (await preview.boundingBox())!.x)
      .toBeCloseTo(820, 0);
  });
}
