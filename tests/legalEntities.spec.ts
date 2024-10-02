import { expect } from "@playwright/test";
import { hasHeaderAndBreadcrumbs } from "./common/headerCheck";
import { CLIENT_TEST_NAME, CONTRACT_TEST_NAME, LEGAL_ENTITY_TEST_NAME } from "./const";
import { testI18n } from "./fixtures/i18n.fixture";

testI18n.beforeEach(async ({ page, i18nFix }) => {
    await page.goto("/", {
        waitUntil: "networkidle",
    });

    await page.getByText(i18nFix.t("Shared:Reference.dictionary")).click();
    await page.getByText(i18nFix.t("LegalEntity:menu.all")).click();
    await expect(page.getByTestId("progress")).toHaveCount(0);
});

testI18n.describe("Legal Entities", () => {
    hasHeaderAndBreadcrumbs("LegalEntity:menu.all");

    testI18n("has table with a legal entity", async ({ page, i18nFix }) => {
        await expect(page.locator("table")).toContainText(LEGAL_ENTITY_TEST_NAME);
        await expect(
            page.getByTestId("table-footer").getByRole("button", { name: i18nFix.t("Action:open") })
        ).toBeDisabled();
    });

    testI18n("is able to open the legal entity", async ({ page, i18nFix }) => {
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

    testI18n("is able to see contracts table", async ({ page, i18nFix }) => {
        await page
            .locator("table")
            .getByText(LEGAL_ENTITY_TEST_NAME, { exact: true })
            .first()
            .click();
        await page
            .getByTestId("table-footer")
            .getByRole("button", { name: i18nFix.t("Action:open") })
            .click();
        await page.getByTestId(`tab-header:${i18nFix.t("LegalEntity:tabs.contracts")}`).click();
        await expect(
            page.locator("table").getByText(CONTRACT_TEST_NAME, { exact: true }).first()
        ).toBeVisible();
    });

    testI18n("global filter can be applied", async ({ page }) => {
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
