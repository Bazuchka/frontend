import { expect } from "@playwright/test";
import { FieldItemType, populateForm } from "./common/form";
import { hasHeaderAndBreadcrumbsStep } from "./common/headerCheck";
import { loadScene } from "./common/scene";
import { CLIENT_DRIVER, CLIENT_TEST_NAME } from "./const";
import { testI18n } from "./fixtures/i18n.fixture";

const CREATE_FIELDS = [
    {
        name: "code",
        type: FieldItemType.INPUT,
        value: CLIENT_DRIVER.code,
    },
    {
        name: "client",
        type: FieldItemType.AUTOCOMPLETE,
        value: CLIENT_TEST_NAME,
    },
    {
        name: "phoneNumber",
        type: FieldItemType.INPUT,
        value: CLIENT_DRIVER.phoneNumber,
    },
    {
        name: "POANumber",
        type: FieldItemType.INPUT,
        value: CLIENT_DRIVER.POANumber,
    },
    {
        name: "POAValidTo",
        type: FieldItemType.DATE,
        value: CLIENT_DRIVER.POAValidTo,
    },
    {
        name: "active",
        type: FieldItemType.CHECKBOX,
        value: true,
    },
];

export const drivers = () =>
    testI18n("Drivers", async ({ page, i18nFix }) => {
        await loadScene({ page, i18nFix }, ["Shared:Reference.dictionary", "ClientDriver:menu"]);

        await hasHeaderAndBreadcrumbsStep(["Shared:Reference.dictionary", "ClientDriver:menu"], {
            page,
            i18nFix,
        });

        await testI18n.step("has table with ability to create", async () => {
            await expect(page.locator("table")).toBeVisible();
            await expect(
                page
                    .getByTestId("table-footer")
                    .getByRole("button", { name: i18nFix.t("Action:create") })
            ).toBeEnabled();
        });

        await testI18n.step("can create new driver", async () => {
            await page
                .getByTestId("table-footer")
                .getByRole("button", { name: i18nFix.t("Action:create") })
                .click();

            await populateForm(page, CREATE_FIELDS);

            await expect(
                page
                    .getByTestId("form-footer")
                    .getByRole("button", { name: i18nFix.t("Action:save") })
            ).toBeEnabled();

            await page
                .getByTestId("form-footer")
                .getByRole("button", { name: i18nFix.t("Action:save") })
                .click();

            await expect(page.getByTestId("alert")).toHaveClass(/MuiAlert-colorSuccess/);
            await expect(page.locator("table")).toBeVisible();
        });
    });
