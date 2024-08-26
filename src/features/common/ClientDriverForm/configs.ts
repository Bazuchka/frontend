import { t } from "i18next";
import { IFullClientDriver } from "src/features/ClientDriverTable/store/ClientDriverStore";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { FieldOptions, isFieldDisabled } from "src/shared/hooks/useDrawerForm";

export const fieldsConfiguration = (
    defaultModel: IFullClientDriver | null,
    fieldOptions?: FieldOptions
) =>
    [
        {
            fields: [
                {
                    label: t("ClientDriver:properties.client"),
                    type: FieldItemType.AUTOCOMPLETE,
                    value: fieldOptions?.client.value ?? defaultModel?.client,
                    name: "client",
                    required: true,
                    fullLine: true,
                    requestParams: {
                        type: DictionaryType.CLIENT,
                        filter: {
                            active: true,
                        },
                    },
                    isDisable: isFieldDisabled(!defaultModel, fieldOptions?.client),
                },
                {
                    label: t("ClientDriver:properties.code"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.code,
                    name: "code",
                    required: true,
                    fullLine: true,
                    isDisable: isFieldDisabled(!defaultModel, fieldOptions?.code),
                },
                {
                    label: t("ClientDriver:properties.active"),
                    type: FieldItemType.CHECKBOX,
                    value: fieldOptions?.active.value ?? (defaultModel?.active || false),
                    name: "active",
                    fullLine: true,
                    isDisable: isFieldDisabled(!defaultModel, fieldOptions?.active),
                },
            ],
            name: t("Shared:commonInfo"),
        },
        {
            fields: [
                {
                    label: t("ClientDriver:properties.identityDocumentType"),
                    type: FieldItemType.ENUM_SELECT,
                    value: defaultModel?.identityDocumentType,
                    name: "identityDocumentType",
                    fullLine: true,
                    dictionaryType: DictionaryType.IDENTITY_DOCUMENT_TYPE,
                    translatePath: "IdentityDocument:types",
                },
                {
                    label: t("ClientDriver:properties.identityDocumentNumber"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.identityDocumentNumber,
                    name: "identityDocumentNumber",
                    fullLine: true,
                },
                {
                    label: t("ClientDriver:properties.identityDocumentIssuedBy"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.identityDocumentIssuedBy,
                    name: "identityDocumentIssuedBy",
                    fullLine: true,
                },
                {
                    label: t("ClientDriver:properties.identityDocumentIssueDate"),
                    type: FieldItemType.DATE,
                    value: defaultModel?.identityDocumentIssuedDate,
                    name: "identityDocumentIssuedDate",
                    fullLine: true,
                },
            ],
            name: t("ClientDriver:properties.identityDocument"),
        },
        {
            fields: [
                {
                    label: t("ClientDriver:properties.poaNumber"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.POANumber,
                    name: "POANumber",
                    fullLine: true,
                },
                {
                    label: t("ClientDriver:properties.poaValidTo"),
                    type: FieldItemType.DATE,
                    value: defaultModel?.POAValidTo,
                    name: "POAValidTo",
                    fullLine: true,
                },
            ],
            name: t("ClientDriver:properties.poa"),
        },
        {
            fields: [
                {
                    label: t("ClientDriver:properties.phoneNumber"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.phoneNumber,
                    name: "phoneNumber",
                    fullLine: true,
                },
            ],
            name: t("Shared:contactInfo"),
        },
    ] as FieldGroup[];
