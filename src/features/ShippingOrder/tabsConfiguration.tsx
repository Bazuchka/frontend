import { t } from "i18next";
import { ShippingOrderPrint } from "src/features/ShippingOrder/UI/ShippingOrderPrint";
import shippingOrderStore from "src/features/ShippingOrder/store/ShippingOrderStore";
import { TabsConfiguration, TabType } from "src/shared/UI/BaseTabs/types";
import DataGuard from "src/shared/UI/DataGuard/DataGuard";
import { PermissionType } from "src/shared/services/PermissionService/types";
import { ShippingOrderCargoTable } from "./UI/ShippingOrderCargoTable";
import { ShippingOrderContainerItemTable } from "./UI/ShippingOrderContainerItemTable";
import { ShippingOrderContainerTable } from "./UI/ShippingOrderContainerTable";
import { ShippingOrderEtranInvoiceTable } from "./UI/ShippingOrderEtranInvoice";
import { ShippingOrderGoodTable } from "./UI/ShippingOrderGoodTable";
import { ShippingOrderInfo } from "./UI/ShippingOrderInfo";
import { ShippingOrderPreview } from "./UI/ShippingOrderPreview";
import { ShippingOrderRailwayCarriageTable } from "./UI/ShippingOrderRailwayCarriage";
import ShippingOrderRequestedServiceTable from "./UI/ShippingOrderRequestedServiceTable/ShippingOrderRequestedServiceTable";
import ShippingOrderTransport from "./UI/ShippingOrderTransport/ShippingOrderTransport";
import { IShippingOrder } from "./store/ShippingOrderStore/ShippingOrderStore";

const isRailwayContainer = (current?: IShippingOrder | null) => {
    return current?.transportType === "RAILWAY" && current?.terminalArea === "CONTAINER";
};

