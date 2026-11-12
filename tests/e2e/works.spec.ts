import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "../../app/projects";

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`Works gallery at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/works");
    const gallery = page.getByRole("region", { name: "Project collection" });
    const cards = gallery.getByRole("link");
    await expect(cards).toHaveCount(5);
    const columns = await gallery.evaluate(
      (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length,
    );
    expect(columns).toBe(width < 651 ? 1 : 2);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBe(width);
    for (const [i, project] of projects.entries()) {
      const card = cards.nth(i);
      await expect(card).toHaveAttribute("href", project.href);
      await expect(card.getByRole("heading")).toHaveText(project.title);
      const image = card.getByRole("img");
      await expect(image).toHaveAttribute("src", project.image);
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(
        async (node) => await (node as HTMLImageElement).decode(),
      );
    }
    if (width === 390)
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.getByRole("link", { name: "Get in touch" }).click();
    await expect(page).toHaveURL("/contact");
  });
}
for (const reducedMotion of ["reduce", "no-preference"] as const) {
  test(`Only the image zooms with ${reducedMotion}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion });
    await page.goto("/works");
    const card = page.getByRole("link", { name: /Nova.*Live Site/ });
    await card.scrollIntoViewIfNeeded();
    await page.evaluate(() => document.fonts.ready.then(() => true));
    const image = card.getByRole("img");
    const heading = card.getByRole("heading");
    const before = [await card.boundingBox(), await heading.boundingBox()];
    await card.hover();
    await expect(image).toHaveCSS(
      "transform",
      reducedMotion === "reduce" ? "none" : "matrix(1.03, 0, 0, 1.03, 0, 0)",
    );
    expect([await card.boundingBox(), await heading.boundingBox()]).toEqual(
      before,
    );
    await page.mouse.move(0, 0);
    await expect(image).toHaveCSS("transform", "none");
    await card.focus();
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: /Southlight.*Live Site/ }),
    ).toBeFocused();
    expect(await page.locator(":focus-visible").count()).toBe(1);
  });
}
test.describe("touch navigation", () => {
  test.use({ hasTouch: true, viewport: { width: 390, height: 844 } });
  test("a tap opens the verified destination", async ({ page, context }) => {
    const [project] = projects;
    await context.route(project.href, (route) =>
      route.fulfill({ body: "Destination reached" }),
    );
    await page.goto("/works");
    const opened = page.waitForEvent("popup");
    await page.getByRole("link", { name: /Nova.*Live Site/ }).tap();
    await expect(await opened).toHaveURL(project.href);
  });
});
