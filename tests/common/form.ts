import { Page } from "@playwright/test";
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
