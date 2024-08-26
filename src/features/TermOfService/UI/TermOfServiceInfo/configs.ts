import { t } from "i18next";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { IFullTermOfService } from "../../store/TermOfServiceStore/TermOfServiceStore";

export interface IFieldsConfigurationParams {
    validToIsEditable?: boolean;
    defaultModel: IFullTermOfService | null;
    filters: {
        client: { id: string; code: string } | null;
        legalEntity: { id: string; code: string } | null;
    };
}

export const fieldsConfiguration = ({
    filters,
    defaultModel,
    validToIsEditable,
}: IFieldsConfigurationParams) =>
    [
        {
            fields: [
                {
                    label: t("TermOfService:properties.code"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.code,
                    name: "code",
                    required: true,
                    fullLine: false,
                },
                {
                    label: t("TermOfService:properties.active"),
                    type: FieldItemType.CHECKBOX,
                    value: defaultModel?.active ?? true,
                    name: "active",
                    fullLine: false,
                    readOnly: true,
                },
                {
                    label: t("TermOfService:properties.client"),
                    type: FieldItemType.AUTOCOMPLETE,
                    value: defaultModel?.client,
                    name: "client",
                    required: true,
                    fullLine: false,
                    requestParams: {
                        type: DictionaryType.CLIENT,
                        filter: {
                            active: true,
                        },
                    },
                },
                {
                    label: t("TermOfService:properties.terminalArea"),
                    type: FieldItemType.ENUM_SELECT,
                    value: defaultModel?.terminalArea,
                    name: "terminalArea",
                    required: true,
                    fullLine: false,
                    dictionaryType: DictionaryType.TERMINAL_AREA,
                    translatePath: "TerminalArea:types",
                },
                {
                    label: t("TermOfService:properties.legalEntity"),
                    type: FieldItemType.AUTOCOMPLETE,
                    value: defaultModel?.legalEntity,
                    name: "legalEntity",
                    required: true,
                    fullLine: false,
                    isDisable: !filters.client,
                    requestParams: {
                        type: DictionaryType.LEGAL_ENTITY,
                        filter: {
                            active: true,
                            client: {
                                id: filters.client?.id,
                            },
                        },
                    },
                },
                {
                    label: t("TermOfService:properties.currency"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.currency?.code,
                    name: "code",
                    readOnly: true,
                    fullLine: false,
                },
                {
                    label: t("TermOfService:properties.contract"),
                    type: FieldItemType.AUTOCOMPLETE,
                    value: defaultModel?.contract,
                    name: "contract",
                    required: true,
                    fullLine: false,
                    isDisable: !filters.legalEntity,
                    requestParams: {
                        type: DictionaryType.CONTRACT,
                        filter: {
                            active: true,
                            legalEntity: {
                                id: filters.legalEntity?.id,
                            },
                        },
                    },
                },
            ],
            name: t("Shared:commonInfo"),
        },
        {
            fields: [
                {
                    label: t("TermOfService:properties.validFrom"),
                    type: FieldItemType.DATE,
                    value: defaultModel?.validFrom,
                    name: "validFrom",
                    fullLine: false,
                    required: true,
                },
                {
                    label: t("TermOfService:properties.indefinitely"),
                    type: FieldItemType.CHECKBOX,
                    value: defaultModel?.indefinitely ?? false,
                    name: "indefinitely",
                    fullLine: false,
                },
                {
                    label: t("TermOfService:properties.validTo"),
                    type: FieldItemType.DATE,
                    value: defaultModel?.validTo,
                    name: "validTo",
                    fullLine: false,
                    isDisable: !validToIsEditable,
                },
            ],
            name: t("TermOfService:properties.termPeriod"),
        },
    ] as FieldGroup[];
