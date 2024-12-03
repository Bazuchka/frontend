import { t } from "i18next";
import batchStore from "src/features/Batch/store";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import { DictionaryType } from "src/shared/hooks/useDictionary";

export const fieldsConfiguration = (clientGoodProps?: {
    client?: { id: string };
    batchAccountingType?: string;
    clientGood?: { id: string };
    goodVariant?: { id: string };
}) =>
    [
        {
            name: t("Shared:commonInfo"),
            fields: [
                {
                    label: t("ReceivingOrderBatch:properties.client"),
                    name: "client",
                    type: FieldItemType.AUTOCOMPLETE,
                    value: clientGoodProps?.client,
                    required: true,
                    isDisable: true,
                    fullLine: true,
                    requestParams: {
                        type: DictionaryType.CLIENT,
                        filter: {
                            active: true,
                        },
                    },
                },
                {
                    label: t("ReceivingOrderBatch:properties.good"),
                    name: "clientGood",
                    type: FieldItemType.AUTOCOMPLETE,
                    value: clientGoodProps?.clientGood,
                    required: true,
                    isDisable: true,
                    fullLine: true,
                    requestParams: {
                        type: DictionaryType.CLIENT_GOOD,
                        filter: {
                            active: true,
                        },
                    },
                },
                {
                    label: t("ReceivingOrderBatch:properties.goodVariant"),
                    name: "goodVariant",
                    type: FieldItemType.AUTOCOMPLETE,
                    value: clientGoodProps?.goodVariant,
                    fullLine: true,
                    isDisable: true,
                    requestParams: {
                        type: DictionaryType.GOOD_VARIANT,
                        filter: {
                            active: true,
                            clientGood: clientGoodProps?.clientGood,
                        },
                    },
                },
                {
                    label: t("ReceivingOrderBatch:properties.batchAccountingType"),
                    name: "batchAccountingType",
                    type: FieldItemType.ENUM_SELECT,
                    value: clientGoodProps?.batchAccountingType,
                    required: true,
                    isDisable: true,
                    fullLine: true,
                    dictionaryType: DictionaryType.BATCH_ACCOUNTING_TYPE,
                    translatePath: "BatchAccounting:types",
                },
                {
                    label: t("ReceivingOrderBatch:properties.active"),
                    name: "active",
                    type: FieldItemType.CHECKBOX,
                    value: true,
                    fullLine: true,
                    isDisable: true,
                },
            ],
        },
        {
            name: t("ReceivingOrderBatch:groups.batchSettings"),
            fields: [
                {
                    label: t("ReceivingOrderBatch:properties.name"),
                    name: "name",
                    type: FieldItemType.INPUT,
                    value: batchStore.current?.name,
                    required: true,
                    isDisable: false,
                    fullLine: true,
                },
                {
                    label: t("ReceivingOrderBatch:properties.manufactureDate"),
                    name: "manufactureDate",
                    type: FieldItemType.DATE,
                    value: batchStore.current?.manufactureDate,
                    required: true,
                    isDisable: false,
                    fullLine: true,
                },
                {
                    label: t("ReceivingOrderBatch:properties.batchBarcode"),
                    name: "batchBarcode",
                    type: FieldItemType.INPUT,
                    value: batchStore.current?.batchBarcode,
                    required: false,
                    isDisable: false,
                    fullLine: true,
                },
            ],
        },
    ] as FieldGroup[];
