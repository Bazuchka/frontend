import { t } from "i18next";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { FieldOptions } from "src/shared/hooks/useDrawerForm";
import { IGoodVariant } from "src/features/ClientGood/store/GoodVariantStore";

export const fieldsConfiguration = (
    defaultModel: IGoodVariant | null,
    fieldOptions?: FieldOptions
) =>
    [
        {
            fields: [
                {
                    label: t("GoodVariant:properties.client"),
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
                    isDisable: true,
                },
                {
                    label: t("GoodVariant:properties.good"),
                    type: FieldItemType.AUTOCOMPLETE,
                    value: fieldOptions?.clientGood?.value ?? defaultModel?.clientGood,
                    name: "clientGood",
                    required: true,
                    fullLine: true,
                    requestParams: {
                        type: DictionaryType.CLIENT_GOOD,
                        filter: {
                            active: true,
                        },
                    },
                    isDisable: true,
                },
                {
                    label: t("GoodVariant:properties.active"),
                    type: FieldItemType.CHECKBOX,
                    value: defaultModel?.active || true,
                    name: "active",
                    fullLine: true,
                },
            ],
            name: t("Shared:commonInfo"),
        },
        {
            fields: [
                {
                    label: t("GoodVariant:properties.item"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.item,
                    name: "item",
                    fullLine: true,
                    required: true,
                    translatePath: "IdentityDocument:types",
                },
                {
                    label: t("GoodVariant:properties.code"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.code,
                    name: "code",
                    required: true,
                    fullLine: true,
                },
            ],
            name: t("GoodVariant:form.characteristics"),
        },
    ] as FieldGroup[];
