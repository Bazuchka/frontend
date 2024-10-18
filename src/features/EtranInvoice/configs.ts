import { t } from "i18next";
import { FieldValues } from "react-hook-form";
import etranInvoiceStore from "src/features/EtranInvoice/store";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import { SEARCH_TYPE } from "src/shared/enums";
import { DictionaryType } from "src/shared/hooks/useDictionary";

export const fieldsConfiguration = (
    etranInvoiceProps?: { client?: { id: string } },
    isEtranCreated?: boolean
) =>
    [
        {
            name: t("Shared:commonInfo"),
            fields: [
                {
                    label: t("EtranInvoice:properties.client"),
                    name: "client",
                    type: FieldItemType.AUTOCOMPLETE,
                    value: etranInvoiceProps?.client,
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
                    label: t("EtranInvoice:properties.isEtranCreated"),
                    name: "isEtranCreated",
                    type: FieldItemType.CHECKBOX,
                    value: isEtranCreated || etranInvoiceStore.current?.isEtranCreated,
                    fullLine: true,
                    isDisable: false,
                },
                {
                    label: t("EtranInvoice:properties.code"),
                    name: "code",
                    type: FieldItemType.INPUT,
                    value:
                        etranInvoiceStore.current?.id && !etranInvoiceStore.current?.code
                            ? t("EtranInvoice:default.code")
                            : etranInvoiceStore.current?.code,
                    required: true,
                    isDisable: !isEtranCreated,
                    fullLine: true,
                },
                {
                    label: t("EtranInvoice:properties.shipper"),
                    name: "shipper",
                    type: FieldItemType.AUTOCOMPLETE,
                    value: etranInvoiceStore.current?.shipper,
                    required: true,
                    isDisable: false,
                    fullLine: true,
                    requestParams: {
                        type: DictionaryType.CLIENT_RELATED_ENTITY,
                        filter: (value: string) => ({
                            active: true,
                            isShipper: true,
                            client: {
                                id: etranInvoiceProps?.client?.id,
                            },
                            inn: {
                                type: SEARCH_TYPE.CONTAINS,
                                content: value,
                                byOr: true,
                            },
                            kpp: {
                                type: SEARCH_TYPE.CONTAINS,
                                content: value,
                                byOr: true,
                            },
                        }),
                    },
                },
                {
                    label: t("EtranInvoice:properties.departureStation"),
                    name: "departureStation",
                    type: FieldItemType.AUTOCOMPLETE,
                    value: etranInvoiceStore.current?.departureStation,
                    required: true,
                    isDisable: false,
                    fullLine: true,
                    requestParams: {
                        type: DictionaryType.RAILWAY_STATION,
                        filter: (value) => ({
                            active: true,
                            code: {
                                type: SEARCH_TYPE.CONTAINS,
                                content: value,
                                byOr: true,
                            },
                            esrCode: {
                                type: SEARCH_TYPE.CONTAINS,
                                content: value,
                                byOr: true,
                            },
                            name: {
                                type: SEARCH_TYPE.CONTAINS,
                                content: value,
                                byOr: true,
                            },
                        }),
                    },
                    events: {
                        mapDataCallback: (dataList: FieldValues[]) => {
                            return dataList.map((item) => ({
                                ...item,
                                customCode: item.esrCode || item.code,
                            }));
                        },
                    },
                },
                {
                    label: t("EtranInvoice:properties.destinationStation"),
                    name: "destinationStation",
                    type: FieldItemType.AUTOCOMPLETE,
                    value: etranInvoiceStore.current?.destinationStation,
                    required: true,
                    isDisable: false,
                    fullLine: true,
                    requestParams: {
                        type: DictionaryType.RAILWAY_STATION,
                        filter: (value) => ({
                            active: true,
                            code: {
                                type: SEARCH_TYPE.CONTAINS,
                                content: value,
                                byOr: true,
                            },
                            esrCode: {
                                type: SEARCH_TYPE.CONTAINS,
                                content: value,
                                byOr: true,
                            },
                            name: {
                                type: SEARCH_TYPE.CONTAINS,
                                content: value,
                                byOr: true,
                            },
                        }),
                    },
                    events: {
                        mapDataCallback: (dataList: FieldValues[]) => {
                            return dataList.map((item) => ({
                                ...item,
                                customCode: item.esrCode || item.code,
                            }));
                        },
                    },
                },
            ],
        },
    ] as FieldGroup[];
