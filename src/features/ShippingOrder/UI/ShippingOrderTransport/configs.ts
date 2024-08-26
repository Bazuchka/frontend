import { t } from "i18next";
import { SEARCH_TYPE } from "src/shared/enums";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import { IFullShippingOrderTransport } from "../../store/ShippingOrderTransportStore/ShippingOrderTransportStore";

export interface IDriverInfo {
    id?: string;
    phoneNumber?: string;
    POANumber?: string;
}

export interface IVehicleInfo {
    id?: string;
    withTrailer?: boolean;
    trailerNumber?: string;
    insuranceNumber?: string;
}

export interface IShipperInfo {
    inn?: string;
}

interface IFieldsConfiguration {
    defaultModel: IFullShippingOrderTransport | null;
    relatedData: {
        shipperInfo: IShipperInfo;
        clientId: string;
        // expand this list with dependent fields
        driverInfo: IDriverInfo;
        vehicleInfo: IVehicleInfo;
    };
    actions: {
        onDriverCardOpen: () => void;
        onVehicleCardOpen: () => void;
    };
}

export const fieldsConfiguration = ({
    defaultModel: editModel,
    relatedData,
    actions: { onDriverCardOpen, onVehicleCardOpen },
}: IFieldsConfiguration) =>
    [
        {
            name: t("ShippingOrderTransport:groups.consignee"),
            fields: [
                {
                    type: FieldItemType.AUTOCOMPLETE,
                    name: "consignee",
                    label: t("ShippingOrderTransport:properties.consignee.name"),
                    value: editModel?.consignee,
                    required: true,
                    requestParams: {
                        type: DictionaryType.CLIENT_REALTED_ENTITY,
                        filter: (value: string) => ({
                            active: true,
                            isConsignee: true,
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
                    type: FieldItemType.INPUT,
                    name: "consigneeAddress",
                    label: t("ShippingOrderTransport:properties.consignee.consigneeAddress"),
                    value: editModel?.consigneeAddress,
                    required: true,
                },
            ],
        },
        {
            name: t("ShippingOrderTransport:groups.carrier"),
            fields: [
                {
                    type: FieldItemType.AUTOCOMPLETE,
                    name: "carrier",
                    label: t("ShippingOrderTransport:properties.carrier"),
                    value: editModel?.carrier,
                    required: true,
                    requestParams: {
                        type: DictionaryType.CLIENT_REALTED_ENTITY,
                        filter: {
                            active: true,
                            isCarrier: true,
                        },
                    },
                },
            ],
        },
        {
            name: t("ShippingOrderTransport:groups.vehicle"),
            fields: [
                {
                    type: FieldItemType.AUTOCOMPLETE,
                    name: "vehicle",
                    label: t("ShippingOrderTransport:properties.vehicle.number"),
                    value: editModel?.vehicleInfo,
                    required: true,
                    requestParams: {
                        type: DictionaryType.CLIENT_VEHICLE,
                        filter: {
                            active: true,
                            client: {
                                id: relatedData.clientId,
                            },
                        },
                    },
                },
                {
                    type: FieldItemType.BUTTON,
                    events: {
                        onButtonClick: onVehicleCardOpen,
                    },
                    label: relatedData?.vehicleInfo?.id ? t("Action:openCard") : t("Action:create"),
                    readOnly: true,
                },
                {
                    label: t("ShippingOrderTransport:properties:vehicle.withTrailer"),
                    type: FieldItemType.CHECKBOX,
                    value: relatedData.vehicleInfo?.withTrailer,
                    name: "withTrailer",
                    fullLine: false,
                },
                {
                    type: FieldItemType.INPUT,
                    name: "vehicleTrailerNumber",
                    label: t("ShippingOrderTransport:properties:vehicle.trailerNumber"),
                    value: relatedData.vehicleInfo?.trailerNumber,
                    isDisable: !relatedData.vehicleInfo.id,
                },
                {
                    type: FieldItemType.INPUT,
                    name: "vehicleInsuranceNumber",
                    label: t("ShippingOrderTransport:properties:vehicle.insuranceNumber"),
                    value: relatedData.vehicleInfo?.insuranceNumber,
                    isDisable: !relatedData.vehicleInfo.id,
                },
            ],
        },
        {
            name: t("ShippingOrderTransport:groups.driver"),
            fields: [
                {
                    type: FieldItemType.AUTOCOMPLETE,
                    name: "driver",
                    label: t("ShippingOrderTransport:properties.driver.name"),
                    value: editModel?.driverInfo,
                    required: true,
                    requestParams: {
                        type: DictionaryType.CLIENT_DRIVER,
                        filter: {
                            active: true,
                        },
                    },
                },
                {
                    type: FieldItemType.BUTTON,
                    events: {
                        onButtonClick: onDriverCardOpen,
                    },
                    label: relatedData?.driverInfo?.id ? t("Action:openCard") : t("Action:create"),
                    readOnly: true,
                },
                {
                    type: FieldItemType.INPUT,
                    name: "driverPhoneNumber",
                    label: t("ShippingOrderTransport:properties.driver.phoneNumber"),
                    value: relatedData?.driverInfo.phoneNumber,
                    isDisable: !relatedData?.driverInfo.id,
                },
                {
                    type: FieldItemType.INPUT,
                    name: "driverPOANumber",
                    label: t("ShippingOrderTransport:properties.driver.POAnumber"),
                    value: relatedData?.driverInfo.POANumber,
                    isDisable: !relatedData?.driverInfo.id,
                },
            ],
        },
    ] as FieldGroup[];
