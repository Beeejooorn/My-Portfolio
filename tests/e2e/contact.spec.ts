import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const width of [320, 390, 768, 1024, 1440]) {
  test(`Contact layout and accessibility at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/contact");
    const form = page.getByRole("form", { name: "Project inquiry" });
    const heading = (await page
      .getByRole("heading", { name: "LET'S TALK." })
      .boundingBox())!;
    const controls = (await form.boundingBox())!;
    if (width <= 900)
      expect(controls.y).toBeGreaterThan(heading.y + heading.height);
    else expect(controls.x).toBeGreaterThanOrEqual(heading.x + heading.width);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBe(width);
    await expect(form.getByRole("checkbox")).toHaveCount(4);
    await expect(form.getByText("Email address pending")).toBeVisible();
    await expect(form.locator('a[href^="mailto:"]')).toHaveCount(0);
    if (width === 390 || width === 1440)
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
}
test("keyboard validation checks details locally and preserves the draft", async ({
  page,
}) => {
  await page.goto("/contact");
  const name = page.getByRole("textbox", { name: "Name", exact: true }),
    email = page.getByRole("textbox", { name: "Email", exact: true }),
    details = page.getByLabel("Tell me about your project");
  const submit = page.getByRole("button", { name: "Send inquiry" });
  await submit.click();
  await expect(name).toBeFocused();
  await expect(name).toHaveAccessibleDescription("Enter your name.");
  await name.fill("   ");
  await submit.click();
  await expect(name).toBeFocused();
  await name.fill("Alex");
  await email.fill("invalid");
  await details.fill("   ");
  await submit.click();
  await expect(email).toBeFocused();
  await expect(email).toHaveAccessibleDescription(/email address such as/);
  await email.fill("alex@example.com");
  await submit.click();
  await expect(details).toBeFocused();
  await email.focus();
  await page.keyboard.press("Tab");
  for (const label of [
    "Website development",
    "Website design",
    "Collaboration",
    "Other",
  ]) {
    const box = page.getByRole("checkbox", { name: label });
    await expect(box).toBeFocused();
    await expect(box.locator("+ span")).toHaveCSS("outline-style", "solid");
    await page.keyboard.press("Space");
    await expect(box).toBeChecked();
    await page.keyboard.press("Tab");
  }
  await expect(details).toBeFocused();
  await details.fill("A portfolio project");
  await page.keyboard.press("Tab");
  await expect(submit).toBeFocused();
  const requests: string[] = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toHaveText(
    "Details checked · no inquiry sent",
  );
  await expect(details).toHaveValue("A portfolio project");
  expect(requests).toEqual([]);
  await details.fill("Updated details");
  await expect(page.getByRole("status")).toHaveText(
    "Demo only · no email delivery",
  );
});
test.describe("static form", () => {
  test.use({ javaScriptEnabled: false });
  test("cannot transmit a draft before hydration", async ({ page }) => {
    await page.goto("/contact");
    await page
      .getByRole("textbox", { name: "Name", exact: true })
      .fill("Local only");
    await page
      .getByRole("textbox", { name: "Email", exact: true })
      .fill("local@example.com");
    await page.getByLabel("Tell me about your project").fill("Private draft");
    const requests: string[] = [];
    page.on("request", (r) => requests.push(r.url()));
    await page.getByRole("button", { name: "Send inquiry" }).click();
    await expect(page).toHaveURL("/contact");
    const notice = page.locator("form noscript");
    await expect(notice).toBeVisible();
    expect(await notice.textContent()).toContain(
      "Enable JavaScript to check the form.",
    );
    expect(requests).toEqual([]);
  });
});
