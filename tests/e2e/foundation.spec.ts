import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const [path, title] of [
  ["/", "Homepage"],
  ["/works", "Works"],
  ["/about", "About"],
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
    expect(await response.text()).toContain(`<h1>${title}</h1>`);
    await page.goto(path);
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
    await page.getByRole("button").click();
    await expect(page.getByRole("button")).toHaveText("Hydration check: 1");
    await page.reload();
    await expect(page.getByRole("button")).toHaveText("Hydration check: 0");
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}
test("client navigation, history and unknown route", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Works", exact: true }).click();
  await expect(page).toHaveURL("/works");
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "Homepage", exact: true }),
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
