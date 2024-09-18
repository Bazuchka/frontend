import { startOfDay } from "date-fns";
import { t } from "i18next";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { IFullReceivingOrder } from "../../store/ReceivingOrderStore/ReceivingOrderStore";
import { getPossibleStatuses, isOrderStatusDisabled } from "./utils";

export interface IFieldsConfigurationParams {
    isCreate: boolean;
    defaultModel: IFullReceivingOrder | null;
    filters: {
        client: { id: string; code: string } | null;
        legalEntity: { id: string; code: string } | null;
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
                    label: t("ReceivingOrder:properties.number"),
                    name: "number",
                    type: FieldItemType.INPUT,
                    value: defaultModel?.number,
                    readOnly: true,
                },
                {
                    label: t("ReceivingOrder:properties.client"),
                    name: "client",
                    type: FieldItemType.AUTOCOMPLETE,
                    value: defaultModel?.client,
                    required: true,
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
                    label: t("ReceivingOrder:properties.legalEntity"),
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
                    label: t("ReceivingOrder:properties.orderStatus"),
                    type: FieldItemType.ENUM_SELECT,
                    value: isCreate ? "DRAFT" : defaultModel?.orderStatus,
                    name: "orderStatus",
                    required: true,
                    readOnly: isOrderStatusDisabled(defaultModel),
                    translatePath: "OrderStatus:types",
                    options: getPossibleStatuses(defaultModel),
                },
                {
                    label: t("ReceivingOrder:properties.contract"),
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
            name: t("ReceivingOrder:groups.orderParams"),
            fields: [
                {
                    label: t("TermOfService:properties.terminalArea"),
                    type: FieldItemType.ENUM_SELECT,
                    value: defaultModel?.terminalArea,
                    name: "terminalArea",
                    required: true,
                    dictionaryType: DictionaryType.TERMINAL_AREA,
                    translatePath: "TerminalArea:types",
                    isDisable: !isCreate,
                },
                {
                    label: t("ReceivingOrder:properties.planReceivingDateInfo"),
                    name: "planReceivingDate",
                    value: defaultModel?.planReceivingDateTime
                        ? startOfDay(defaultModel?.planReceivingDateTime)
                        : null,
                    type: FieldItemType.DATE,
                    required: true,
                },
                {
                    label: t("ReceivingOrder:properties.transportType"),
                    value: defaultModel?.transportType,
                    name: "transportType",
                    required: true,
                    type: FieldItemType.ENUM_SELECT,
                    dictionaryType: DictionaryType.TRANSPORT_TYPE,
                    translatePath: "TransportType:types",
                    isDisable: !isCreate,
                },
                {
                    label: t("ReceivingOrder:properties.planReceivingTimeInfo"),
                    name: "planReceivingTime",
                    type: FieldItemType.TIME,
                    value: defaultModel?.planReceivingDateTime,
                    required: true,
                },
                {
                    label: t("ReceivingOrder:properties.storagePeriod"),
                    type: FieldItemType.INPUT_NUMBER,
                    value: defaultModel?.storagePeriod,
                    name: "storagePeriod",
                    required: true,
                    min: 0,
                },
                {
                    label: t("ReceivingOrder:properties.currency"),
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
                    label: t("ReceivingOrder:properties.contact.name"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.contact?.name,
                    name: "contactName",
                    required: true,
                },
                {
                    label: t("ReceivingOrder:properties.contact.email"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.contact?.email,
                    name: "contactEmail",
                    required: true,
                },
                {
                    label: t("ReceivingOrder:properties.contact.phone"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.contact?.phone,
                    name: "contactPhone",
                    required: true,
                },
            ],
        },
        {
            name: t("Shared:additionalInfo"),
            fields: [
                {
                    label: t("ReceivingOrder:properties.comment"),
                    type: FieldItemType.INPUT,
                    value: defaultModel?.comment,
                    name: "comment",
                },
            ],
        },
    ] as FieldGroup[];
