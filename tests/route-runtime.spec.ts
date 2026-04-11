import fs from "node:fs";
import path from "node:path";

import { expect, test } from "@playwright/test";

type ManifestItem = {
  slug: string;
  title: string;
  route: string;
  shell: string;
  priority: string;
  simplification: string;
  review_focus: string[];
};

const manifestPath = path.resolve(
  process.cwd(),
  "qa",
  "route-runtime-manifest.json",
);

const manifest = JSON.parse(
  fs.readFileSync(manifestPath, "utf8"),
) as ManifestItem[];

const artifactRoot = path.resolve(
  process.cwd(),
  "qa",
  "artifacts",
  "route-runtime",
);

for (const item of manifest) {
  test(`${item.slug} loads without runtime failures`, async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const failedRequests: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    page.on("pageerror", (error) => {
      pageErrors.push(error.message);
    });

    page.on("requestfailed", (request) => {
      const failure = request.failure();
      failedRequests.push(
        `${request.method()} ${request.url()} :: ${failure?.errorText || "unknown"}`,
      );
    });

    await page.goto(item.route, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("#root")).toContainText(/\S/);

    const routeDir = path.join(artifactRoot, item.slug);
    fs.mkdirSync(routeDir, { recursive: true });

    await page.screenshot({
      path: path.join(routeDir, "desktop.png"),
      fullPage: true,
    });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(routeDir, "mobile.png"),
      fullPage: true,
    });

    fs.writeFileSync(
      path.join(routeDir, "report.json"),
      JSON.stringify(
        {
          slug: item.slug,
          route: item.route,
          shell: item.shell,
          priority: item.priority,
          simplification: item.simplification,
          consoleErrors,
          pageErrors,
          failedRequests,
        },
        null,
        2,
      ),
    );

    expect(
      [...consoleErrors, ...pageErrors],
      `Runtime errors on ${item.route}`,
    ).toEqual([]);
  });
}
