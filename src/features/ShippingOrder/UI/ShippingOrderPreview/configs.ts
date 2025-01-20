import { startOfDay } from "date-fns";
import { t } from "i18next";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import { IShippingOrderPreview } from "../../store/ShippingOrderStore/models/ShippingOrderPreview";
import containerCargoFields from "./configs/containerCargoFields";
import defaultCargoFields from "./configs/defaultCargoFields";

export const fieldsConfiguration = (
    data: NonNullable<IShippingOrderPreview["model"]>,
    showContainerInfo: boolean
) =>
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
                {
                    label: t("ShippingOrder:properties.contractType"),
                    value: data.contract.contractType
                        ? t(`ContractType:${data.contract.contractType}`)
                        : "-",
                    name: "contractType",
                    type: FieldItemType.INPUT,
                    readOnly: true,
                },
                {
                    label: t("ShippingOrder:properties.contractDate"),
                    value: data.contract.contractDate ?? null,
                    name: "contractDate",
                    type: FieldItemType.DATE,
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
            fields: showContainerInfo ? containerCargoFields(data) : defaultCargoFields(data),
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
