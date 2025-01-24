import { t } from "i18next";
import { ReceivingOrderPrint } from "src/features/ReceivingOrder/UI/ReceivingOrderPrint";
import { PermissionType } from "src/shared/services/PermissionService/types";
import { TabsConfiguration, TabType } from "src/shared/UI/BaseTabs/types";
import DataGuard from "src/shared/UI/DataGuard/DataGuard";
import receivingOrderStore from "./store/ReceivingOrderStore";
import { IReceivingOrder } from "./store/ReceivingOrderStore/ReceivingOrderStore";
import { ReceivingOrderCargoTable } from "./UI/ReceivingOrderCargoTable";
import { ReceivingOrderContainerItemTable } from "./UI/ReceivingOrderContainerItemTable";
import ReceivingOrderContainerTable from "./UI/ReceivingOrderContainerTable/ReceivingOrderContainerTable";
import { ReceivingOrderEtranInvoiceTable } from "./UI/ReceivingOrderEtranInvoice";
import { ReceivingOrderGoodTable } from "./UI/ReceivingOrderGoodTable";
import { ReceivingOrderInfo } from "./UI/ReceivingOrderInfo";
import { ReceivingOrderPreview } from "./UI/ReceivingOrderPreview";
import { ReceivingOrderRailwayCarriageTable } from "./UI/ReceivingOrderRailwayCarriage";
import ReceivingOrderRequestedServiceTable from "./UI/ReceivingOrderRequestedServiceTable/ReceivingOrderRequestedServiceTable";
import { ReceivingOrderTransport } from "./UI/ReceivingOrderTransport";
import { getOrderType } from "src/shared/helpers/order";

const isRailwayContainer = (current?: IReceivingOrder | null) => {
    return current?.transportType === "RAILWAY" && current?.terminalArea === "CONTAINER";
};

