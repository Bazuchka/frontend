import { t } from "i18next";
import shippingOrderStore from "src/features/ShippingOrder/store/ShippingOrderStore";
import { TabsConfiguration, TabType } from "src/shared/UI/BaseTabs/types";
import DataGuard from "src/shared/UI/DataGuard/DataGuard";
import { ShippingOrderCargoTable } from "./UI/ShippingOrderCargoTable";
import ShippingOrderGoodTable from "./UI/ShippingOrderGoodTable/ShippingOrderGoodTable";
import { ShippingOrderInfo } from "./UI/ShippingOrderInfo";
import { ShippingOrderPreview } from "./UI/ShippingOrderPreview";
import ShippingOrderRequestedServiceTable from "./UI/ShippingOrderRequestedServiceTable/ShippingOrderRequestedServiceTable";
import ShippingOrderTransport from "./UI/ShippingOrderTransport/ShippingOrderTransport";

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
                        />
                    )}
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
                        />
                    )}
                </DataGuard>
            ),
            disabled: isCreateMode,
        },
    ],
});
