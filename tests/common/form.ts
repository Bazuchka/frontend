/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, Page } from "@playwright/test";
import { testI18n } from "../fixtures/i18n.fixture";
import { autocompleteSelect } from "./autocompleteSelect";

export enum FieldItemType {
    CHECKBOX,
    INPUT,
    SELECT,
    ENUM_SELECT,
    DATE,
    TIME,
    AUTOCOMPLETE,
    AUTOCOMPLETE_WITH_MASK,
    AUTOCOMPLETE_MULTISELECT,
    RATING,
    STATIC,
    VALIDATE_INPUT,
    LINK,
    INPUT_NUMBER,
    BUTTON,
    PASSWORD,
}

interface IFormItem {
    name: string;
    type: FieldItemType;
    value: string | boolean;
}

export const populateForm = async (page: Page, formItems: IFormItem[]) => {
    for (let i = 0; i < formItems.length; i++) {
        const formItem = formItems[i];
        switch (formItem.type) {
            case FieldItemType.AUTOCOMPLETE: {
                await autocompleteSelect(page, {
                    autocompleteId: formItem.name,
                    text: formItem.value as string,
                });
                break;
            }
            case FieldItemType.SELECT: {
                await autocompleteSelect(page, {
                    autocompleteId: formItem.name,
                    text: formItem.value as string,
                    isSelect: true,
                });
                break;
            }
            case FieldItemType.CHECKBOX: {
                const checkbox = await page
                    .getByTestId(`value:${formItem.name}`)
                    .getByRole("checkbox");
                if (formItem.value) {
                    await checkbox.check();
                } else {
                    await checkbox.uncheck();
                }
                break;
            }

            case FieldItemType.INPUT: {
                await page
                    .getByTestId(`value:${formItem.name}`)
                    .getByRole("textbox")
                    .fill(formItem.value as string);
                break;
            }
            case FieldItemType.INPUT_NUMBER: {
                await page
                    .getByTestId(`value:${formItem.name}`)
                    .getByRole("spinbutton")
                    .fill(formItem.value as string);
                break;
            }
        }
    }
};

export const promptVisibleWhenFieldIsDirtyOnCancel = async (
    { page, i18nFix }: { page: Page; i18nFix: any },
    fields: IFormItem[],
    isEdit?: boolean
) => {
    await testI18n.step("all dirty fields lead to ensure prompt on cancel", async () => {
        for (let index = 0; index < fields.length; index++) {
            if (isEdit) {
                await page
                    .getByTestId("table-footer")
                    .getByRole("button", { name: i18nFix.t("Action:edit") })
                    .click();
            } else {
                await page
                    .getByTestId("table-footer")
                    .getByRole("button", { name: i18nFix.t("Action:create") })
                    .click();
            }

            const field = fields[index];
            await populateForm(page, [field]);
            await page
                .getByRole("button", {
                    name: i18nFix.t("Action:cancel"),
                })
                .click();

            const dialog = await page.getByRole("dialog");
            await expect(dialog).toBeVisible();
            await expect(dialog.getByText(i18nFix.t("Dialog:cancelAction"))).toBeVisible();

            await dialog
                .getByRole("button", {
                    name: i18nFix.t("Action:yes"),
                })
                .click();

            await expect(dialog).not.toBeVisible();
        }
    });
};