export const receivingOrderConfiguration: (isCreateMode: boolean) => TabsConfiguration = (
    isCreateMode: boolean
) => ({
    items: [
        {
            label: t("Shared:commonInfo"),
            type: TabType.MAIN_INFO,
            component: (
                <DataGuard whenExist={isCreateMode || receivingOrderStore.current}>
                    {() => (
                        <ReceivingOrderInfo
                            isReadOnly={
                                !isCreateMode &&
                                receivingOrderStore.current?.orderStatus !== "DRAFT"
                            }
                        />
                    )}
                </DataGuard>
            ),
        },
        {
            label: t("ReceivingOrder:tabs.etranInvoice"),
            type: TabType.LINKED_DATA,
            component: (
                <DataGuard whenExist={receivingOrderStore.current}>
                    {(current) => (
                        <ReceivingOrderEtranInvoiceTable
                            store={current.receivingOrderEtranInvoice}
                            isReadOnly={current.orderStatus !== "DRAFT"}
                        />
                    )}
                </DataGuard>
            ),
            disabled: isCreateMode,
            visibleRule: () => isRailwayContainer(receivingOrderStore.current),
            permission: {
                path: "ReceivingOrder.EtranInvoice",
                type: PermissionType.FORM,
            },
        },
        {
            label: t("ReceivingOrder:tabs.railwayCarriage"),
            type: TabType.LINKED_DATA,
            component: (
                <DataGuard whenExist={receivingOrderStore.current}>
                    {() => (
                        <ReceivingOrderRailwayCarriageTable
                            store={receivingOrderStore.current!.receivingOrderRailwayCarriage}
                            isReadOnly={receivingOrderStore.current!.orderStatus !== "DRAFT"}
                        />
                    )}
                </DataGuard>
            ),
            disabled: isCreateMode,
            visibleRule: () => isRailwayContainer(receivingOrderStore.current),
            permission: {
                path: "ReceivingOrder.RailwayCarriage",
                type: PermissionType.FORM,
            },
        },
        {
            label: t("ReceivingOrder:tabs.transport"),
            type: TabType.LINKED_DATA,
            component: (
                <DataGuard
                    whenExist={
                        receivingOrderStore.current &&
                        receivingOrderStore.current.receivingOrderTransport.state.isInitialized
                    }>
                    {() => (
                        <ReceivingOrderTransport
                            store={receivingOrderStore.current!.receivingOrderTransport}
                            receivingOrderId={receivingOrderStore.current!.id}
                            client={receivingOrderStore.current!.client}
                            isReadOnly={receivingOrderStore.current!.orderStatus !== "DRAFT"}
                        />
                    )}
                </DataGuard>
            ),
            disabled: isCreateMode,
            visibleRule: () => receivingOrderStore.current?.transportType === "VEHICLE",
            permission: {
                path: "ReceivingOrder.ReceivingOrderTransport",
                type: PermissionType.FORM,
            },
        },
        {
            label: t("ReceivingOrder:tabs.containers"),
            type: TabType.LINKED_DATA,
            component: (
                <DataGuard whenExist={receivingOrderStore.current}>
                    {(current) => (
                        <ReceivingOrderContainerTable
                            clientId={current.client?.id}
                            receivingOrderId={current.id}
                            store={
                                isRailwayContainer(current)
                                    ? current.receivingOrderRailwayContainer
                                    : current.receivingOrderContainer
                            }
                            isReadOnly={current.orderStatus !== "DRAFT"}
                        />
                    )}
                </DataGuard>
            ),
            disabled: isCreateMode,
            visibleRule: () => receivingOrderStore.current?.terminalArea === "CONTAINER",
            permission: {
                path: "ReceivingOrder.ReceivingOrderContainer",
                type: PermissionType.FORM,
            },
        },
        {
            label: t("ReceivingOrder:tabs.goods"),
            type: TabType.LINKED_DATA,
            component: (
                <DataGuard whenExist={receivingOrderStore.current}>
                    {(current) => (
                        <ReceivingOrderContainerItemTable
                            store={current.receivingOrderContainerItem}
                            receivingOrderId={receivingOrderStore.current!.id}
                            isReadOnly={receivingOrderStore.current!.orderStatus !== "DRAFT"}
                        />
                    )}
                </DataGuard>
            ),
            disabled: isCreateMode,
            visibleRule: () => receivingOrderStore.current?.terminalArea === "CONTAINER",
            permission: {
                path: "ReceivingOrder.ReceivingOrderContainerItem",
                type: PermissionType.FORM,
            },
        },
        {
            label: t("ReceivingOrder:tabs.goods"),
            type: TabType.LINKED_DATA,
            component: (
                <DataGuard whenExist={receivingOrderStore.current}>
                    {(current) => (
                        <ReceivingOrderGoodTable
                            store={current.receivingOrderGood}
                            isReadOnly={receivingOrderStore.current!.orderStatus !== "DRAFT"}
                            client={current.client}
                        />
                    )}
                </DataGuard>
            ),
            disabled: isCreateMode,
            visibleRule: () => receivingOrderStore.current?.terminalArea === "WAREHOUSE",
            permission: {
                path: "ReceivingOrder.ReceivingOrderGood",
                type: PermissionType.FORM,
            },
        },
        {
            label: t("ReceivingOrder:tabs.cargoSpaces"),
            type: TabType.LINKED_DATA,
            component: (
                <DataGuard whenExist={receivingOrderStore.current}>
                    {() => (
                        <ReceivingOrderCargoTable
                            store={receivingOrderStore.current!.receivingOrderCargo}
                            isReadOnly={receivingOrderStore.current!.orderStatus !== "DRAFT"}
                        />
                    )}
                </DataGuard>
            ),
            disabled: isCreateMode,
            visibleRule: () =>
                receivingOrderStore.current?.terminalArea !== "CONTAINER" &&
                receivingOrderStore.current?.transportType === "VEHICLE",
            permission: {
                path: "ReceivingOrder.ReceivingOrderCargo",
                type: PermissionType.FORM,
            },
        },
        {
            label: t("ReceivingOrder:tabs.operations"),
            type: TabType.LINKED_DATA,
            component: (
                <DataGuard whenExist={receivingOrderStore.current}>
                    {() => (
                        <ReceivingOrderRequestedServiceTable
                            store={receivingOrderStore.current!.receivingOrderRequestedService}
                            receivingOrderId={receivingOrderStore.current!.id}
                            isReadOnly={receivingOrderStore.current!.orderStatus !== "DRAFT"}
                        />
                    )}
                </DataGuard>
            ),
            disabled: isCreateMode,
            permission: {
                path: "ReceivingOrder.ReceivingOrderRequestedService",
                type: PermissionType.FORM,
            },
        },
        {
            label: t("ReceivingOrder:tabs.presentation"),
            type: TabType.LINKED_DATA,
            component: (
                <DataGuard whenExist={receivingOrderStore.current}>
                    {(current) => (
                        <ReceivingOrderPreview
                            preview={current.receivingOrderPreview}
                            isDraft={current.orderStatus === "DRAFT"}
                            orderType={getOrderType({
                                terminalArea: current.terminalArea,
                                transportType: current.transportType,
                            })}
                        />
                    )}
                </DataGuard>
            ),
            disabled: isCreateMode,
        },
        {
            label: t("ReceivingOrder:tabs.documentPrint"),
            type: TabType.LINKED_DATA,
            component: (
                <DataGuard whenExist={receivingOrderStore.current}>
                    {() => (
                        <ReceivingOrderPrint
                            store={receivingOrderStore}
                            isWarehouse={receivingOrderStore.current?.terminalArea === "WAREHOUSE"}
                        />
                    )}
                </DataGuard>
            ),
            disabled:
                !receivingOrderStore.current || receivingOrderStore.current!.orderStatus !== "DONE",
            permission: {
                path: "ReceivingOrder.Report",
                type: PermissionType.FORM,
            },
        },
    ],
});
