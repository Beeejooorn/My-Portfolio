import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
type Evidence = {
  samples: { opacity: number; y: number; headerTop: number }[];
  shifts: number;
};
declare global {
  interface Window {
    __revealEvidence: Evidence;
  }
}
const routes = [
  ["/", "Homepage"],
  ["/works", "Works"],
  ["/about", "About"],
  ["/contact", "Contact"],
];
const surface = "[data-smooth-reveal]";
async function probe(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    const evidence: Evidence = { samples: [], shifts: 0 };
    Object.assign(window, { __revealEvidence: evidence });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & {
          value: number;
          hadRecentInput: boolean;
        };
        if (!shift.hadRecentInput) evidence.shifts += shift.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
    const start = performance.now();
    function sample() {
      const n = document.querySelector("[data-smooth-reveal]");
      if (n) {
        const cs = getComputedStyle(n);
        evidence.samples.push({
          opacity: Number(cs.opacity),
          y:
            cs.transform === "none"
              ? 0
              : new DOMMatrixReadOnly(cs.transform).m42,
          headerTop:
            document.querySelector("header")?.getBoundingClientRect().top ?? 0,
        });
      }
      if (performance.now() - start < 1200) requestAnimationFrame(sample);
    }
    requestAnimationFrame(sample);
  });
}
for (const width of [320, 390, 768, 1024, 1440]) {
  test(`normal entrances and route stability at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await probe(page);
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    for (const [path, title] of routes) {
      await page.goto(path);
      await expect(
        page.getByRole("heading", { name: title, exact: true }),
      ).toBeVisible();
      await expect
        .poll(() =>
          page.evaluate(() => {
            const e = (window as Window & { __revealEvidence: Evidence })
              .__revealEvidence;
            return e.samples.some(
              (s) => s.opacity > 0 && s.opacity < 0.99 && s.y > 0,
            );
          }),
        )
        .toBe(true);
      await expect(page.locator(surface)).toHaveCSS("opacity", "1");
      await expect(page.locator(surface)).toHaveCSS("transform", "none");
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const evidence = await page.evaluate(() => window.__revealEvidence);
      expect(evidence.shifts).toBeLessThan(0.1);
      expect(evidence.samples.every((s) => s.headerTop === 0)).toBe(true);
    }
    expect(errors).toEqual([]);
  });
}
for (const width of [390, 1440]) {
  test(`reduced motion, immediate navigation and accessibility at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: "Hydration check: 0" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Hydration check: 0" }).click();
    await expect(page.locator(surface)).toHaveCSS("opacity", "1");
    expect(
      await page.locator(surface).evaluate((n) => n.getAnimations().length),
    ).toBe(0);
    if (width === 390)
      await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "ABOUT", exact: true })
      .click();
    await expect(page).toHaveURL("/about");
    await expect(page.getByRole("main")).toBeFocused();
    await expect(page.getByRole("status")).toHaveText("About page");
    await expect(page.locator(surface)).toHaveCSS("opacity", "1");
    expect(
      await page.locator(surface).evaluate((n) => n.getAnimations().length),
    ).toBe(0);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
}
for (const [path, title] of routes) {
  test(`prerender stays visible without JavaScript: ${path}`, async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:4173" + path);
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
    await expect(page.locator(surface)).toHaveCSS("opacity", "1");
    await expect(page.locator(surface)).toHaveCSS("transform", "none");
    await context.close();
  });
}
test("delayed hydration keeps useful content visible", async ({ page }) => {
  let release!: () => void;
  const gate = new Promise<void>((r) => (release = r));
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.route("**/assets/*.js", async (route) => {
    await gate;
    await route.continue();
  });
  await page.goto("/about", { waitUntil: "commit" });
  await expect(
    page.getByRole("heading", { name: "About", exact: true }),
  ).toBeVisible();
  await expect(page.locator(surface)).toHaveCSS("opacity", "1");
  release();
  await page.getByRole("button", { name: "Hydration check: 0" }).click();
  await expect(
    page.getByRole("button", { name: "Hydration check: 1" }),
  ).toBeVisible();
  await expect(page.locator(surface)).toHaveCSS("opacity", "1");
});
test("rapid interruptions, history, focus and persistent shared UI", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const header = await page.getByRole("banner").elementHandle();
  const footer = await page.getByRole("contentinfo").elementHandle();
  for (const name of ["WORK", "ABOUT", "CONTACT", "WORK", "CONTACT"]) {
    await page
      .getByRole("navigation")
      .getByRole("link", { name, exact: true })
      .click();
  }
  await expect(page).toHaveURL("/contact");
  await expect(
    page.getByRole("heading", { name: "Contact", exact: true }),
  ).toBeVisible();
  await expect(page.locator(surface)).toHaveCount(1);
  await expect(page.locator(surface)).toHaveCSS("opacity", "1");
  expect(
    await page.evaluate((n) => n === document.querySelector("header"), header),
  ).toBe(true);
  expect(
    await page.evaluate((n) => n === document.querySelector("footer"), footer),
  ).toBe(true);
  await expect(page.getByRole("main")).toBeFocused();
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "Works", exact: true }),
  ).toBeVisible();
  await page.goForward();
  await expect(
    page.getByRole("heading", { name: "Contact", exact: true }),
  ).toBeVisible();
  await expect(page.locator(surface)).toHaveCSS("opacity", "1");
});
test("scroll restoration and live reduced-motion interruption", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.addStyleTag({ content: "main{min-height:3000px}" });
  await page.evaluate(() => scrollTo(0, 600));
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "WORK", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/works");
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await page.goBack();
  await expect(page).toHaveURL("/");
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(600);
  await page.goForward();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(surface)).toHaveCSS("opacity", "1");
  await expect(page.locator(surface)).toHaveCSS("transform", "none");
});
