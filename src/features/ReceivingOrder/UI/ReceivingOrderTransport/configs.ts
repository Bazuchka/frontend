import { t } from "i18next";
import { SEARCH_TYPE } from "src/shared/enums";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import { IFullReceivingOrderTransport } from "../../store/ReceivingOrderTransportStore/ReceivingOrderTransportStore";

export interface IDriverInfo {
    id?: string;
    phoneNumber?: string;
    POANumber?: string;
}

export interface IVehicleInfo {
    id?: string;
    trailerNumberDisabled?: boolean;
}

export interface IShipperInfo {
    inn?: string;
}

interface IFieldsConfiguration {
    defaultModel: IFullReceivingOrderTransport | null;
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
            name: t("ReceivingOrderTransport:groups.shipper"),
            fields: [
                {
                    type: FieldItemType.AUTOCOMPLETE,
                    name: "shipper",
                    label: t("ReceivingOrderTransport:properties.shipper.name"),
                    value: editModel?.shipper,
                    required: true,
                    renderValuePrimary: "code",
                    renderValueSecondary: "inn",
                    nonEditableValue: `${editModel?.shipper.code} (${editModel?.shipper.inn})`,
                    requestParams: {
                        type: DictionaryType.CLIENT_RELATED_ENTITY,
                        filter: (value: string) => ({
                            active: true,
                            isShipper: true,
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
                    name: "waybill",
                    label: t("ReceivingOrderTransport:properties.waybill"),
                    value: editModel?.waybill,
                    required: true,
                },
            ],
        },
        {
            name: t("ReceivingOrderTransport:groups.carrier"),
            fields: [
                {
                    type: FieldItemType.AUTOCOMPLETE,
                    name: "carrier",
                    label: t("ReceivingOrderTransport:properties.carrier"),
                    value: editModel?.carrier,
                    required: true,
                    requestParams: {
                        type: DictionaryType.CLIENT_RELATED_ENTITY,
                        filter: (value) => ({
                            active: true,
                            isCarrier: true,
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
            ],
        },
        {
            name: t("ReceivingOrderTransport:groups.vehicle"),
            fields: [
                {
                    type: FieldItemType.AUTOCOMPLETE,
                    name: "vehicle",
                    label: t("ReceivingOrderTransport:properties.vehicle.number"),
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
                    label: t("ReceivingOrderTransport:properties:vehicle.withTrailer"),
                    type: FieldItemType.CHECKBOX,
                    value: editModel?.vehicleInfo?.withTrailer,
                    name: "withTrailer",
                    fullLine: false,
                },
                {
                    type: FieldItemType.INPUT,
                    name: "vehicleTrailerNumber",
                    label: t("ReceivingOrderTransport:properties:vehicle.trailerNumber"),
                    value: editModel?.vehicleInfo?.trailerNumber,
                    isDisable:
                        !relatedData.vehicleInfo.id ||
                        relatedData.vehicleInfo.trailerNumberDisabled,
                },
                {
                    type: FieldItemType.INPUT,
                    name: "vehicleInsuranceNumber",
                    label: t("ReceivingOrderTransport:properties:vehicle.insuranceNumber"),
                    value: editModel?.vehicleInfo?.insuranceNumber,
                    isDisable: !relatedData.vehicleInfo.id,
                },
            ],
        },
        {
            name: t("ReceivingOrderTransport:groups.driver"),
            fields: [
                {
                    type: FieldItemType.AUTOCOMPLETE,
                    name: "driver",
                    label: t("ReceivingOrderTransport:properties.driver.name"),
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
                    label: t("ReceivingOrderTransport:properties.driver.phoneNumber"),
                    value: relatedData?.driverInfo.phoneNumber,
                    isDisable: !relatedData?.driverInfo.id,
                },
                {
                    type: FieldItemType.INPUT,
                    name: "driverPOANumber",
                    label: t("ReceivingOrderTransport:properties.driver.POAnumber"),
                    value: relatedData?.driverInfo.POANumber,
                    isDisable: !relatedData?.driverInfo.id,
                },
            ],
        },
    ] as FieldGroup[];
