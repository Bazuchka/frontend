import { startOfDay } from "date-fns";
import { t } from "i18next";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import { IReceivingOrderPreview } from "../../store/ReceivingOrderStore/models/ReceivingOrderPreview";
import containerCargoFields from "./configs/containerCargoFields";
import defaultCargoFields from "./configs/defaultCargoFields";

export const fieldsConfiguration = (
    data: NonNullable<IReceivingOrderPreview["model"]>,
    showContainerInfo: boolean
) =>
    [
        {
            name: t("Shared:commonInfo"),
            fields: [
                {
                    label: t("ReceivingOrder:properties.number"),
                    name: "number",
                    type: FieldItemType.INPUT,
                    value: data.number,
                    readOnly: true,
                },
                {
                    label: t("ReceivingOrder:properties.legalEntity"),
                    name: "legalEntity",
                    value: data.legalEntity.code,
                    type: FieldItemType.INPUT,
                    readOnly: true,
                },
                {
                    label: t("ReceivingOrder:properties.client"),
                    name: "client",
                    value: data.client.code,
                    type: FieldItemType.INPUT,
                    readOnly: true,
                },

                {
                    label: t("ReceivingOrder:properties.contract"),
                    value: data.contract.code,
                    name: "contract",
                    type: FieldItemType.INPUT,
                    readOnly: true,
                },
                {
                    label: t("ReceivingOrder:properties.contractType"),
                    value: data.contract.contractType
                        ? t(`ContractType:${data.contract.contractType}`)
                        : "-",
                    name: "contractType",
                    type: FieldItemType.INPUT,
                    readOnly: true,
                },
                {
                    label: t("ReceivingOrder:properties.contractDate"),
                    value: data.contract.contractDate ?? null,
                    name: "contractDate",
                    type: FieldItemType.DATE,
                    readOnly: true,
                },
            ],
        },
        {
            name: t("ReceivingOrder:groups.orderParams"),
            fields: [
                {
                    label: t("ReceivingOrder:properties.terminalArea"),
                    type: FieldItemType.ENUM_SELECT,
                    value: data.terminalArea,
                    name: "terminalArea",
                    dictionaryType: DictionaryType.TERMINAL_AREA,
                    translatePath: "TerminalArea:types",
                    readOnly: true,
                },
                {
                    label: t("ReceivingOrder:properties.planReceivingDateInfo"),
                    name: "planReceivingDate",
                    value: data.planReceivingDateTime
                        ? startOfDay(data.planReceivingDateTime)
                        : null,
                    type: FieldItemType.DATE,
                    readOnly: true,
                },
                {
                    label: t("ReceivingOrder:properties.transportType"),
                    value: data.transportType,
                    name: "transportType",
                    type: FieldItemType.ENUM_SELECT,
                    dictionaryType: DictionaryType.TRANSPORT_TYPE,
                    translatePath: "TransportType:types",
                    readOnly: true,
                },
                {
                    label: t("ReceivingOrder:properties.planReceivingTimeInfo"),
                    name: "planReceivingTime",
                    type: FieldItemType.TIME,
                    value: data.planReceivingDateTime,
                    readOnly: true,
                },
            ],
        },
        {
            name: t("ReceivingOrderPreview:groups.cargoParams"),
            fields: showContainerInfo ? containerCargoFields(data) : defaultCargoFields(data),
        },
        {
            name: t("ReceivingOrderPreview:groups.orderPrice"),
            fields: [
                {
                    label: t("ReceivingOrderPreview:properties.total"),
                    name: "total",
                    type: FieldItemType.INPUT,
                    value: data.totalGoodsPrice,
                    readOnly: true,
                },
                {
                    label: t("ReceivingOrderPreview:properties.currency"),
                    name: "currency",
                    type: FieldItemType.INPUT,
                    value: data.currency.code,
                    readOnly: true,
                },
            ],
        },
        {
            name: t("ReceivingOrderPreview:groups.services"),
            fields: [
                {
                    label: t("ReceivingOrderPreview:properties.servicesNumber"),
                    name: "totalRequestedServiceQuantity",
                    type: FieldItemType.INPUT,
                    value: data.totalRequestedServiceQuantity,
                    readOnly: true,
                },
                {
                    label: t("ReceivingOrderPreview:properties.totalWithoutVAT"),
                    name: "totalRequestedServicePrice",
                    type: FieldItemType.INPUT,
                    value: data.totalRequestedServicePrice,
                    readOnly: true,
                },
            ],
        },
        {
            name: t("ReceivingOrderPreview:groups.additional"),
            fields: [
                {
                    label: t("ReceivingOrderPreview:properties.comment"),
                    name: "comment",
                    type: FieldItemType.INPUT,
                    value: data.comment,
                    readOnly: true,
                },
            ],
        },
    ] as FieldGroup[];
