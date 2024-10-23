import { expect } from "@playwright/test";
import { FieldItemType, populateForm } from "./common/form";
import { hasHeaderAndBreadcrumbsStep } from "./common/headerCheck";
import { loadScene } from "./common/scene";
import { CLIENT_TEST_NAME, CLIENT_VEHICLE } from "./const";
import { testI18n } from "./fixtures/i18n.fixture";

const CREATE_FIELDS = [
    {
        name: "code",
        type: FieldItemType.INPUT,
        value: CLIENT_VEHICLE.code,
    },
    {
        name: "client",
        type: FieldItemType.AUTOCOMPLETE,
        value: CLIENT_TEST_NAME,
    },
    {
        name: "vehicleBrand",
        type: FieldItemType.AUTOCOMPLETE,
    },
    {
        name: "vehicleType",
        type: FieldItemType.AUTOCOMPLETE,
    },
    {
        name: "loadingType",
        type: FieldItemType.AUTOCOMPLETE,
    },
    {
        name: "active",
        type: FieldItemType.CHECKBOX,
        value: true,
    },
];

export const vehicles = () =>
    testI18n("Vehicle", async ({ page, i18nFix }) => {
        await loadScene({ page, i18nFix }, ["Shared:Reference.dictionary", "ClientVehicle:menu"]);

        await hasHeaderAndBreadcrumbsStep(["Shared:Reference.dictionary", "ClientVehicle:menu"], {
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
