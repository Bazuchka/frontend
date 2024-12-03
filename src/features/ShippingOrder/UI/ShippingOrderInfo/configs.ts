import { startOfDay } from "date-fns";
import { t } from "i18next";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { ValueOption } from "src/shared/hooks/useDictionary/config";
import { IFullShippingOrder } from "../../store/ShippingOrderStore/ShippingOrderStore";
import { getPossibleStatuses, isOrderStatusDisabled } from "./utils";

export interface IFieldsConfigurationParams {
    isCreate: boolean;
    defaultModel: IFullShippingOrder | null;
    filters: {
        client: { id: string; code: string } | null;
        legalEntity: { id: string; code: string } | null;
        terminalArea?: string;
    };
}

export const fieldsConfiguration = ({
    isCreate,
    filters,
    defaultModel,
}: IFieldsConfigurationParams) =>
    [
        {
            name: t("Shared:commonInfo"),
            fields: [
                {
                    label: t("ShippingOrder:properties.number"),
                    name: "number",
                    type: FieldItemType.INPUT,
                    value: defaultModel?.number,
                    readOnly: true,
                },
                {
                    label: t("ShippingOrder:properties.client"),
                    name: "client",
                    type: FieldItemType.AUTOCOMPLETE,
                    value: defaultModel?.client,
                    required: true,
                    isDisable: !!defaultModel,
                    requestParams: {
                        type: DictionaryType.CLIENT,
                        filter: {
                            active: true,
                        },
                    },
                },
                {
                    label: t("Shared:createdAt"),
                    name: "createdAt",
                    type: FieldItemType.DATE,
                    value: defaultModel?.createdAt,
                    readOnly: true,
                },
                {
                    label: t("ShippingOrder:properties.legalEntity"),
                    name: "legalEntity",
                    value: defaultModel?.legalEntity,
                    type: FieldItemType.AUTOCOMPLETE,
                    required: true,
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
                    label: t("ShippingOrder:properties.orderStatus"),
                    type: FieldItemType.ENUM_SELECT,
                    value: isCreate ? "DRAFT" : defaultModel?.orderStatus,
                    name: "orderStatus",
                    required: true,
                    readOnly: isOrderStatusDisabled(defaultModel),
                    translatePath: "OrderStatus:types",
                    options: getPossibleStatuses(defaultModel),
                },
                {
                    label: t("ShippingOrder:properties.contract"),
                    type: FieldItemType.AUTOCOMPLETE,
                    value: defaultModel?.contract,
                    name: "contract",
                    required: true,
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
        },
        {
            name: t("ShippingOrder:groups.orderParams"),
            fields: [
                {
                    label: t("ShippingOrder:properties.shippedTerminalArea"),
                    type: FieldItemType.ENUM_SELECT,
                    value: defaultModel?.terminalArea,
                    name: "terminalArea",
                    required: true,
                    dictionaryType: DictionaryType.TERMINAL_AREA,
                    translatePath: "TerminalArea:types",
                    isDisable: !isCreate,
                },
                {
                    label: t("ShippingOrder:properties.planShippingDateInfo"),
                    name: "planShippingDate",
                    value: defaultModel?.plannedShippingDateTime
                        ? startOfDay(defaultModel?.plannedShippingDateTime)
                        : null,
                    type: FieldItemType.DATE,
                    required: true,
                },
                {
                    label: t("ShippingOrder:properties.shippedTransportType"),
                    value: defaultModel?.transportType,
                    name: "transportType",
                    required: true,
                    type: FieldItemType.ENUM_SELECT,
                    translatePath: "TransportType:types",
                    isDisable: !isCreate,
                    requestParams: {
                        type: DictionaryType.TRANSPORT_TYPE,
                        filter: (value: string | ValueOption) => {
                            return filters.terminalArea !== "WAREHOUSE" || value !== "RAILWAY";
                        },
                    },
                },
                {
                    label: t("ShippingOrder:properties.planShippingTimeInfo"),
                    name: "planShippingTime",
                    type: FieldItemType.TIME,
                    value: defaultModel?.plannedShippingDateTime,
                    required: true,
                },
                {
                    label: t("ShippingOrder:properties.currency"),
                    type: FieldItemType.AUTOCOMPLETE,
                    value: defaultModel?.currency,
                    name: "currency",
                    required: true,
                    requestParams: {
                        type: DictionaryType.CURRENCY,
                    },
                },
            ],
        },
        {
            name: t("Shared:contactInfo"),
            fields: [
                {
                    label: t("ShippingOrder:properties.contact.name"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.contact?.name,
                    name: "contactName",
                },
                {
                    label: t("ShippingOrder:properties.contact.email"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.contact?.email,
                    name: "contactEmail",
                },
                {
                    label: t("ShippingOrder:properties.contact.phone"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.contact?.phone,
                    name: "contactPhone",
                },
            ],
        },
        {
            name: t("Shared:additionalInfo"),
            fields: [
                {
                    label: t("ShippingOrder:properties.comment"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.comment,
                    name: "comment",
                },
            ],
        },
    ] as FieldGroup[];
