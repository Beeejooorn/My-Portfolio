import { test, expect } from "@playwright/test";
type Paint = { title: string; opacity: number; y: number };
declare global {
  interface Window {
    m3Paints: Paint[];
    unsafeMenuHides: string[];
  }
}
for (const motion of ["no-preference", "reduce"] as const) {
  test(`real first-painted route frames and lifecycle: ${motion}`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: motion });
    await page.setViewportSize({ width: 1024, height: 844 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error" || m.text().includes("aria-hidden"))
        errors.push(m.text());
    });
    await page.addInitScript(() => {
      window.m3Paints = [];
      function frame() {
        const n = document.querySelector("[data-smooth-reveal]");
        const title = document.querySelector("main h1")?.textContent;
        if (n && title) {
          const cs = getComputedStyle(n);
          window.m3Paints.push({
            title,
            opacity: Number(cs.opacity),
            y:
              cs.transform === "none"
                ? 0
                : new DOMMatrixReadOnly(cs.transform).m42,
          });
        }
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: "Hydration check: 0" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Hydration check: 0" }).click();
    await expect(page.locator("[data-smooth-reveal]")).toHaveCSS(
      "opacity",
      "1",
    );
    if (motion === "no-preference")
      await expect
        .poll(() =>
          page.evaluate(() =>
            window.m3Paints.some(
              (p) => p.title === "Homepage" && p.opacity < 1 && p.y > 0,
            ),
          ),
        )
        .toBe(true);
    for (const [name, title] of [
      ["WORK", "Works"],
      ["ABOUT", "About"],
      ["CONTACT", "Contact"],
    ]) {
      await page
        .getByRole("navigation")
        .getByRole("link", { name, exact: true })
        .click();
      await expect(
        page.getByRole("heading", { name: title, exact: true }),
      ).toBeVisible();
      await expect
        .poll(() =>
          page.evaluate(
            (title) => window.m3Paints.some((p) => p.title === title),
            title,
          ),
        )
        .toBe(true);
      const first = await page.evaluate(
        (title) => window.m3Paints.find((p) => p.title === title)!,
        title,
      );
      if (motion === "no-preference") {
        expect(first.opacity).toBeLessThan(1);
        expect(first.opacity).toBeGreaterThan(0);
        expect(first.y).toBeGreaterThan(0);
      } else {
        expect(first.opacity).toBe(1);
        expect(first.y).toBe(0);
      }
      await expect(page.getByRole("main")).toBeFocused();
      await expect(page.locator("[data-smooth-reveal]")).toHaveCSS(
        "transform",
        "none",
      );
    }
    await page.goBack();
    await expect(
      page.getByRole("heading", { name: "About", exact: true }),
    ).toBeVisible();
    await page.goForward();
    await expect(
      page.getByRole("heading", { name: "Contact", exact: true }),
    ).toBeVisible();
    for (const name of ["WORK", "ABOUT", "CONTACT"])
      await page
        .getByRole("navigation")
        .getByRole("link", { name, exact: true })
        .click();
    await expect(page).toHaveURL("/contact");
    await expect(page.locator("[data-smooth-reveal]")).toHaveCSS(
      "opacity",
      "1",
    );
    expect(errors).toEqual([]);
  });
  test(`mobile focus is released before hiding: ${motion}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: motion });
    await page.addInitScript(() => {
      window.unsafeMenuHides = [];
      const original = Element.prototype.setAttribute;
      Element.prototype.setAttribute = function (name, value) {
        if (
          this.id === "shared-navigation" &&
          ((name === "aria-hidden" && value === "true") || name === "inert") &&
          this.contains(document.activeElement)
        )
          window.unsafeMenuHides.push(
            document.activeElement?.textContent ?? "focused descendant",
          );
        return original.call(this, name, value);
      };
    });
    const warnings: string[] = [];
    page.on("console", (m) => {
      if (m.text().includes("aria-hidden")) warnings.push(m.text());
    });
    await page.goto("/");
    await expect(page.locator("#shared-navigation")).toHaveAttribute(
      "inert",
      "",
    );
    await page.getByRole("button", { name: "Hydration check: 0" }).click();
    await expect(
      page.getByRole("button", { name: "Hydration check: 1" }),
    ).toBeVisible();
    const toggle = page.locator('button[aria-controls="shared-navigation"]');
    await expect(page.locator("#shared-navigation")).toHaveAttribute(
      "inert",
      "",
    );
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.getByRole("link", { name: "WORK", exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL("/works");
    await expect(page.getByRole("main")).toBeFocused();
    await expect(page.locator("#shared-navigation")).toHaveAttribute(
      "inert",
      "",
    );
    await toggle.click();
    await page.getByRole("link", { name: "ABOUT", exact: true }).focus();
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await page.getByRole("link", { name: "CONTACT", exact: true }).focus();
    await page.setViewportSize({ width: 1024, height: 844 });
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(toggle).toBeFocused();
    expect(await page.evaluate(() => window.unsafeMenuHides)).toEqual([]);
    expect(warnings).toEqual([]);
  });
}
