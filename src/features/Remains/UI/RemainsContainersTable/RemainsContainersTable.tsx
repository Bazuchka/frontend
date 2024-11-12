import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FunctionComponent, useEffect, useMemo } from "react";
import { remainsContainersStore } from "../../store";
import { TSBaseTableUI } from "src/shared/UI/TSBaseTable/TSBaseTableUI";
import { Footer } from "src/shared/UI/TSBaseTable/UI/Footer";
import { PaginationProps } from "src/shared/UI/TSBaseTable/UI/Pagination";
import { DEFAULT_TANSTACK_CONFIG } from "src/shared/configs/table.conf";
import { useReactTable } from "@tanstack/react-table";
import { ICard } from "src/shared/UI/iCard";
import { getColumns } from "./config";

interface RemainsContainersTableProps {
    store: Instance<typeof remainsContainersStore>;
}

const RemainsContainersTable: FunctionComponent<RemainsContainersTableProps> = observer(
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

export default RemainsContainersTable;
