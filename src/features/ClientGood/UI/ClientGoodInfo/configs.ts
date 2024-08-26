import { t } from "i18next";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import clientGoodStore from "../../store/ClientGoodStore";

export const fieldsConfiguration = (isEditFormMode?: boolean, isVariable?: boolean) =>
    [
        {
            fields: [
                {
                    label: t("ClientGood:properties.client"),
                    type: FieldItemType.AUTOCOMPLETE,
                    value: clientGoodStore.current?.client,
                    name: "client",
                    required: true,
                    fullLine: false,
                    isDisable: isEditFormMode,
                    requestParams: {
                        type: DictionaryType.CLIENT,
                        filter: {
                            active: true,
                        },
                    },
                },
                {
                    label: t("ClientGood:properties.active"),
                    type: FieldItemType.CHECKBOX,
                    value: clientGoodStore.current?.active,
                    name: "active",
                    fullLine: false,
                },
                {
                    label: t("ClientGood:properties.item"),
                    type: FieldItemType.INPUT,
                    value: clientGoodStore.current?.item,
                    name: "item",
                    required: !isVariable,
                    fullLine: false,
                },
                {
                    label: t("ClientGood:properties.gtin"),
                    type: FieldItemType.INPUT,
                    value: clientGoodStore.current?.gtin,
                    name: "gtin",
                    fullLine: false,
                },
                {
                    label: t("ClientGood:properties.code"),
                    type: FieldItemType.INPUT,
                    value: clientGoodStore.current?.code,
                    name: "code",
                    required: true,
                    fullLine: false,
                },
                {
                    label: t("ClientGood:properties.unitOfMeasure"),
                    type: FieldItemType.AUTOCOMPLETE,
                    value: clientGoodStore.current?.unitOfMeasure,
                    name: "unitOfMeasure",
                    required: true,
                    fullLine: false,
                    requestParams: {
                        type: DictionaryType.UNIT_OF_MEASURE,
                        filter: {
                            active: true,
                        },
                    },
                },
                {
                    label: t("ClientGood:properties.name"),
                    type: FieldItemType.INPUT,
                    value: clientGoodStore.current?.name,
                    name: "name",
                    fullLine: false,
                },
                {
                    label: t("ClientGood:properties.price"),
                    type: FieldItemType.INPUT_NUMBER,
                    value: clientGoodStore.current?.price,
                    name: "price",
                    fullLine: false,
                },
            ],
            name: t("Shared:commonInfo"),
        },
        {
            fields: [
                {
                    label: t("ClientGood:properties.goodType"),
                    type: FieldItemType.AUTOCOMPLETE,
                    value: clientGoodStore.current?.goodType,
                    name: "goodType",
                    required: true,
                    fullLine: false,
                    isDisable: isEditFormMode,
                    requestParams: {
                        type: DictionaryType.GOOD_TYPE,
                        filter: {
                            active: true,
                        },
                    },
                },
                {
                    label: t("ClientGood:properties.batchAccountingType"),
                    type: FieldItemType.ENUM_SELECT,
                    value: clientGoodStore.current?.batchAccountingType,
                    name: "batchAccountingType",
                    required: true,
                    fullLine: false,
                    dictionaryType: DictionaryType.BATCH_ACCOUNTING_TYPE,
                    translatePath: "BatchAccounting:types",
                },
                {
                    label: t("ClientGood:properties.clientGoodType"),
                    type: FieldItemType.AUTOCOMPLETE,
                    value: clientGoodStore.current?.clientGoodType,
                    name: "clientGoodType",
                    required: true,
                    fullLine: false,
                    isDisable: isEditFormMode,
                    requestParams: {
                        type: DictionaryType.CLIENT_GOOD_TYPE,
                        filter: {
                            active: true,
                        },
                    },
                },
                {
                    label: t("ClientGood:properties.serialAccountingType"),
                    type: FieldItemType.ENUM_SELECT,
                    value: clientGoodStore.current?.serialAccountingType,
                    name: "serialAccountingType",
                    fullLine: false,
                    required: true,
                    dictionaryType: DictionaryType.SERIAL_ACCOUNTING_TYPE,
                    translatePath: "SerialAccounting:types",
                },
                {
                    label: t("ClientGood:properties.dangerClass"),
                    type: FieldItemType.AUTOCOMPLETE,
                    value: clientGoodStore.current?.dangerClass,
                    name: "dangerClass",
                    required: true,
                    fullLine: false,
                    requestParams: {
                        type: DictionaryType.DANGER_CLASS,
                        filter: {
                            active: true,
                        },
                    },
                },
                {
                    label: t("ClientGood:properties.tempRegime"),
                    type: FieldItemType.AUTOCOMPLETE,
                    value: clientGoodStore.current?.tempRegime,
                    name: "tempRegime",
                    fullLine: false,
                    dictionaryType: DictionaryType.TEMP_REGIME,
                    requestParams: {
                        type: DictionaryType.TEMP_REGIME,
                        filter: {
                            active: true,
                        },
                    },
                },
                {
                    label: t("ClientGood:properties.shelfLife"),
                    type: FieldItemType.INPUT_NUMBER,
                    value: clientGoodStore.current?.shelfLife,
                    name: "shelfLife",
                    fullLine: false,
                },
            ],
            name: t("ClientGood:properties.classification"),
        },
        {
            fields: [
                {
                    label: t("ClientGood:properties.description"),
                    type: FieldItemType.INPUT,
                    value: clientGoodStore.current?.description,
                    name: "description",
                    fullLine: true,
                },
            ],
            name: t("ClientGood:properties.additionalInfo"),
        },
    ] as FieldGroup[];
