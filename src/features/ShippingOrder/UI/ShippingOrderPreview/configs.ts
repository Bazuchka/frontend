import { startOfDay } from "date-fns";
import { t } from "i18next";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import { IShippingOrderPreview } from "../../store/ShippingOrderStore/models/ShippingOrderPreview";
import { OrderType } from "src/shared/helpers/order";

type FieldsConfigurationProps = Omit<FieldGroudConfigurationProps, "orderType">;

interface FieldGroudConfigurationProps {
    data: NonNullable<IShippingOrderPreview["model"]>;
    tableComponent: React.ReactElement;
    orderType: OrderType;
}

const getWareHouseVehicleCargoFields = ({ data, tableComponent }: FieldsConfigurationProps) => [
    {
        label: t("ShippingOrderPreview:properties.goodsCount"),
        name: "totalSKUQuantity",
        type: FieldItemType.INPUT,
        value: data.totalSKUQuantity?.toString(),
        readOnly: true,
    },
    {
        label: t("ShippingOrderPreview:properties.cargoCount"),
        name: "cargoCount",
        type: FieldItemType.INPUT,
        value: data.totalCargoQuantity?.toString(),
        readOnly: true,
    },
    {
        label: t("ShippingOrderPreview:properties.weight"),
        name: "weight",
        type: FieldItemType.INPUT,
        value: data.totalWeight?.toString(),
        readOnly: true,
    },
    {
        label: t("ShippingOrderPreview:properties.total"),
        name: "total",
        type: FieldItemType.INPUT,
        value: data.totalGoodsPrice,
        readOnly: true,
    },
    {
        label: t("ShippingOrderPreview:properties.palletQuantity"),
        name: "palletQuantity",
        type: FieldItemType.INPUT,
        value: data.totalPalletQuantity?.toString(),
        readOnly: true,
    },
    {
        label: t("ShippingOrderPreview:properties.currency"),
        name: "currency",
        type: FieldItemType.INPUT,
        value: data.currency.code,
        readOnly: true,
    },
    {
        label: t("ShippingOrderPreview:cargoParams.totalNotPalletQuantity"),
        name: "totalNotPalletQuantity",
        type: FieldItemType.INPUT,
        value: data.totalNotPalletQuantity?.toString(),
        readOnly: true,
    },
    {
        name: "table",
        type: FieldItemType.TABLE,
        component: tableComponent,
        readOnly: true,
    },
];

const getContainerVehicleCargoFields = ({ data, tableComponent }: FieldsConfigurationProps) => [
    {
        label: t("ShippingOrderPreview:properties.containersQuantity"),
        name: "containersQuantity",
        type: FieldItemType.INPUT,
        value: data.totalContainerQuantity?.toString(),
        readOnly: true,
    },
    {
        label: t("ShippingOrderPreview:properties.total"),
        name: "total",
        type: FieldItemType.INPUT,
        value: data.totalGoodsPrice,
        readOnly: true,
    },
    {
        label: t("ShippingOrderPreview:properties.weight"),
        name: "weight",
        type: FieldItemType.INPUT,
        value: data.totalWeight?.toString(),
        readOnly: true,
    },
    {
        label: t("ShippingOrderPreview:properties.currency"),
        name: "currency",
        type: FieldItemType.INPUT,
        value: data.currency.code,
        readOnly: true,
    },
    {
        name: "table",
        type: FieldItemType.TABLE,
        component: tableComponent,
        readOnly: true,
    },
];

