/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, Page } from "@playwright/test";
import { testI18n } from "../fixtures/i18n.fixture";

export const hasHeaderAndBreadcrumbsStep = (
    menuName: string,
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
