import { expect } from "@playwright/test";
import { hasHeaderAndBreadcrumbsStep } from "./common/headerCheck";
import { CLIENT_TEST_NAME, CONTRACT_TEST_NAME, LEGAL_ENTITY_TEST_NAME } from "./const";
import { testI18n } from "./fixtures/i18n.fixture";

export const legalEntities = () =>
    testI18n("Legal Entities", async ({ page, i18nFix }) => {
        await testI18n.step("load scene", async () => {
            await page.getByText(i18nFix.t("Shared:Reference.dictionary")).click();
            await page.getByText(i18nFix.t("LegalEntity:menu.all")).click();
            await expect(page.getByTestId("progress")).toHaveCount(0);
        });

        hasHeaderAndBreadcrumbsStep("LegalEntity:menu.all", { page, i18nFix });

        await testI18n.step("has table with a legal entity", async () => {
            await expect(page.locator("table")).toContainText(LEGAL_ENTITY_TEST_NAME);
            await expect(
                page
                    .getByTestId("table-footer")
                    .getByRole("button", { name: i18nFix.t("Action:open") })
            ).toBeDisabled();
        });

        await testI18n.step("is able to open the legal entity", async () => {
            await page
                .locator("table")
                .getByText(LEGAL_ENTITY_TEST_NAME, { exact: true })
                .first()
                .click();
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
                    .getByText(LEGAL_ENTITY_TEST_NAME)
            ).toBeVisible();
            await expect(
                page
                    .locator("header")
                    .locator("nav")
                    .getByText(i18nFix.t("LegalEntity:menu.legalEntity"), { exact: true })
            ).toBeVisible();
        });

        await testI18n.step("is able to see contracts table", async () => {
            await page.getByTestId(`tab-header:${i18nFix.t("LegalEntity:tabs.contracts")}`).click();
            await expect(
                page.locator("table").getByText(CONTRACT_TEST_NAME, { exact: true }).first()
            ).toBeVisible();
        });

        await testI18n.step("global filter can be applied", async () => {
            await page
                .locator("header")
                .locator("nav")
                .getByRole("link", { name: i18nFix.t("LegalEntity:menu.all") })
                .click();
            await page.getByTestId("autocomplete:global-filter-client").click();
            await page
                .getByTestId("autocomplete:global-filter-client")
                .getByRole("combobox")
                .fill(CLIENT_TEST_NAME);
            await page.waitForTimeout(500);
            await page.locator(".MuiAutocomplete-listbox").getByRole("option").first().click();
            await expect(page.getByTestId("progress")).toHaveCount(0);
            await expect(
                page.locator("table").getByText(LEGAL_ENTITY_TEST_NAME, { exact: true }).first()
            ).toBeVisible();
        });
    });
