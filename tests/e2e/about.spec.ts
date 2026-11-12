import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`About composition at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/about");
    const portrait = page.getByRole("img", {
      name: "Bjorn Tanamal in graduation attire",
    });
    await portrait.evaluate(
      async (el) => await (el as HTMLImageElement).decode(),
    );
    await page.evaluate(() => document.fonts.ready);
    const photo = (await portrait.boundingBox())!;
    const greeting = (await page
      .getByRole("heading", { name: "Hi, I'm Bjorn." })
      .boundingBox())!;
    if (width <= 700)
      expect(greeting.y).toBeGreaterThanOrEqual(photo.y + photo.height);
    else expect(greeting.x).toBeGreaterThanOrEqual(photo.x + photo.width);
    await expect(portrait).toHaveCSS("object-fit", "contain");
    const statement = page.getByRole("region", { name: "Personal statement" });
    const resume = page.getByRole("link", { name: "DOWNLOAD RÉSUMÉ" });
    const linkBox = (await resume.boundingBox())!;
    expect((await statement.boundingBox())!.y).toBeGreaterThan(
      linkBox.y + linkBox.height,
    );
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBe(width);
    if (width === 390 || width === 1440)
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
}
test("keyboard downloads the original PDF", async ({ page, request }) => {
  await page.goto("/about");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  const link = page.getByRole("link", { name: "DOWNLOAD RÉSUMÉ" });
  await expect(link).toBeFocused();
  await expect(link).toHaveCSS("outline-style", "solid");
  const started = page.waitForEvent("download");
  await page.keyboard.press("Enter");
  const file = await started;
  expect(file.suggestedFilename()).toBe("Bjorn-Tanamal-Resume.pdf");
  const original = await readFile("public/Bjorn-Tanamal-Resume.pdf");
  expect(await readFile((await file.path())!)).toEqual(original);
  const response = await request.get("/Bjorn-Tanamal-Resume.pdf");
  expect(response.headers()["content-type"]).toBe("application/pdf");
});
