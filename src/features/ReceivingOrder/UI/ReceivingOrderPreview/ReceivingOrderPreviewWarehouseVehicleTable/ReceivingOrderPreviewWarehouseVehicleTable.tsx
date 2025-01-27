import { FunctionComponent, useEffect, useMemo } from "react";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { TSBaseTableUI } from "src/shared/UI/TSBaseTable/TSBaseTableUI";
import { getColumns } from "./config";
import { useReactTable } from "@tanstack/react-table";
import { DEFAULT_TANSTACK_CONFIG } from "src/shared/configs/table.conf";
import { Footer } from "src/shared/UI/TSBaseTable/UI/Footer";
import { PaginationProps } from "src/shared/UI/TSBaseTable/UI/Pagination";
import { receivingOrderPreviewCargoStore } from "src/features/ReceivingOrder/store/ReceivingOrderPreviewStore";

interface ReceivingOrderPreviewWarehouseVehicleTableProps {
    store: Instance<typeof receivingOrderPreviewCargoStore>;
    orderId: string | undefined;
}

export const ReceivingOrderPreviewWarehouseVehicleTable: FunctionComponent<ReceivingOrderPreviewWarehouseVehicleTableProps> =
    observer(({ store, orderId }) => {
        useEffect(() => {
            store.fetch(
                {
                    receivingOrder: {
                        id: orderId,
                    },
                },
                {
                    suffixUrl: "/preview",
                }
            );
        }, [orderId, store]);

        const columns = useMemo(() => getColumns(), []);

        const table = useReactTable({
            ...DEFAULT_TANSTACK_CONFIG,
            columns,
            data: store.dataArray,
        });

        const pagination: PaginationProps = {
            page: store.pagination.page,
            size: store.pagination.size,
            totalElements: store.pagination.total,
            disabled: store.state.isLoading,
            onChange: store.pagination.setUserPagination,
        };

        return (
            <TSBaseTableUI
                style={{ height: "auto" }}
                table={table}
                sorting={store.sorting}
                isLoading={store.state.isLoading}
                footer={() => <Footer paginator={pagination} />}
            />
        );
    });
