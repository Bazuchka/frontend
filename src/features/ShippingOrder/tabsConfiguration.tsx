import { t } from "i18next";
import shippingOrderStore from "src/features/ShippingOrder/store/ShippingOrderStore";
import { TabsConfiguration, TabType } from "src/shared/UI/BaseTabs/types";
import DataGuard from "src/shared/UI/DataGuard/DataGuard";
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
                    {() => <ShippingOrderInfo />}
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
        },
        {
            label: t("ShippingOrder:tabs.goods"),
            type: TabType.LINKED_DATA,
            component: (
                <DataGuard whenExist={shippingOrderStore.current}>
                    {(current) =>
                        current.terminalArea === "CONTAINER" ? (
                            <ShippingOrderContainerItemTable
                                store={current.shippingOrderContainerItem}
                                shippingOrderId={shippingOrderStore.current!.id}
                                isReadOnly={shippingOrderStore.current!.orderStatus !== "DRAFT"}
                            />
                        ) : (
                            <ShippingOrderGoodTable
                                store={current.shippingOrderGood}
                                isReadOnly={shippingOrderStore.current!.orderStatus !== "DRAFT"}
                            />
                        )
                    }
                </DataGuard>
            ),
            disabled: isCreateMode,
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
    ],
});
