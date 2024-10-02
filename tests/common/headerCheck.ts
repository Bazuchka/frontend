import { expect } from "@playwright/test";
import { testI18n } from "../fixtures/i18n.fixture";

export const hasHeaderAndBreadcrumbs = (menuName: string) => {
    testI18n("has header and breadcumbs", async ({ page, i18nFix }) => {
        await expect(
            page.locator("h2").getByText(i18nFix.t(menuName), { exact: true })
        ).toBeVisible();
        await expect(
            page
                .locator("header")
                .locator("nav")
                .getByText(i18nFix.t("Shared:Reference.dictionary"))
        ).toBeVisible();
        await expect(
            page.locator("header").locator("nav").getByText(i18nFix.t(menuName))
        ).toBeVisible();
    });
};
