import { t } from "i18next";
import { TabsConfiguration, TabType } from "src/shared/UI/BaseTabs/types";
import DataGuard from "src/shared/UI/DataGuard/DataGuard";
import receivingOrderStore from "./store/ReceivingOrderStore";
import { ReceivingOrderCargoTable } from "./UI/ReceivingOrderCargoTable";
import { ReceivingOrderGoodTable } from "./UI/ReceivingOrderGoodTable";
import { ReceivingOrderInfo } from "./UI/ReceivingOrderInfo";
import { ReceivingOrderPreview } from "./UI/ReceivingOrderPreview";
import ReceivingOrderRequestedServiceTable from "./UI/ReceivingOrderRequestedServiceTable/ReceivingOrderRequestedServiceTable";
import { ReceivingOrderTransport } from "./UI/ReceivingOrderTransport";

export const receivingOrderConfiguration: (isCreateMode: boolean) => TabsConfiguration = (
    isCreateMode: boolean
) => ({
    items: [
        {
            label: t("Shared:commonInfo"),
            type: TabType.MAIN_INFO,
            component: (
                <DataGuard whenExist={isCreateMode || receivingOrderStore.current}>
                    {() => <ReceivingOrderInfo />}
                </DataGuard>
            ),
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
                        />
                    )}
                </DataGuard>
            ),
            disabled: isCreateMode,
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
                        />
                    )}
                </DataGuard>
            ),
            disabled: isCreateMode,
        },
    ],
});
