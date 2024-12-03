import { observer } from "mobx-react";
import { FunctionComponent, useEffect, useMemo } from "react";
import { useReactTable } from "@tanstack/react-table";
import { PaginationProps } from "src/shared/UI/TSBaseTable/UI/Pagination";
import { DEFAULT_TANSTACK_CONFIG } from "src/shared/configs/table.conf";
import { TSBaseTableUI } from "src/shared/UI/TSBaseTable/TSBaseTableUI";
import { Footer } from "src/shared/UI/TSBaseTable/UI/Footer";
import { Instance } from "mobx-state-tree";
import { ICard } from "src/shared/UI/iCard";
import { containerMovement } from "../store";
import { getColumns } from "./congig";

interface IContainerMovementTableProps {
    store: Instance<typeof containerMovement>;
}

const ContainerMovementTable: FunctionComponent<IContainerMovementTableProps> = observer(
    ({ store }) => {
        const columns = useMemo(() => getColumns(), []);

        useEffect(() => {
            store?.fetch();
        }, [store]);

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
            <ICard cardSize={12} col={10}>
                <TSBaseTableUI
                    table={table}
                    sorting={store.sorting}
                    isLoading={store.state.isLoading}
                    footer={() => <Footer paginator={pagination} />}
                />
            </ICard>
        );
    }
);

export default ContainerMovementTable;
