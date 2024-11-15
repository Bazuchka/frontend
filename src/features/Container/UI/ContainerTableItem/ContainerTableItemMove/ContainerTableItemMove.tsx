import { useReactTable } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent, useEffect, useMemo } from "react";

import { DEFAULT_TANSTACK_CONFIG } from "src/shared/configs/table.conf";
import { TSBaseTableUI } from "src/shared/UI/TSBaseTable/TSBaseTableUI";
import { getColumns } from "./config";
import { ContainerMovementStore } from "src/features/ContainerMovement";
import { Instance } from "mobx-state-tree";
import { Footer } from "src/shared/UI/TSBaseTable/UI/Footer";
import { PaginationProps } from "src/shared/UI/TSBaseTable/UI/Pagination";

interface IContainerTableItemMoveProps {
    store: Instance<typeof ContainerMovementStore>;
    containerId: string;
}

const ContainerTableItemMove: FunctionComponent<IContainerTableItemMoveProps> = observer(
    ({ store, containerId }) => {
        useEffect(() => {
            store.fetch({
                container: {
                    id: containerId,
                },
            });
        }, [containerId, store]);

        const columns = useMemo(() => getColumns(), []);

        const pagination: PaginationProps = {
            page: store.pagination.page,
            size: store.pagination.size,
            totalElements: store.pagination.total,
            disabled: store.state.isLoading,
            onChange: store.pagination.setUserPagination,
        };

        const table = useReactTable({
            ...DEFAULT_TANSTACK_CONFIG,
            columns,
            data: store.dataArray,
        });

        return (
            <TSBaseTableUI
                table={table}
                sorting={store.sorting}
                isLoading={store.state.isLoading}
                footer={() => <Footer paginator={pagination} />}
            />
        );
    }
);

export default ContainerTableItemMove;
