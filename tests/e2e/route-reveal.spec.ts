import { test, expect } from "@playwright/test";

declare global {
  interface Window {
    revealSamples: Record<string, number[]>;
  }
}
for (const reducedMotion of ["no-preference", "reduce"] as const) {
  test(`route entrance, history and scroll with ${reducedMotion}`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error" || m.text().includes("Blocked aria-hidden"))
        errors.push(m.text());
    });
    await page.addInitScript(() => {
      const samples: Record<string, number[]> = {};
      Object.assign(window, { revealSamples: samples });
      function tick() {
        const title = document.querySelector("main h1");
        if (title) {
          const key = title.textContent ?? "";
          const values = (samples[key] ??= []);
          samples[key] = values;
          const value = Number(getComputedStyle(title).opacity);
          if (values.at(-1) !== value) values.push(value);
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
    await page.goto("/");
    const nav = page.getByRole("navigation");
    const main = page.getByRole("main");
    const title = main.locator("h1");
    const header = await page.getByRole("banner").elementHandle();
    for (const [label, path] of [
      ["", "/"],
      ["WORK", "/works"],
      ["ABOUT", "/about"],
      ["CONTACT", "/contact"],
    ]) {
      if (label) {
        await nav.getByRole("link", { name: label, exact: true }).click();
        await expect(page).toHaveURL(path);
        await expect(main).toBeFocused();
        await expect(
          page.locator("[aria-live=polite][data-leaving]"),
        ).toHaveText(await page.title());
      }
      await expect(title).toHaveCSS("opacity", "1");
      const samples = await title.evaluate(
        (el) => window.revealSamples[el.textContent!],
      );
      if (reducedMotion === "reduce") expect(samples).toEqual([1]);
      else
        expect(samples.filter((n) => n > 0.48 && n < 1).length).toBeGreaterThan(
          1,
        );
      expect(
        await header!.evaluate(
          (el) => el === document.querySelector("body > header"),
        ),
      ).toBe(true);
    }
    await nav.getByRole("link", { name: "WORK", exact: true }).click();
    await page.evaluate(() => scrollTo(0, 500));
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(500);
    await main
      .getByRole("link", { name: "Get in touch" })
      .evaluate((el) => (el as HTMLElement).focus({ preventScroll: true }));
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL("/contact");
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    await page.goBack();
    await expect(page).toHaveURL("/works");
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(500);
    await page.goForward();
    await expect(main).toBeFocused();
    expect(errors).toEqual([]);
  });
}
test("pending exit is interruptible and the latest destination wins", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  let release!: () => void;
  const gate = new Promise<void>((r) => {
    release = r;
  });
  await page.route(/\/assets\/works-[^/]+\.js$/, async (route) => {
    await gate;
    await route.continue();
  });
  await page.goto("/");
  const nav = page.getByRole("navigation");
  try {
    await nav.getByRole("link", { name: "WORK", exact: true }).click();
    await expect(page.locator("[data-leaving]")).toHaveAttribute(
      "data-leaving",
      "true",
    );
    await expect(page.getByRole("main")).toHaveCSS("opacity", "0.8");
    await nav.getByRole("link", { name: "ABOUT", exact: true }).click();
    await expect(page).toHaveURL("/about");
  } finally {
    release();
  }
  await expect(page.getByRole("main")).toHaveCSS("opacity", "1");
  await expect(page.getByRole("main")).toBeFocused();
  await expect(page.locator("main")).toHaveCount(1);
});
test("page interaction does not restart the heading reveal", async ({
  page,
}) => {
  await page.goto("/contact");
  const title = page.locator("main h1");
  await expect(title).toHaveCSS("opacity", "1");
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(
    page.getByRole("textbox", { name: "Name", exact: true }),
  ).toBeFocused();
  expect(await title.evaluate((el) => el.getAnimations().length)).toBe(0);
});
