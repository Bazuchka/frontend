import { expect } from "@playwright/test";
import { hasHeaderAndBreadcrumbs } from "./common/headerCheck";
import { CLIENT_TEST_NAME } from "./const";
import { testI18n } from "./fixtures/i18n.fixture";

testI18n.beforeEach(async ({ page, i18nFix }) => {
    await page.goto("/", {
        waitUntil: "networkidle",
    });

    await page.getByText(i18nFix.t("Shared:Reference.dictionary")).click();
    await page.getByText(i18nFix.t("Client:menu.clients")).click();
    await expect(page.getByTestId("progress")).toHaveCount(0);
});

testI18n.describe("Clients", () => {
    hasHeaderAndBreadcrumbs("Client:menu.clients");

    testI18n("has table with a client", async ({ page, i18nFix }) => {
        await expect(page.locator("table")).toContainText(CLIENT_TEST_NAME);
        await expect(
            page.getByTestId("table-footer").getByRole("button", { name: i18nFix.t("Action:open") })
        ).toBeDisabled();
    });

    testI18n("is able to open the client", async ({ page, i18nFix }) => {
        await page.locator("table").getByText(CLIENT_TEST_NAME, { exact: true }).click();
        await page
            .getByTestId("table-footer")
            .getByRole("button", { name: i18nFix.t("Action:open") })
            .click();
        await expect(
            page.getByTestId(`tab-header:${i18nFix.t("Shared:commonInfo")}`)
        ).toBeVisible();
        await expect(
            page
                .getByTestId("simple-tabpanel-0")
                .getByTestId("value:code")
                .getByText(CLIENT_TEST_NAME)
        ).toBeVisible();
        await expect(
            page
                .locator("header")
                .locator("nav")
                .getByText(i18nFix.t("Client:menu.client"), { exact: true })
        ).toBeVisible();
    });
});
