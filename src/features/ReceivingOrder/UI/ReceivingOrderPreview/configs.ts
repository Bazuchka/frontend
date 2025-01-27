import { startOfDay } from "date-fns";
import { t } from "i18next";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { IReceivingOrderPreview } from "../../store/ReceivingOrderStore/models/ReceivingOrderPreview";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import { OrderType } from "src/shared/helpers/order";

type FieldsConfigurationProps = Omit<FieldGroudConfigurationProps, "orderType">;

interface FieldGroudConfigurationProps {
    data: NonNullable<IReceivingOrderPreview["model"]>;
    tableComponent: React.ReactElement;
    orderType: OrderType;
}

const getWareHouseVehicleCargoFields = ({ data, tableComponent }: FieldsConfigurationProps) => [
    {
        label: t("ReceivingOrderPreview:properties.goodsCount"),
        name: "totalSKUQuantity",
        type: FieldItemType.INPUT,
        value: data.totalSKUQuantity?.toString(),
        readOnly: true,
    },
    {
        label: t("ReceivingOrderPreview:cargoParams.totalNotPalletQuantity"),
        name: "totalNotPalletQuantity",
        type: FieldItemType.INPUT,
        value: data.totalNotPalletQuantity?.toString(),
        readOnly: true,
    },
    {
        label: t("ReceivingOrderPreview:properties.weight"),
        name: "weight",
        type: FieldItemType.INPUT,
        value: data.totalWeight?.toString(),
        readOnly: true,
    },
    {
        label: t("ReceivingOrderPreview:properties.total"),
        name: "total",
        type: FieldItemType.INPUT,
        value: data.totalGoodsPrice,
        readOnly: true,
    },
    {
        label: t("ReceivingOrderPreview:properties.cargoCount"),
        name: "cargoCount",
        type: FieldItemType.INPUT,
        value: data.totalCargoQuantity?.toString(),
        readOnly: true,
    },
    {
        label: t("ReceivingOrderPreview:properties.currency"),
        name: "currency",
        type: FieldItemType.INPUT,
        value: data.currency.code,
        readOnly: true,
    },
    {
        label: t("ReceivingOrderPreview:properties.palletQuantity"),
        name: "palletQuantity",
        type: FieldItemType.INPUT,
        value: data.totalPalletQuantity?.toString(),
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
        label: t("ReceivingOrderPreview:properties.containersQuantity"),
        name: "containersQuantity",
        type: FieldItemType.INPUT,
        value: data.totalContainerQuantity?.toString(),
        readOnly: true,
    },
    {
        label: t("ReceivingOrderPreview:properties.total"),
        name: "total",
        type: FieldItemType.INPUT,
        value: data.totalGoodsPrice,
        readOnly: true,
    },
    {
        label: t("ReceivingOrderPreview:properties.weight"),
        name: "weight",
        type: FieldItemType.INPUT,
        value: data.totalWeight?.toString(),
        readOnly: true,
    },
    {
        label: t("ReceivingOrderPreview:properties.currency"),
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

const getContainerRailwayCargoFields = ({ data, tableComponent }: FieldsConfigurationProps) => [
    {
        label: t("ReceivingOrderPreview:properties.containersQuantity"),
        name: "containersQuantity",
        type: FieldItemType.INPUT,
        value: data.totalContainerQuantity?.toString(),
        readOnly: true,
    },
    {
        label: t("ReceivingOrderPreview:properties.total"),
        name: "total",
        type: FieldItemType.INPUT,
        value: data.totalGoodsPrice,
        readOnly: true,
    },
    {
        label: t("ReceivingOrderPreview:properties.railwayCarriageQuantity"),
        name: "railwayCarriageQuantity",
        type: FieldItemType.INPUT,
        value: data.totalRailwayCarriageQuantity?.toString(),
        readOnly: true,
    },
    {
        label: t("ReceivingOrderPreview:properties.currency"),
        name: "currency",
        type: FieldItemType.INPUT,
        value: data.currency.code,
        readOnly: true,
    },
    {
        label: t("ReceivingOrderPreview:properties.weight"),
        name: "weight",
        type: FieldItemType.INPUT,
        value: data.totalWeight?.toString(),
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
                    label: t("ReceivingOrder:properties.number"),
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
                    label: t("ReceivingOrder:properties.contract"),
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
                    label: t("ReceivingOrder:properties.client"),
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
                    label: t("ReceivingOrder:properties.contractType"),
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
                    label: t("ReceivingOrder:properties.legalEntity"),
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
                    label: t("ReceivingOrder:properties.contractDate"),
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
                    label: t("ReceivingOrder:properties.legalEntityInn"),
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
            name: t("ReceivingOrder:groups.orderParams"),
            fields: [
                {
                    label: t("ReceivingOrder:properties.terminalAreaShort"),
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
                    label: t("ReceivingOrder:properties.planReceivingDateInfo"),
                    name: "planReceivingDate",
                    value: data.planReceivingDateTime
                        ? startOfDay(data.planReceivingDateTime)
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
                    label: t("ReceivingOrder:properties.transportType"),
                    value: data.transportType,
                    name: "transportType",
                    type: FieldItemType.ENUM_SELECT,
                    dictionaryType: DictionaryType.TRANSPORT_TYPE,
                    translatePath: "TransportType:types",
                    readOnly: true,
                    orderPermissionList: [
                        OrderType.containerRailway,
                        OrderType.containerVehicle,
                        OrderType.warehouseVehicle,
                    ],
                },
                {
                    label: t("ReceivingOrder:properties.planReceivingTimeInfo"),
                    name: "planReceivingTime",
                    type: FieldItemType.TIME,
                    value: data.planReceivingDateTime,
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
            name: t("ReceivingOrderPreview:groups.driverAndTransport"),
            fields: [
                {
                    label: t("ReceivingOrderPreview:driverAndTransport.driverName"),
                    type: FieldItemType.INPUT,
                    value: data?.clientDriver?.code ?? "-",
                    name: "driverName",
                    readOnly: true,
                    orderPermissionList: [OrderType.containerVehicle, OrderType.warehouseVehicle],
                },
                {
                    label: t("ReceivingOrderPreview:driverAndTransport.vehicleBrand"),
                    type: FieldItemType.INPUT,
                    value: data?.clientVehicle?.vehicleBrand.code ?? "-",
                    name: "vehicleBrand",
                    readOnly: true,
                    orderPermissionList: [OrderType.containerVehicle, OrderType.warehouseVehicle],
                },
                {
                    label: t("ReceivingOrderPreview:driverAndTransport.passportNumber"),
                    type: FieldItemType.INPUT,
                    value: data?.clientDriver?.passportNumber ?? "-",
                    name: "passportNumber",
                    readOnly: true,
                    orderPermissionList: [OrderType.containerVehicle, OrderType.warehouseVehicle],
                },
                {
                    label: t("ReceivingOrderPreview:driverAndTransport.vehicleNumber"),
                    type: FieldItemType.INPUT,
                    value: data?.clientVehicle?.code ?? "-",
                    name: "vehicleNumber",
                    readOnly: true,
                    orderPermissionList: [OrderType.containerVehicle, OrderType.warehouseVehicle],
                },
                {
                    label: t("ReceivingOrderPreview:driverAndTransport.drivingLicenseNumber"),
                    type: FieldItemType.INPUT,
                    value: data?.clientDriver?.drivingLicenseNumber ?? "-",
                    name: "drivingLicenseNumber",
                    readOnly: true,
                    orderPermissionList: [OrderType.containerVehicle, OrderType.warehouseVehicle],
                },
                {
                    label: t("ReceivingOrderPreview:driverAndTransport.trailerNumber"),
                    type: FieldItemType.INPUT,
                    value: data?.clientVehicle?.trailerNumber ?? "-",
                    name: "trailerNumber",
                    readOnly: true,
                    orderPermissionList: [OrderType.containerVehicle, OrderType.warehouseVehicle],
                },
                {
                    label: t("ReceivingOrderPreview:driverAndTransport.phoneNumber"),
                    type: FieldItemType.INPUT,
                    value: data?.clientDriver?.phoneNumber ?? "-",
                    name: "phoneNumber",
                    readOnly: true,
                    orderPermissionList: [OrderType.containerVehicle, OrderType.warehouseVehicle],
                },
            ],
        },
        {
            name: t("ReceivingOrderPreview:groups.services"),
            fields: [
                {
                    label: t("ReceivingOrderPreview:properties.servicesNumber"),
                    name: "servicesNumber",
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
                    label: t("ReceivingOrderPreview:properties.totalWithoutVAT"),
                    name: "totalWithoutVAT",
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
            name: t("ReceivingOrderPreview:groups.additional"),
            fields: [
                {
                    label: t("ReceivingOrderPreview:properties.comment"),
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
        [OrderType.containerRailway]: getContainerRailwayCargoFields,
    };
    const CargoFields = getCargoFieldsCalbackList[orderType]({ data, tableComponent });

    resultFieldGroupList.push({
        name: t("ReceivingOrderPreview:groups.cargoParams"),
        fields: CargoFields,
    });

    return resultFieldGroupList;
};
