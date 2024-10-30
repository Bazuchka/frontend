import { expect } from "@playwright/test";
import { autocompleteSelect, checkAutocompleteIsInvalid } from "./common/autocompleteSelect";
import { FieldItemType, populateForm } from "./common/form";
import { hasHeaderAndBreadcrumbsStep } from "./common/headerCheck";
import {
    CLIENT_GOOD,
    CLIENT_GOOD_TYPE,
    CLIENT_TEST_NAME,
    GOOD_PACKAGE,
    GOOD_TYPE,
    GOOD_VARIANT,
} from "./const";
import { testI18n } from "./fixtures/i18n.fixture";
import { ISharedData } from "./root.spec";

export const clientGoods = (sharedData: ISharedData) =>
    testI18n("Client Goods", async ({ page, i18nFix }) => {
        await testI18n.step("load scene", async () => {
            await page.getByText(i18nFix.t("Shared:Reference.dictionary")).click();
            await page.getByText(i18nFix.t("ClientGood:menu.all")).click();
            await expect(page.getByTestId("progress")).toHaveCount(0);
        });

        hasHeaderAndBreadcrumbsStep(["Shared:Reference.dictionary", "ClientGood:menu.all"], {
            page,
            i18nFix,
        });

        await testI18n.step("has table with client gooods", async () => {
            await expect(page.locator("table")).toBeVisible();
            await expect(
                page
                    .getByTestId("table-footer")
                    .getByRole("button", { name: i18nFix.t("Action:open") })
            ).toBeDisabled();
            await expect(
                page
                    .getByTestId("table-footer")
                    .getByRole("button", { name: i18nFix.t("Action:create") })
            ).toBeEnabled();
            await expect(
                page
                    .getByTestId("table-footer")
                    .getByRole("button", { name: i18nFix.t("Action:upload") })
            ).toBeEnabled();
        });

        await testI18n.step("create dialog - check required fields", async () => {
            await page
                .getByTestId("table-footer")
                .getByRole("button", { name: i18nFix.t("Action:create") })
                .click();
            await expect(page.getByRole("dialog")).toBeVisible();
            await page
                .getByRole("button", {
                    name: i18nFix.t("Action:continue"),
                })
                .click();

            await checkAutocompleteIsInvalid(page, "clientGood-client");
            await checkAutocompleteIsInvalid(page, "clientGood-goodType");
            await checkAutocompleteIsInvalid(page, "clientGood-clientGoodType");
            await page
                .getByRole("button", {
                    name: i18nFix.t("Action:cancel"),
                })
                .click();
        });

        await testI18n.step("create dialog - cancel button", async () => {
            await page
                .getByTestId("table-footer")
                .getByRole("button", { name: i18nFix.t("Action:create") })
                .click();

            await page
                .getByRole("button", {
                    name: i18nFix.t("Action:cancel"),
                })
                .click();
            await expect(page.getByRole("dialog")).not.toBeVisible();
        });

        await testI18n.step("is able to create client good", async () => {
            await page
                .getByTestId("table-footer")
                .getByRole("button", { name: i18nFix.t("Action:create") })
                .click();

            await expect(page.getByRole("dialog")).toBeVisible();

            await autocompleteSelect(page, {
                autocompleteId: "clientGood-client",
                text: CLIENT_TEST_NAME,
            });

            await autocompleteSelect(page, {
                autocompleteId: "clientGood-goodType",
                text: GOOD_TYPE,
            });

            await autocompleteSelect(page, {
                autocompleteId: "clientGood-clientGoodType",
                text: CLIENT_GOOD_TYPE.code,
            });

            await page
                .getByRole("button", {
                    name: i18nFix.t("Action:continue"),
                })
                .click();

            await expect(
                page.locator("h2").getByText(i18nFix.t("Shared:menu.new.masculine"))
            ).toBeVisible();

            await expect(
                page.getByTestId(`tab-header:${i18nFix.t("Shared:commonInfo")}`)
            ).toBeVisible();

            await expect(
                page.getByTestId("form-footer").getByTestId(`button:${i18nFix.t("Action:save")}`)
            ).toBeDisabled();
            await expect(
                page.getByTestId("form-footer").getByTestId(`button:${i18nFix.t("Action:edit")}`)
            ).toBeDisabled();

            await populateForm(page, [
                // add tempRegime
                {
                    name: "item",
                    type: FieldItemType.INPUT,
                    value: CLIENT_GOOD.item,
                },
                {
                    name: "gtin",
                    type: FieldItemType.INPUT,
                    value: CLIENT_GOOD.gtin,
                },
                {
                    name: "code",
                    type: FieldItemType.INPUT,
                    value: CLIENT_GOOD.code,
                },
                {
                    name: "name",
                    type: FieldItemType.INPUT,
                    value: CLIENT_GOOD.name,
                },
                {
                    name: "price",
                    type: FieldItemType.INPUT_NUMBER,
                    value: "100",
                },
                {
                    name: "shelfLife",
                    type: FieldItemType.INPUT_NUMBER,
                    value: "1",
                },
                {
                    name: "unitOfMeasure",
                    type: FieldItemType.AUTOCOMPLETE,
                    value: "м",
                },
                {
                    name: "batchAccountingType",
                    type: FieldItemType.SELECT,
                    value: i18nFix.t("BatchAccounting:types.EXPIRATION_DATE"),
                },
                {
                    name: "serialAccountingType",
                    type: FieldItemType.SELECT,
                    value: i18nFix.t("SerialAccounting:types.REQUEST"),
                },
                {
                    name: "dangerClass",
                    type: FieldItemType.AUTOCOMPLETE,
                    value: CLIENT_GOOD.dangerClass,
                },
                {
                    name: "active",
                    type: FieldItemType.CHECKBOX,
                    value: true,
                },
                {
                    name: "description",
                    type: FieldItemType.INPUT,
                    value: CLIENT_GOOD.description,
                },
                {
                    name: "code",
                    type: FieldItemType.INPUT,
                    value: CLIENT_GOOD.code,
                },
            ]);

            await expect(
                page.getByTestId("form-footer").getByTestId(`button:${i18nFix.t("Action:save")}`)
            ).toBeEnabled();
            await expect(
                page.getByTestId("form-footer").getByTestId(`button:${i18nFix.t("Action:edit")}`)
            ).toBeDisabled();
            await page
                .getByTestId("form-footer")
                .getByTestId(`button:${i18nFix.t("Action:save")}`)
                .click();

            await expect(page.getByTestId("alert").last()).not.toHaveClass(/MuiAlert-colorError/);
            await expect(
                page.getByTestId("form-footer").getByTestId(`button:${i18nFix.t("Action:edit")}`)
            ).toBeEnabled();

            console.log(sharedData); // add new clientgood it into shared state
        });

        await testI18n.step("is able to see Packages table", async () => {
            page.getByTestId(`tab-header:${i18nFix.t("ClientGood:tabs.goodPackages")}`).click();
            await expect(page.locator("table")).toBeVisible();

            await expect(
                page
                    .getByTestId("table-footer")
                    .getByRole("button", { name: i18nFix.t("Action:create") })
            ).toBeEnabled();

            await page
                .getByTestId("table-footer")
                .getByRole("button", { name: i18nFix.t("Action:create") })
                .click();

            await populateForm(page, [
                // add tempRegime
                {
                    name: "code",
                    type: FieldItemType.INPUT,
                    value: GOOD_PACKAGE.code,
                },
                {
                    name: "unitOfMeasure",
                    type: FieldItemType.AUTOCOMPLETE,
                    value: "м",
                },
                {
                    name: "processingType",
                    type: FieldItemType.SELECT,
                    value: i18nFix.t("ProcessingType:types.EACH"),
                },
                {
                    name: "conversionQty",
                    type: FieldItemType.INPUT_NUMBER,
                    value: "2",
                },
                {
                    name: "level",
                    type: FieldItemType.INPUT_NUMBER,
                    value: "1",
                },
                {
                    name: "length",
                    type: FieldItemType.INPUT_NUMBER,
                    value: "1",
                },
                {
                    name: "width",
                    type: FieldItemType.INPUT_NUMBER,
                    value: "1",
                },
                {
                    name: "height",
                    type: FieldItemType.INPUT_NUMBER,
                    value: "1",
                },
                {
                    name: "volume",
                    type: FieldItemType.INPUT_NUMBER,
                    value: "1",
                },
                {
                    name: "weight",
                    type: FieldItemType.INPUT_NUMBER,
                    value: "1",
                },
                {
                    name: "tareWeight",
                    type: FieldItemType.INPUT_NUMBER,
                    value: "1",
                },
                {
                    name: "active",
                    type: FieldItemType.CHECKBOX,
                    value: true,
                },
            ]);

            await expect(
                page.getByTestId("table-footer").getByTestId(`button:${i18nFix.t("Action:save")}`)
            ).toBeEnabled();
            await expect(
                page.getByTestId("table-footer").getByTestId(`button:${i18nFix.t("Action:edit")}`)
            ).toBeDisabled();
            await page
                .getByTestId("table-footer")
                .getByTestId(`button:${i18nFix.t("Action:save")}`)
                .click();

            await expect(page.getByTestId("alert").last()).not.toHaveClass(/MuiAlert-colorError/);
            await page.waitForTimeout(1000);
        });

        await testI18n.step("is able to create Good variant", async () => {
            await page
                .getByTestId(`tab-header:${i18nFix.t("ClientGood:tabs.goodVariants")}`)
                .click();
            await expect(page.locator("table")).toBeVisible();

            await expect(
                page
                    .getByTestId("table-footer")
                    .getByRole("button", { name: i18nFix.t("Action:create") })
            ).toBeEnabled();

            await page
                .getByTestId("table-footer")
                .getByRole("button", { name: i18nFix.t("Action:create") })
                .click();

            await populateForm(page, [
                {
                    name: "item",
                    type: FieldItemType.INPUT,
                    value: GOOD_VARIANT.item,
                },
                {
                    name: "code",
                    type: FieldItemType.INPUT,
                    value: GOOD_VARIANT.code,
                },
            ]);

            await page
                .getByTestId("form-footer")
                .getByTestId(`button:${i18nFix.t("Action:save")}`)
                .click();

            await expect(page.getByTestId("alert").last()).not.toHaveClass(/MuiAlert-colorError/);
        });
    });
