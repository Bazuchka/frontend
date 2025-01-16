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
                    type: FieldItemType.INPUT,
                    value: t("IdentityDocument:types.RF_PASSPORT"),
                    name: "PassportDocumentType",
                    fullLine: true,
                    readOnly: true,
                },
                {
                    label: t("ClientDriver:properties.identityDocumentNumber"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.passportNumber,
                    name: "passportNumber",
                    fullLine: true,
                    required: true,
                },
                {
                    label: t("ClientDriver:properties.identityDocumentIssuedBy"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.passportIssuedBy,
                    name: "passportIssuedBy",
                    fullLine: true,
                    required: true,
                },
                {
                    label: t("ClientDriver:properties.identityDocumentIssueDate"),
                    type: FieldItemType.DATE,
                    value: defaultModel?.passportIssuedDate,
                    name: "passportIssuedDate",
                    fullLine: true,
                    required: true,
                },
                {
                    label: t("ClientDriver:properties.identityDocumentType"),
                    type: FieldItemType.INPUT,
                    value: t("IdentityDocument:types.DRIVING_LICENSE"),
                    name: "driverLicenseDocumentType",
                    fullLine: true,
                    readOnly: true,
                },
                {
                    label: t("ClientDriver:properties.identityDocumentNumber"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.drivingLicenseNumber,
                    name: "drivingLicenseNumber",
                    fullLine: true,
                },
                {
                    label: t("ClientDriver:properties.identityDocumentIssueDate"),
                    type: FieldItemType.DATE,
                    value: defaultModel?.drivingLicenseIssuedDate,
                    name: "drivingLicenseIssuedDate",
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
                    required: true,
                },
            ],
            name: t("Shared:contactInfo"),
        },
    ] as FieldGroup[];
