import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const paths = ["/", "/works", "/about", "/contact"];
for (const width of [320, 390, 768, 1024, 1440]) {
  test(`shared components at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of paths) {
      await page.goto(path);
      await expect(
        page.getByRole("navigation", { name: "Main navigation" }),
      ).toBeVisible();
      await expect(page.getByRole("contentinfo")).toBeVisible();
      await expect(
        page.getByRole("contentinfo").getByRole("listitem"),
      ).toHaveCount(4);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      expect(
        await page.getByRole("contentinfo").getByRole("link").count(),
      ).toBe(0);
      if (width <= 390) {
        const menu = page.getByRole("button", { name: "Open navigation" });
        await expect(menu).toBeVisible();
        await expect(page.locator("#shared-navigation")).toHaveAttribute(
          "inert",
          "",
        );
        const lines = await menu.locator("span > span").evaluateAll((nodes) =>
          nodes.map((n) => ({
            right: n.getBoundingClientRect().right,
            width: n.getBoundingClientRect().width,
          })),
        );
        expect(lines).toHaveLength(3);
        expect(new Set(lines.map((n) => n.width)).size).toBe(3);
        expect(
          Math.max(...lines.map((n) => n.right)) -
            Math.min(...lines.map((n) => n.right)),
        ).toBeLessThan(1);
        expect(
          await page
            .getByRole("contentinfo")
            .getByRole("list")
            .evaluate(
              (n) => getComputedStyle(n).gridTemplateColumns.split(" ").length,
            ),
        ).toBe(2);
      } else {
        await expect(
          page
            .getByRole("navigation")
            .getByRole("link", { name: "WORK", exact: true }),
        ).toBeVisible();
      }
      if (path === "/" && [390, 1440].includes(width))
        await page.screenshot({
          path: `test-results/m2-${width}.jpg`,
          fullPage: true,
        });
      if (width === 390)
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
          [],
        );
    }
  });
}
for (const reducedMotion of ["reduce", "no-preference"] as const) {
  test(`mobile keyboard, route close and motion: ${reducedMotion}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion });
    await page.goto("/");
    const toggle = page.locator('button[aria-controls="shared-navigation"]');
    await toggle.focus();
    await page.keyboard.press("Tab");
    await expect(
      page
        .getByRole("list", { name: "Selected projects" })
        .getByRole("link")
        .first(),
    ).toBeFocused();
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.getByRole("link", { name: "HOME", exact: true }),
    ).toBeVisible();
    await expect(page.locator("#shared-navigation")).toHaveCSS("opacity", "1");
    if (reducedMotion === "no-preference")
      await page.screenshot({
        path: "test-results/m2-menu-open.jpg",
        fullPage: true,
      });
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "HOME", exact: true }),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await page.getByRole("link", { name: "ABOUT", exact: true }).click();
    await expect(page).toHaveURL("/about");
    await expect(page.locator("#main")).toBeFocused();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    if (reducedMotion === "reduce")
      expect(
        await toggle
          .locator("span > span")
          .first()
          .evaluate((n) => getComputedStyle(n).transitionDuration),
      ).toBe("0s");
  });
}
test("desktop scroll thresholds, focus, top and short pages", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const header = page.getByRole("banner");
  await expect(header).toHaveAttribute("data-hidden", "false");
  // Test-only height. Production shells remain short.
  await page.addStyleTag({ content: "main { min-height:3000px; }" });
  await page.evaluate(() => window.scrollTo(0, 300));
  await expect(header).toHaveAttribute("data-hidden", "true");
  await page.evaluate(() => window.scrollTo(0, 250));
  await expect(header).toHaveAttribute("data-hidden", "false");
  await page.evaluate(() => window.scrollTo(0, 600));
  await expect(header).toHaveAttribute("data-hidden", "true");
  await page.getByRole("link", { name: "WORK", exact: true }).focus();
  await expect(header).toHaveAttribute("data-hidden", "false");
  await page.getByRole("link", { name: "WORK", exact: true }).click();
  await expect(page).toHaveURL("/works");
  await expect(header).toHaveAttribute("data-hidden", "false");
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(header).toHaveAttribute("data-hidden", "false");
  // The not-found route still fits a desktop viewport.
  await page.goto("/missing");
  await expect(header).toHaveAttribute("data-hidden", "false");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollHeight <= innerHeight + 12,
    ),
  ).toBe(true);
});
test("open mobile menu stays visible during scroll and responds to touch", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await page.getByRole("button", { name: "Open navigation" }).tap();
  await page.addStyleTag({ content: "main{min-height:3000px}" });
  await page.evaluate(() => window.scrollTo(0, 400));
  await expect(page.getByRole("banner")).toHaveAttribute(
    "data-hidden",
    "false",
  );
  await expect(
    page.getByRole("button", { name: "Close navigation" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "WORK", exact: true }).tap();
  await expect(page).toHaveURL("http://127.0.0.1:4173/works");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
  await context.close();
});

test("each shared desktop destination works from every route", async ({
  page,
}) => {
  const destinations = [
    ["Bjorn Tanamal", "/", "FRONTEND DEVELOPER"],
    ["WORK", "/works", "Works"],
    ["ABOUT", "/about", "ABOUT ME."],
    ["CONTACT", "/contact", "LET'S TALK."],
  ];
  for (const from of paths) {
    for (const [name, to, title] of destinations) {
      await page.goto(from);
      await page
        .getByRole("navigation")
        .getByRole("link", { name, exact: true })
        .click();
      await expect(page).toHaveURL(to);
      await expect(
        page
          .getByRole("main")
          .getByRole("heading", { name: title, exact: true }),
      ).toBeVisible();
      await expect(page.getByRole("banner")).toHaveAttribute(
        "data-hidden",
        "false",
      );
    }
  }
});
