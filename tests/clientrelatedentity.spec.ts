import { expect } from "@playwright/test";
import { FieldItemType, populateForm, promptVisibleWhenFieldIsDirtyOnCancel } from "./common/form";
import { hasHeaderAndBreadcrumbsStep } from "./common/headerCheck";
import {
    editableTableDirtyFieldStateCheck,
    editableTableInitialStateCheck,
    loadScene,
} from "./common/scene";
import { CLIENT_RELATED_ENTITY, CLIENT_TEST_NAME, LEGAL_ENTITY_TEST_NAME } from "./const";
import { testI18n } from "./fixtures/i18n.fixture";

const TABLE_CREATE_FIELDS = [
    {
        name: "code",
        type: FieldItemType.INPUT,
        value: CLIENT_RELATED_ENTITY.code,
    },
    {
        name: "client",
        type: FieldItemType.AUTOCOMPLETE,
        value: CLIENT_TEST_NAME,
    },
    {
        name: "inn",
        type: FieldItemType.INPUT,
        value: CLIENT_RELATED_ENTITY.inn,
    },
    {
        name: "kpp",
        type: FieldItemType.INPUT,
        value: CLIENT_RELATED_ENTITY.kpp,
    },
    {
        name: "isShipper",
        type: FieldItemType.CHECKBOX,
        value: true,
    },
    {
        name: "isConsignee",
        type: FieldItemType.CHECKBOX,
        value: true,
    },
    {
        name: "isCarrier",
        type: FieldItemType.CHECKBOX,
        value: true,
    },
    {
        name: "legalEntity",
        type: FieldItemType.AUTOCOMPLETE,
        value: LEGAL_ENTITY_TEST_NAME,
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
        value: CLIENT_RELATED_ENTITY.code + "_UPDATED",
    },
];

export const clientRelatedEntity = () =>
    testI18n("Client Related Entities", async ({ page, i18nFix }) => {
        await loadScene({ page, i18nFix }, [
            "Shared:Reference.dictionary",
            "LegalEntity:menu.client",
        ]);

        await hasHeaderAndBreadcrumbsStep(
            ["Shared:Reference.dictionary", "LegalEntity:menu.client"],
            { page, i18nFix }
        );

        await editableTableInitialStateCheck({ page, i18nFix });

        await promptVisibleWhenFieldIsDirtyOnCancel({ page, i18nFix }, TABLE_CREATE_FIELDS);

        await testI18n.step("is able to create client realted entity", async () => {
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
        await testI18n.step("is able to edit client realted entity", async () => {
            await page.locator("table").getByText(CLIENT_RELATED_ENTITY.code).first().click();
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
            await page.locator("table").getByText(CLIENT_RELATED_ENTITY.code).first().click(); // deselect
            await editableTableInitialStateCheck({ page, i18nFix });
        });
    });
