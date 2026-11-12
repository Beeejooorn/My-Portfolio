import { test, expect } from "@playwright/test";

for (const mode of [
  {
    name: "normal preference",
    reduced: "no-preference",
    force: false,
    animated: true,
  },
  {
    name: "reduced preference",
    reduced: "reduce",
    force: false,
    animated: false,
  },
  {
    name: "explicit DEV override with reduced preference",
    reduced: "reduce",
    force: true,
    animated: true,
  },
] as const) {
  test(mode.name, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: mode.reduced });
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto(`/?motionReview=1${mode.force ? "&forceMotion=1" : ""}`);
    const panel = page.getByRole("complementary", {
      name: "Local motion review",
    });
    await expect(panel).toContainText(
      `Effective reduced motion: ${!mode.animated}`,
    );
    await expect(page.locator("#shared-navigation")).toHaveAttribute(
      "inert",
      "",
    );
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.evaluate(() => scrollTo(0, 900));
    const header = page.getByRole("banner");
    await expect(header).toHaveAttribute("data-hidden", "true");
    await expect(header).toHaveCSS("opacity", "0");
    const preview = page.locator("[data-project-preview]");
    await page.mouse.move(280, 343);
    await expect(preview).toHaveAttribute("data-visible", "true");
    await expect(preview).toHaveCSS("opacity", "1");
    await page.mouse.move(1000, 418);
    if (mode.animated)
      expect((await preview.boundingBox())!.x).toBeLessThan(819);
    await expect
      .poll(async () => (await preview.boundingBox())!.x)
      .toBeCloseTo(820, 0);
    await page.mouse.move(700, 565);
    await expect(preview).toHaveAttribute("data-project", "Southlight");
    const image = preview.locator('img[data-preview-image="Southlight"]');
    if (mode.animated)
      await expect
        .poll(() => image.evaluate((n) => n.getAnimations().length))
        .toBeGreaterThan(0);
    else expect(await image.evaluate((n) => n.getAnimations().length)).toBe(0);

    await page.evaluate(() => scrollTo(0, 600));
    await expect(header).toHaveAttribute("data-hidden", "false");
    if (mode.animated)
      await expect
        .poll(() => header.evaluate((n) => n.getAnimations().length))
        .toBeGreaterThan(0);
    await expect(header).toHaveCSS("opacity", "1");
    await page.evaluate(() => scrollTo(0, 1000));
    await expect(header).toHaveAttribute("data-hidden", "true");
    if (mode.animated)
      await expect
        .poll(() => header.evaluate((n) => n.getAnimations().length))
        .toBeGreaterThan(0);
    await expect(header).toHaveCSS("opacity", "0");

    await page.setViewportSize({ width: 390, height: 900 });
    await page.evaluate(() => scrollTo(0, 0));
    await expect(header).toHaveCSS("opacity", "1");
    await expect(page.locator("#shared-navigation")).toHaveAttribute(
      "inert",
      "",
    );
    const toggle = page.locator('button[aria-controls="shared-navigation"]');
    const menu = page.locator("#shared-navigation");
    await expect(menu).toHaveCSS(
      "transition-duration",
      mode.animated ? "0.3s, 0.3s, 0s" : "0s",
    );
    await toggle.click();
    if (mode.animated)
      await expect
        .poll(() =>
          menu.evaluate((n) => {
            const opacity = Number(getComputedStyle(n).opacity);
            return opacity > 0 && opacity < 1;
          }),
        )
        .toBe(true);
    await expect(menu).toHaveCSS("opacity", "1");
    await page.getByRole("link", { name: "WORK", exact: true }).focus();
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await expect(menu).toHaveCSS("opacity", "0");
    await page
      .context()
      .grantPermissions(["clipboard-read", "clipboard-write"]);
    await panel.getByRole("button", { name: "Copy motion report" }).click();
    await expect(panel).toContainText("Report copied");
    const report = JSON.parse(
      await page.evaluate(() => navigator.clipboard.readText()),
    );
    expect(report.rawReduced).toBe(mode.reduced === "reduce");
    expect(report.forced).toBe(mode.force);
    expect(report.effectiveReduced).toBe(!mode.animated);
    if (mode.animated) {
      expect(report.summary.trailingFrames).toBeGreaterThan(0);
      expect(
        report.summary.strokeFrames.every((count: number) => count > 0),
      ).toBe(true);
      expect(report.summary.dropdownFrames).toBeGreaterThan(0);
      expect(report.summary.headerFrames).toBeGreaterThan(0);
      expect(report.summary.imageWipeFrames).toBeGreaterThan(0);
    }
    expect(errors).toEqual([]);
  });
}

test("force alone is inert; review persists across routes and exits on full reload", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?forceMotion=1");
  await expect(
    page.getByRole("complementary", { name: "Local motion review" }),
  ).toHaveCount(0);
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-m4-motion-review",
  );
  await page.goto("/?motionReview=1&forceMotion=1");
  const panel = page.getByRole("complementary", {
    name: "Local motion review",
  });
  await expect(panel).toBeVisible();
  await page.getByRole("link", { name: "View all projects ↗" }).click();
  await expect(
    page.getByRole("heading", { name: "Works", exact: true }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute(
    "data-m4-motion-review",
    "",
  );
  await panel
    .getByRole("link", { name: "Exit review and reload this route" })
    .click();
  await expect(panel).toHaveCount(0);
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-m4-motion-review",
  );
  expect(await page.locator("[data-smooth-reveal]").count()).toBe(0);
});