export const fieldsConfiguration = ({
    data,
    tableComponent,
    orderType,
}: FieldGroudConfigurationProps) => {
    const fieldGroupList = [
        {
            name: t("Shared:commonInfo"),
            fields: [
                {
                    label: t("ShippingOrder:properties.number"),
                    name: "number",
                    type: FieldItemType.INPUT,
                    value: data.number,
                    readOnly: true,
                    orderPermissionList: [
                        OrderType.containerRailway,
                        OrderType.containerVehicle,
                        OrderType.warehouseVehicle,
                    ],
                },
                {
                    label: t("ShippingOrder:properties.contract"),
                    value: data.contract.code,
                    name: "contract",
                    type: FieldItemType.INPUT,
                    readOnly: true,
                    orderPermissionList: [
                        OrderType.containerRailway,
                        OrderType.containerVehicle,
                        OrderType.warehouseVehicle,
                    ],
                },
                {
                    label: t("ShippingOrder:properties.client"),
                    name: "client",
                    value: data.client.code,
                    type: FieldItemType.INPUT,
                    readOnly: true,
                    orderPermissionList: [
                        OrderType.containerRailway,
                        OrderType.containerVehicle,
                        OrderType.warehouseVehicle,
                    ],
                },
                {
                    label: t("ShippingOrder:properties.contractType"),
                    value: data.contract.contractType
                        ? t(`ContractType:${data.contract.contractType}`)
                        : "-",
                    name: "contractType",
                    type: FieldItemType.INPUT,
                    readOnly: true,
                    orderPermissionList: [
                        OrderType.containerRailway,
                        OrderType.containerVehicle,
                        OrderType.warehouseVehicle,
                    ],
                },
                {
                    label: t("ShippingOrder:properties.legalEntity"),
                    name: "legalEntity",
                    value: data.legalEntity.code,
                    type: FieldItemType.INPUT,
                    readOnly: true,
                    orderPermissionList: [
                        OrderType.containerRailway,
                        OrderType.containerVehicle,
                        OrderType.warehouseVehicle,
                    ],
                },
                {
                    label: t("ShippingOrder:properties.contractDate"),
                    value: data.contract.contractDate ?? null,
                    name: "contractDate",
                    type: FieldItemType.DATE,
                    readOnly: true,
                    orderPermissionList: [
                        OrderType.containerRailway,
                        OrderType.containerVehicle,
                        OrderType.warehouseVehicle,
                    ],
                },
                {
                    label: t("ShippingOrder:properties.legalEntityInn"),
                    value: data.legalEntityInn ?? "-",
                    name: "legalEntityInn",
                    type: FieldItemType.INPUT,
                    readOnly: true,
                    orderPermissionList: [
                        OrderType.containerRailway,
                        OrderType.containerVehicle,
                        OrderType.warehouseVehicle,
                    ],
                },
            ],
        },
        {
            name: t("ShippingOrder:groups.orderParams"),
            fields: [
                {
                    label: t("ShippingOrder:properties.terminalArea"),
                    type: FieldItemType.ENUM_SELECT,
                    value: data.terminalArea,
                    name: "terminalArea",
                    dictionaryType: DictionaryType.TERMINAL_AREA,
                    translatePath: "TerminalArea:types",
                    readOnly: true,
                    orderPermissionList: [
                        OrderType.containerRailway,
                        OrderType.containerVehicle,
                        OrderType.warehouseVehicle,
                    ],
                },
                {
                    label: t("ShippingOrder:properties.planShippingDateInfo"),
                    name: "planShippingDate",
                    value: data.plannedShippingDateTime
                        ? startOfDay(data.plannedShippingDateTime)
                        : null,
                    type: FieldItemType.DATE,
                    readOnly: true,
                    orderPermissionList: [
                        OrderType.containerRailway,
                        OrderType.containerVehicle,
                        OrderType.warehouseVehicle,
                    ],
                },
                {
                    label: t("ShippingOrder:properties.shippedTransportType"),
                    value: data.transportType,
                    name: "transportType",
                    readOnly: true,
                    type: FieldItemType.ENUM_SELECT,
                    dictionaryType: DictionaryType.TRANSPORT_TYPE,
                    translatePath: "TransportType:types",
                    orderPermissionList: [
                        OrderType.containerRailway,
                        OrderType.containerVehicle,
                        OrderType.warehouseVehicle,
                    ],
                },
                {
                    label: t("ShippingOrder:properties.planShippingTimeInfo"),
                    name: "planShippingTime",
                    type: FieldItemType.TIME,
                    value: data.plannedShippingDateTime,
                    readOnly: true,
                    orderPermissionList: [
                        OrderType.containerRailway,
                        OrderType.containerVehicle,
                        OrderType.warehouseVehicle,
                    ],
                },
            ],
        },
        {
            name: t("ShippingOrderPreview:groups.driverAndTransport"),
            fields: [
                {
                    label: t("ShippingOrderPreview:driverAndTransport.driverName"),
                    type: FieldItemType.INPUT,
                    value: data?.clientDriver?.code ?? "-",
                    name: "driverName",
                    readOnly: true,
                    orderPermissionList: [OrderType.containerVehicle, OrderType.warehouseVehicle],
                },
                {
                    label: t("ShippingOrderPreview:driverAndTransport.vehicleBrand"),
                    type: FieldItemType.INPUT,
                    value: data?.clientVehicle?.vehicleBrand.code ?? "-",
                    name: "vehicleBrand",
                    readOnly: true,
                    orderPermissionList: [OrderType.containerVehicle, OrderType.warehouseVehicle],
                },
                {
                    label: t("ShippingOrderPreview:driverAndTransport.passportNumber"),
                    type: FieldItemType.INPUT,
                    value: data?.clientDriver?.passportNumber ?? "-",
                    name: "passportNumber",
                    readOnly: true,
                    orderPermissionList: [OrderType.containerVehicle, OrderType.warehouseVehicle],
                },
                {
                    label: t("ShippingOrderPreview:driverAndTransport.vehicleNumber"),
                    type: FieldItemType.INPUT,
                    value: data?.clientVehicle?.code ?? "-",
                    name: "vehicleNumber",
                    readOnly: true,
                    orderPermissionList: [OrderType.containerVehicle, OrderType.warehouseVehicle],
                },
                {
                    label: t("ShippingOrderPreview:driverAndTransport.drivingLicenseNumber"),
                    type: FieldItemType.INPUT,
                    value: data?.clientDriver?.drivingLicenseNumber ?? "-",
                    name: "drivingLicenseNumber",
                    readOnly: true,
                    orderPermissionList: [OrderType.containerVehicle, OrderType.warehouseVehicle],
                },
                {
                    label: t("ShippingOrderPreview:driverAndTransport.trailerNumber"),
                    type: FieldItemType.INPUT,
                    value: data?.clientVehicle?.trailerNumber ?? "-",
                    name: "trailerNumber",
                    readOnly: true,
                    orderPermissionList: [OrderType.containerVehicle, OrderType.warehouseVehicle],
                },
                {
                    label: t("ShippingOrderPreview:driverAndTransport.phoneNumber"),
                    type: FieldItemType.INPUT,
                    value: data?.clientDriver?.phoneNumber ?? "-",
                    name: "phoneNumber",
                    readOnly: true,
                    orderPermissionList: [OrderType.containerVehicle, OrderType.warehouseVehicle],
                },
                {
                    label: t("ShippingOrderPreview:driverAndTransport.POANumber"),
                    type: FieldItemType.INPUT,
                    value: data?.clientDriver?.POANumber ?? "-",
                    name: "POANumber",
                    readOnly: true,
                    orderPermissionList: [OrderType.containerVehicle, OrderType.warehouseVehicle],
                    fullLine: true,
                },
                {
                    label: t("ShippingOrderPreview:driverAndTransport.POAValidTo"),
                    type: FieldItemType.INPUT,
                    value: data?.clientDriver?.POAValidTo ?? "-",
                    name: "POAValidTo",
                    readOnly: true,
                    orderPermissionList: [OrderType.containerVehicle, OrderType.warehouseVehicle],
                    fullLine: true,
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
                    orderPermissionList: [
                        OrderType.containerRailway,
                        OrderType.containerVehicle,
                        OrderType.warehouseVehicle,
                    ],
                },
                {
                    label: t("ShippingOrderPreview:properties.totalWithoutVAT"),
                    name: "totalRequestedServicePrice",
                    type: FieldItemType.INPUT,
                    value: data.totalRequestedServicePrice,
                    readOnly: true,
                    orderPermissionList: [
                        OrderType.containerRailway,
                        OrderType.containerVehicle,
                        OrderType.warehouseVehicle,
                    ],
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
                    orderPermissionList: [
                        OrderType.containerRailway,
                        OrderType.containerVehicle,
                        OrderType.warehouseVehicle,
                    ],
                },
            ],
        },
    ];

    const resultFieldGroupList: FieldGroup[] = [];

    fieldGroupList.forEach((fieldGroup) => {
        const newFieldGroup: FieldGroup = {
            name: fieldGroup.name,
            fields: [],
        };

        fieldGroup.fields.forEach((field) => {
            if (field.orderPermissionList.includes(orderType)) {
                newFieldGroup.fields.push(field);
            }
        });

        if (newFieldGroup.fields.length) {
            resultFieldGroupList.push(newFieldGroup);
        }
    });

    const getCargoFieldsCalbackList = {
        [OrderType.warehouseVehicle]: getWareHouseVehicleCargoFields,
        [OrderType.containerVehicle]: getContainerVehicleCargoFields,
        [OrderType.containerRailway]: () => [],
    };
    const CargoFields = getCargoFieldsCalbackList[orderType]({ data, tableComponent });

    CargoFields.length &&
        resultFieldGroupList.push({
            name: t("ShippingOrderPreview:groups.cargoParams"),
            fields: CargoFields,
        });

    return resultFieldGroupList;
};
