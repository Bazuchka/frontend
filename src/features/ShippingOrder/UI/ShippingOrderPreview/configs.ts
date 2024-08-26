import { startOfDay } from "date-fns";
import { t } from "i18next";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import { IShippingOrderPreview } from "../../store/ShippingOrderStore/models/ShippingOrderPreview";

export const fieldsConfiguration = (data: NonNullable<IShippingOrderPreview["model"]>) =>
    [
        {
            name: t("Shared:commonInfo"),
            fields: [
                {
                    label: t("ShippingOrder:properties.number"),
                    name: "number",
                    type: FieldItemType.INPUT,
                    value: data.number,
                    readOnly: true,
                },
                {
                    label: t("ShippingOrder:properties.legalEntity"),
                    name: "legalEntity",
                    value: data.legalEntity.code,
                    type: FieldItemType.INPUT,
                    readOnly: true,
                },
                {
                    label: t("ShippingOrder:properties.client"),
                    name: "client",
                    value: data.client.code,
                    type: FieldItemType.INPUT,
                    readOnly: true,
                },

                {
                    label: t("ShippingOrder:properties.contract"),
                    value: data.contract.code,
                    name: "contract",
                    type: FieldItemType.INPUT,
                    readOnly: true,
                },
            ],
        },
        {
            name: t("ShippingOrder:groups.orderParams"),
            fields: [
                {
                    label: t("ShippingOrder:properties.shippedTerminalArea"),
                    type: FieldItemType.ENUM_SELECT,
                    value: data.terminalArea,
                    name: "terminalArea",
                    dictionaryType: DictionaryType.TERMINAL_AREA,
                    translatePath: "TerminalArea:types",
                    readOnly: true,
                },
                {
                    label: t("ShippingOrder:properties.planShippingDateInfo"),
                    name: "planShippingDate",
                    value: data.plannedShippingDateTime
                        ? startOfDay(data.plannedShippingDateTime)
                        : null,
                    type: FieldItemType.DATE,
                    readOnly: true,
                },
                {
                    label: t("ShippingOrder:properties.shippedTransportType"),
                    value: data.transportType,
                    name: "transportType",
                    readOnly: true,
                    type: FieldItemType.ENUM_SELECT,
                    dictionaryType: DictionaryType.TRANSPORT_TYPE,
                    translatePath: "TransportType:types",
                },
                {
                    label: t("ShippingOrder:properties.planShippingTimeInfo"),
                    name: "planReceivingTime",
                    type: FieldItemType.TIME,
                    value: data.plannedShippingDateTime,
                    readOnly: true,
                },
            ],
        },
        {
            name: t("ShippingOrderPreview:groups.cargoParams"),
            fields: [
                {
                    label: t("ShippingOrderPreview:properties.goodsCount"),
                    name: "totalSKUQuantity",
                    type: FieldItemType.INPUT,
                    value: data.totalSKUQuantity,
                    readOnly: true,
                },
                {
                    label: t("ShippingOrderPreview:properties.cargoCount"),
                    name: "totalCargoQuantity",
                    type: FieldItemType.INPUT,
                    value: data.totalCargoQuantity,
                    readOnly: true,
                },
                {
                    label: t("ShippingOrderPreview:properties.weight"),
                    name: "totalWeight",
                    type: FieldItemType.INPUT,
                    value: data.totalWeight,
                    readOnly: true,
                },
                {
                    label: t("ShippingOrderPreview:properties.palletQuantity"),
                    name: "totalPalletQuantity",
                    type: FieldItemType.INPUT,
                    value: data.totalPalletQuantity,
                    readOnly: true,
                },
                {
                    label: t("ShippingOrderPreview:properties.notPalletQuantity"),
                    name: "totalNotPalletQuantity",
                    type: FieldItemType.INPUT,
                    value: data.totalNotPalletQuantity,
                    readOnly: true,
                },
            ],
        },
        {
            name: t("ShippingOrderPreview:groups.orderPrice"),
            fields: [
                {
                    label: t("ShippingOrderPreview:properties.total"),
                    name: "total",
                    type: FieldItemType.INPUT,
                    value: data.totalGoodsPrice,
                    readOnly: true,
                },
                {
                    label: t("ShippingOrderPreview:properties.currency"),
                    name: "currency",
                    type: FieldItemType.INPUT,
                    value: data.currency.code,
                    readOnly: true,
                },
            ],
        },
        {
            name: t("ShippingOrderPreview:groups.services"),
            fields: [
                {
                    label: t("ShippingOrderPreview:properties.servicesNumber"),
                    name: "totalRequestedServiceQuantity",
                    type: FieldItemType.INPUT,
                    value: data.totalRequestedServiceQuantity,
                    readOnly: true,
                },
                {
                    label: t("ShippingOrderPreview:properties.totalWithoutVAT"),
                    name: "totalRequestedServicePrice",
                    type: FieldItemType.INPUT,
                    value: data.totalRequestedServicePrice,
                    readOnly: true,
                },
            ],
        },
        {
            name: t("ShippingOrderPreview:groups.additional"),
            fields: [
                {
                    label: t("ShippingOrderPreview:properties.comment"),
                    name: "comment",
                    type: FieldItemType.INPUT,
                    value: data.comment,
                    readOnly: true,
                },
            ],
        },
    ] as FieldGroup[];
