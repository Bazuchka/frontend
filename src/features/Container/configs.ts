import { t } from "i18next";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { FieldOptions } from "src/shared/hooks/useDrawerForm";
import { request } from "src/shared/request";
import { IContainer } from "./store";

export const fieldsConfiguration = (defaultModel: IContainer | null, fieldOptions?: FieldOptions) =>
    [
        {
            fields: [
                {
                    label: t("Container:properties.client"),
                    type: FieldItemType.AUTOCOMPLETE,
                    value: fieldOptions?.client?.value ?? defaultModel?.client,
                    name: "client",
                    required: true,
                    fullLine: true,
                    requestParams: {
                        type: DictionaryType.CLIENT,
                        filter: {
                            active: true,
                        },
                    },
                    isDisable: !!fieldOptions?.client?.value,
                },
                {
                    label: t("Container:properties.code"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.code,
                    name: "code",
                    required: true,
                    fullLine: true,

                    validate: async (value) => {
                        const { data } = (await request({
                            method: "POST",
                            data: { code: value },
                            url: `/container/validate`,
                        })) as { data: { valid: boolean } };

                        return data.valid;
                    },
                    isDisable: defaultModel && fieldOptions?.code?.isUpdateDisabled,
                },
                {
                    label: t("Container:properties.containerType"),
                    type: FieldItemType.ENUM_SELECT,
                    value: defaultModel?.containerType,
                    name: "containerType",
                    required: true,
                    fullLine: false,
                    dictionaryType: DictionaryType.CONTAINER_TYPE,
                    translatePath: "ContainerType:types",
                },
                {
                    label: t("Container:properties.weight"),
                    type: FieldItemType.INPUT_NUMBER,
                    value: defaultModel?.weight,
                    name: "weight",
                    min: 0,
                    fullLine: true,
                    required: true,
                },
                {
                    label: t("Container:properties.refrigirator"),
                    type: FieldItemType.CHECKBOX,
                    value: defaultModel?.refrigerator || false,
                    name: "refrigerator",
                    fullLine: true,
                },
                {
                    label: t("Container:properties.active"),
                    type: FieldItemType.CHECKBOX,
                    value: defaultModel?.active ?? true,
                    name: "active",
                    fullLine: true,
                },
            ],
            name: t("Shared:commonInfo"),
        },
    ] as FieldGroup[];
