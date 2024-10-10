/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, Page } from "@playwright/test";
import { testI18n } from "../fixtures/i18n.fixture";

export const hasHeaderAndBreadcrumbsStep = (
    path: string[],
    {
        page,
        i18nFix,
    }: {
        page: Page;
        i18nFix: any;
    }
) => {
    return testI18n.step("has header and breadcumbs", async () => {
        await expect(
            page.locator("h2").getByText(i18nFix.t(path[path.length - 1]), { exact: true })
        ).toBeVisible();

        for (let index = 0; index < path.length; index++) {
            const menuItem = path[index];

            await expect(
                page.locator("header").locator("nav").getByText(i18nFix.t(menuItem))
            ).toBeVisible();
        }
    });
};
