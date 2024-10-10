import { expect } from "@playwright/test";
import { FieldItemType, populateForm, promptVisibleWhenFieldIsDirtyOnCancel } from "./common/form";
import { hasHeaderAndBreadcrumbsStep } from "./common/headerCheck";
import {
    editableTableDirtyFieldStateCheck,
    editableTableInitialStateCheck,
    loadScene,
} from "./common/scene";
import { CLIENT_GOOD_TYPE, CLIENT_TEST_NAME } from "./const";
import { testI18n } from "./fixtures/i18n.fixture";

const TABLE_CREATE_FIELDS = [
    {
        name: "clientSyncId",
        type: FieldItemType.INPUT,
        value: CLIENT_GOOD_TYPE.clientSyncId,
    },
    {
        name: "client",
        type: FieldItemType.AUTOCOMPLETE,
        value: CLIENT_TEST_NAME,
    },
    {
        name: "code",
        type: FieldItemType.INPUT,
        value: CLIENT_GOOD_TYPE.code,
    },
    {
        name: "isVariable",
        type: FieldItemType.CHECKBOX,
        value: true,
    },
    {
        name: "active",
        type: FieldItemType.CHECKBOX,
        value: true,
    },
];

const TABLE_UPDATE_FIELDS = [
    {
        name: "code",
        type: FieldItemType.INPUT,
        value: CLIENT_GOOD_TYPE.code + "_UPDATED",
    },
];

export const clientGoodTypes = () =>
    testI18n("Client Good Types", async ({ page, i18nFix }) => {
        await loadScene({ page, i18nFix }, [
            "Shared:Reference.dictionary",
            "ClientGoodType:menu.all",
        ]);

        await hasHeaderAndBreadcrumbsStep(
            ["Shared:Reference.dictionary", "ClientGoodType:menu.all"],
            { page, i18nFix }
        );

        await editableTableInitialStateCheck({ page, i18nFix });

        await promptVisibleWhenFieldIsDirtyOnCancel({ page, i18nFix }, TABLE_CREATE_FIELDS);

        await testI18n.step("is able to create client good type", async () => {
            await page
                .getByTestId("table-footer")
                .getByRole("button", { name: i18nFix.t("Action:create") })
                .click();

            await populateForm(page, TABLE_CREATE_FIELDS);
            await editableTableDirtyFieldStateCheck({ page, i18nFix });
            await page
                .getByTestId("table-footer")
                .getByRole("button", { name: i18nFix.t("Action:save") })
                .click();
            await expect(page.getByTestId("alert")).toHaveClass(/MuiAlert-colorSuccess/);
            await editableTableInitialStateCheck({ page, i18nFix });
        });

        // WORKS ONLY WHEN ONE RECORD WITH TEST NAME IN DB
        await testI18n.step("is able to edit client good type", async () => {
            await page.locator("table").getByText(CLIENT_GOOD_TYPE.clientSyncId).first().click();
            await page
                .getByTestId("table-footer")
                .getByRole("button", { name: i18nFix.t("Action:edit") })
                .click();

            await populateForm(page, TABLE_UPDATE_FIELDS);
            await editableTableDirtyFieldStateCheck({ page, i18nFix });
            await page
                .getByTestId("table-footer")
                .getByRole("button", { name: i18nFix.t("Action:save") })
                .click();
            await expect(page.getByTestId("alert")).toHaveClass(/MuiAlert-colorSuccess/);
            await page.locator("table").getByText(CLIENT_GOOD_TYPE.clientSyncId).first().click(); // deselect
            await editableTableInitialStateCheck({ page, i18nFix });
        });
    });
