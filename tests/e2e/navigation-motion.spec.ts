import { test, expect } from "@playwright/test";
for (const reducedMotion of ["no-preference", "reduce"] as const) {
  test(`navbar actual transition frames: ${reducedMotion}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion });
    await page.goto("/");
    const toggle = page.locator('button[aria-controls="shared-navigation"]');
    const menu = page.locator("#shared-navigation");
    await toggle.click();
    if (reducedMotion === "no-preference") {
      await expect
        .poll(() => menu.evaluate((n) => n.getAnimations().length))
        .toBeGreaterThan(0);
      const sample = await menu.evaluate((n) => ({
        opacity: Number(getComputedStyle(n).opacity),
        transform: getComputedStyle(n).transform,
        rows: [...n.querySelectorAll("a")].map(
          (a) => getComputedStyle(a).transitionDelay,
        ),
      }));
      expect(sample.opacity).toBeGreaterThan(0);
      expect(sample.opacity).toBeLessThan(1);
      expect(sample.rows).toEqual(["0s, 0s", "0.025s", "0.05s", "0.075s"]);
    } else {
      expect(await menu.evaluate((n) => n.getAnimations().length)).toBe(0);
      await expect(menu).toHaveCSS("opacity", "1");
    }
    await expect(menu).toHaveCSS("opacity", "1");
    await toggle.click();
    await expect(menu).toHaveAttribute("inert", "");
    if (reducedMotion === "no-preference")
      expect(
        await menu.evaluate((n) => n.getAnimations().length),
      ).toBeGreaterThan(0);
    else expect(await menu.evaluate((n) => n.getAnimations().length)).toBe(0);
    await expect(menu).toHaveCSS("opacity", "0");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    // Scroll height exists only in the test document.
    await page.setViewportSize({ width: 1024, height: 700 });
    await page.getByRole("main").click();
    await page.addStyleTag({ content: "main{min-height:3000px}" });
    const header = page.getByRole("banner");
    await page.evaluate(() => scrollTo(0, 300));
    await expect(header).toHaveAttribute("data-hidden", "true");
    if (reducedMotion === "reduce")
      expect(await header.evaluate((n) => n.getAnimations().length)).toBe(0);
    await expect(header).toHaveCSS("opacity", "0");
    await page.evaluate(() => scrollTo(0, 250));
    await expect(header).toHaveAttribute("data-hidden", "false");
    await expect(header).toHaveCSS("opacity", "1");
  });
}
