import { expect } from "@playwright/test";
import { hasHeaderAndBreadcrumbsStep } from "./common/headerCheck";
import { loadScene } from "./common/scene";
import { SERVICE_TEST_NAME } from "./const";
import { testI18n } from "./fixtures/i18n.fixture";

export const services = () =>
    testI18n("Services", async ({ page, i18nFix }) => {
        await loadScene({ page, i18nFix }, ["Shared:Reference.dictionary", "Service:menu.all"]);

        await hasHeaderAndBreadcrumbsStep(["Shared:Reference.dictionary", "Service:menu.all"], {
            page,
            i18nFix,
        });

        await testI18n.step("has table with a service", async () => {
            await expect(page.locator("table")).toContainText(SERVICE_TEST_NAME);
            await expect(
                page
                    .getByTestId("table-footer")
                    .getByRole("button", { name: i18nFix.t("Action:open") })
            ).toBeDisabled();
        });

        await testI18n.step("is able to open the service", async () => {
            await page.locator("table").getByText(SERVICE_TEST_NAME, { exact: true }).click();
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
                    .getByTestId("value:name")
                    .getByText(SERVICE_TEST_NAME, { exact: true })
            ).toBeVisible();
            await expect(
                page
                    .locator("header")
                    .locator("nav")
                    .getByText(i18nFix.t("Service:menu.service"), { exact: true })
            ).toBeVisible();
        });
    });
