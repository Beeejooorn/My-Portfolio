import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const [path, title] of [
  ["/", "FRONTEND DEVELOPER"],
  ["/works", "Works"],
  ["/about", "ABOUT ME."],
  ["/contact", "Contact"],
]) {
  test(`${path} prerenders, hydrates and is accessible`, async ({
    page,
    request,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    const response = await request.get(path);
    expect(response.ok()).toBeTruthy();
    const html = await response.text();
    if (path === "/")
      expect(html).toMatch(
        /<h1\b[^>]*>[\s\S]*?FRONTEND[\s\S]*?DEVELOPER[\s\S]*?<\/h1>/,
      );
    else if (path === "/works")
      expect(html).toContain('<h1 aria-label="Works">WORKS</h1>');
    else expect(html).toContain(`<h1>${title}</h1>`);
    await page.goto(path);
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
    if (path !== "/contact") {
      await page.evaluate(() => {
        document.documentElement.dataset.homepageHydrationProbe = "ready";
      });
      await page
        .getByRole("navigation")
        .getByRole("link", { name: "CONTACT", exact: true })
        .click();
      await expect(
        page.getByRole("heading", { name: "Contact", exact: true }),
      ).toBeVisible();
      await expect(page.locator("html")).toHaveAttribute(
        "data-homepage-hydration-probe",
        "ready",
      );
      await page.goBack();
      await expect(
        page.getByRole("heading", { name: title, exact: true }),
      ).toBeVisible();
      await page.reload();
      await expect(
        page.getByRole("heading", { name: title, exact: true }),
      ).toBeVisible();
    } else {
      await page.getByRole("button").click();
      await expect(page.getByRole("button")).toHaveText("Hydration check: 1");
      await page.reload();
      await expect(page.getByRole("button")).toHaveText("Hydration check: 0");
    }
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}
test("client navigation, history and unknown route", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "WORK", exact: true }).click();
  await expect(page).toHaveURL("/works");
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "FRONTEND DEVELOPER", exact: true }),
  ).toBeVisible();
  await page.goForward();
  await expect(
    page.getByRole("heading", { name: "Works", exact: true }),
  ).toBeVisible();
  await page.goto("/missing");
  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible();
});
