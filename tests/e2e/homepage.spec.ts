import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import path from "node:path";

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`Homepage Phase A at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "FRONTEND DEVELOPER",
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByText("I am Bjorn Tanamal", { exact: true }),
    ).toBeVisible();
    const projects = page.getByRole("list", { name: "Selected projects" });
    await expect(projects.getByRole("link")).toHaveCount(5);
    const measurements = await page.evaluate(() => {
      const about = document
        .getElementById("home-about-title")!
        .closest("section")!;
      const contact = document
        .getElementById("home-contact-title")!
        .closest("section")!;
      const action = document.querySelector<HTMLAnchorElement>(
        "#home-contact-title a",
      )!;
      return {
        scrollWidth: document.documentElement.scrollWidth,
        about: getComputedStyle(about).backgroundColor,
        contact: getComputedStyle(contact).backgroundColor,
        actionWidth: action.getBoundingClientRect().width,
        actionSpace:
          contact.clientWidth -
          Number.parseFloat(
            getComputedStyle(action.parentElement!.parentElement!).paddingLeft,
          ) *
            2,
      };
    });
    expect(measurements.scrollWidth).toBeLessThanOrEqual(width);
    expect(measurements.about).toBe("rgb(32, 37, 32)");
    expect(measurements.contact).toBe("rgb(245, 243, 239)");
    expect(measurements.actionWidth).toBeLessThanOrEqual(
      measurements.actionSpace,
    );
    for (const anchor of await projects.getByRole("link").all()) {
      await expect(anchor).toHaveAttribute("href", /^https:\/\//);
      await expect(anchor).toHaveAttribute("target", "_blank");
    }
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    expect(errors).toEqual([]);
    await page.screenshot({
      path: path.join(
        process.env.M4_EVIDENCE_DIR ?? "test-results",
        `homepage-${width}.png`,
      ),
      fullPage: true,
    });
  });
}

test("Homepage keyboard, internal actions, history and mobile menu", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("#shared-navigation")).toHaveAttribute("inert", "");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  await page.getByRole("link", { name: "GET IN TOUCH", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "Contact", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("main")).toBeFocused();
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "FRONTEND DEVELOPER", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "More about me ↗" }).click();
  await expect(
    page.getByRole("heading", { name: "ABOUT ME.", exact: true }),
  ).toBeVisible();
  await page.goto("/");
  await expect(page.locator("#shared-navigation")).toHaveAttribute("inert", "");
  const toggle = page.locator('button[aria-controls="shared-navigation"]');
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("link", { name: "View all projects ↗" }).click();
  await expect(
    page.getByRole("heading", { name: "Works", exact: true }),
  ).toBeVisible();
});

test("Homepage composition and Contact action remain usable without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 900 },
  });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(
    page.getByRole("heading", { name: "FRONTEND DEVELOPER", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("list", { name: "Selected projects" }).getByRole("link"),
  ).toHaveCount(5);
  await page.getByRole("link", { name: "GET IN TOUCH", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Contact", exact: true }),
  ).toBeVisible();
  await context.close();
});