export const shippingOrderConfiguration: (isCreateMode: boolean) => TabsConfiguration = (
    isCreateMode: boolean
) => ({
    items: [
        {
            label: t("Shared:commonInfo"),
            type: TabType.MAIN_INFO,
            component: (
                <DataGuard whenExist={isCreateMode || shippingOrderStore.current}>
                    {() => (
                        <ShippingOrderInfo
                            isReadOnly={
                                !isCreateMode && shippingOrderStore.current?.orderStatus !== "DRAFT"
                            }
                        />
                    )}
                </DataGuard>
            ),
        },
        {
            label: t("ShippingOrder:tabs.etranInvoice"),
            type: TabType.LINKED_DATA,
            component: (
                <DataGuard whenExist={shippingOrderStore.current}>
                    {() => (
                        <ShippingOrderEtranInvoiceTable
                            store={shippingOrderStore.current!.shippingOrderEtranInvoice}
                            isReadOnly={shippingOrderStore.current!.orderStatus !== "DRAFT"}
                        />
                    )}
                </DataGuard>
            ),
            disabled: isCreateMode,
            visibleRule: () => isRailwayContainer(shippingOrderStore.current),
            permission: {
                path: "ShippingOrder.EtranInvoice",
                type: PermissionType.FORM,
            },
        },
        {
            label: t("ShippingOrder:tabs.railwayCarriage"),
            type: TabType.LINKED_DATA,
            component: (
                <DataGuard whenExist={shippingOrderStore.current}>
                    {() => (
                        <ShippingOrderRailwayCarriageTable
                            store={shippingOrderStore.current!.shippingOrderRailwayCarriage}
                            isReadOnly={shippingOrderStore.current!.orderStatus !== "DRAFT"}
                        />
                    )}
                </DataGuard>
            ),
            disabled: isCreateMode,
            visibleRule: () => isRailwayContainer(shippingOrderStore.current),
            permission: {
                path: "ShippingOrder.RailwayCarriage",
                type: PermissionType.FORM,
            },
        },
        {
            label: t("ShippingOrder:tabs.transport"),
            type: TabType.LINKED_DATA,
            component: (
                <DataGuard
                    whenExist={
                        shippingOrderStore.current &&
                        shippingOrderStore.current.shippingOrderTransport.state.isInitialized
                    }>
                    {() => (
                        <ShippingOrderTransport
                            store={shippingOrderStore.current!.shippingOrderTransport}
                            shippingOrderId={shippingOrderStore.current!.id}
                            client={shippingOrderStore.current!.client}
                            isReadOnly={shippingOrderStore.current!.orderStatus !== "DRAFT"}
                        />
                    )}
                </DataGuard>
            ),
            disabled: isCreateMode,
            visibleRule: () => shippingOrderStore.current?.transportType === "VEHICLE",
            permission: {
                path: "ShippingOrder.ShippingOrderTransport",
                type: PermissionType.FORM,
            },
        },
        {
            label: t("ShippingOrder:tabs.containers"),
            type: TabType.LINKED_DATA,
            component: (
                <DataGuard whenExist={shippingOrderStore.current}>
                    {(current) => (
                        <ShippingOrderContainerTable
                            clientId={current.client?.id}
                            store={
                                isRailwayContainer(current)
                                    ? current.shippingOrderRailwayContainer
                                    : current.shippingOrderContainer
                            }
                            shippingOrderId={current.id}
                            isReadOnly={current.orderStatus !== "DRAFT"}
                        />
                    )}
                </DataGuard>
            ),
            disabled: isCreateMode,
            visibleRule: () => shippingOrderStore.current?.terminalArea === "CONTAINER",
            permission: {
                path: "ShippingOrder.ShippingOrderContainer",
                type: PermissionType.FORM,
            },
        },
        {
            label: t("ShippingOrder:tabs.goods"),
            type: TabType.LINKED_DATA,
            component: (
                <DataGuard whenExist={shippingOrderStore.current}>
                    {(current) => (
                        <ShippingOrderContainerItemTable
                            store={current.shippingOrderContainerItem}
                            shippingOrderId={shippingOrderStore.current!.id}
                            isReadOnly={shippingOrderStore.current!.orderStatus !== "DRAFT"}
                        />
                    )}
                </DataGuard>
            ),
            visibleRule: () => shippingOrderStore.current?.terminalArea === "CONTAINER",
            disabled: isCreateMode,
            permission: {
                path: "ShippingOrder.ShippingOrderContainerItem",
                type: PermissionType.FORM,
            },
        },
        {
            label: t("ShippingOrder:tabs.goods"),
            type: TabType.LINKED_DATA,
            component: (
                <DataGuard whenExist={shippingOrderStore.current}>
                    {(current) => (
                        <ShippingOrderGoodTable
                            store={current.shippingOrderGood}
                            isReadOnly={shippingOrderStore.current!.orderStatus !== "DRAFT"}
                            client={current.client}
                        />
                    )}
                </DataGuard>
            ),
            visibleRule: () => shippingOrderStore.current?.terminalArea === "WAREHOUSE",
            disabled: isCreateMode,
            permission: {
                path: "ShippingOrder.ShippingOrderGood",
                type: PermissionType.FORM,
            },
        },
        {
            label: t("ShippingOrder:tabs.cargoSpaces"),
            type: TabType.LINKED_DATA,
            component: (
                <DataGuard whenExist={shippingOrderStore.current}>
                    {() => (
                        <ShippingOrderCargoTable
                            store={shippingOrderStore.current!.shippingOrderCargo}
                            isReadOnly={shippingOrderStore.current!.orderStatus !== "DRAFT"}
                        />
                    )}
                </DataGuard>
            ),
            disabled: isCreateMode,
            visibleRule: () =>
                shippingOrderStore.current?.terminalArea !== "CONTAINER" &&
                shippingOrderStore.current?.transportType === "VEHICLE",
            permission: {
                path: "ShippingOrder.ShippingOrderCargo",
                type: PermissionType.FORM,
            },
        },
        {
            label: t("ShippingOrder:tabs.operations"),
            type: TabType.LINKED_DATA,
            component: (
                <DataGuard whenExist={shippingOrderStore.current}>
                    {() => (
                        <ShippingOrderRequestedServiceTable
                            store={shippingOrderStore.current!.shippingOrderRequestedService}
                            client={shippingOrderStore.current!.client}
                            shippingOrderId={shippingOrderStore.current!.id}
                            isReadOnly={shippingOrderStore.current!.orderStatus !== "DRAFT"}
                        />
                    )}
                </DataGuard>
            ),
            disabled: isCreateMode,
            permission: {
                path: "ShippingOrder.ShippingOrderRequestedService",
                type: PermissionType.FORM,
            },
        },
        {
            label: t("ShippingOrder:tabs.presentation"),
            type: TabType.LINKED_DATA,
            component: (
                <DataGuard whenExist={shippingOrderStore.current}>
                    {(current) => (
                        <ShippingOrderPreview
                            preview={current.shippingOrderPreview}
                            isDraft={current.orderStatus === "DRAFT"}
                            showContainerInfo={current.terminalArea === "CONTAINER"}
                        />
                    )}
                </DataGuard>
            ),
            disabled: isCreateMode,
        },
        {
            label: t("ShippingOrder:tabs.documentPrint"),
            type: TabType.LINKED_DATA,
            component: (
                <DataGuard whenExist={shippingOrderStore.current}>
                    {() => (
                        <ShippingOrderPrint
                            store={shippingOrderStore}
                            isWarehouse={shippingOrderStore.current?.terminalArea === "WAREHOUSE"}
                            isVehicle={shippingOrderStore.current?.transportType === "VEHICLE"}
                        />
                    )}
                </DataGuard>
            ),
            disabled:
                !shippingOrderStore.current || shippingOrderStore.current!.orderStatus !== "DONE",
            permission: {
                path: "ShippingOrder.Report",
                type: PermissionType.FORM,
            },
        },
    ],
});
