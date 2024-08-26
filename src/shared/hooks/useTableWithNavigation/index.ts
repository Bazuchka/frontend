import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef, RowSelectionState, useReactTable } from "@tanstack/react-table";
import { Instance } from "mobx-state-tree";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PaginationProps } from "src/shared/UI/TSBaseTable/UI/Pagination";
import { DEFAULT_TANSTACK_CONFIG } from "src/shared/configs/table.conf";
import { createBaseStore } from "src/shared/entities/BaseStore";

export interface IUseTableWithNavigationParams {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getColumns: () => ColumnDef<{ id: GridRowId }, any>[];
    store: Instance<ReturnType<typeof createBaseStore>>;
    navigationPaths: {
        create?: string;
        info: string;
    };
    isLoading?: boolean;
    fetchParams?: Record<string, unknown>;
}

export const useTableWithNavigation = ({
    getColumns,
    store,
    navigationPaths,
    isLoading,
    fetchParams,
}: IUseTableWithNavigationParams) => {
    const columns = useMemo(() => getColumns(), [getColumns]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const navigate = useNavigate();
    useEffect(() => {
        store.fetch(fetchParams).finally(() => {
            if (store.current?.id) {
                setRowSelection({
                    [store.current.id]: true,
                });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store]);

    const memorizedData = useMemo(() => {
        return Array.from(store.data.values());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    const pagination: PaginationProps = {
        page: store.filters.page,
        size: store.filters.size,
        totalElements: store.filters.total,
        disabled: store.state.isLoading,
        onChange: store.filters.setUserPagination,
    };

    const table = useReactTable({
        ...DEFAULT_TANSTACK_CONFIG,
        columns,
        data: memorizedData,
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    });

    const handleRowClick = (id: GridRowId) => () => {
        if (rowSelection[id]) {
            delete rowSelection[id];
            setRowSelection({ ...rowSelection });
        } else {
            setRowSelection({
                [id]: true,
            });
        }
    };

    const handleCreateClick = () => {
        setRowSelection({});
        navigate(navigationPaths?.create ?? "/");
    };

    const handleOpenClick = () => {
        navigate(`${navigationPaths.info}/${Object.keys(rowSelection)[0]}`);
    };

    const handleDoubleClick = (id: GridRowId) => () => {
        navigate(`${navigationPaths.info}/${id}`);
    };

    const isRowSelected = useMemo(() => {
        return Object.keys(rowSelection).length > 0;
    }, [rowSelection]);

    useEffect(() => {
        setRowSelection({});
    }, [pagination.page, pagination.size]);

    return {
        table,
        handleRowClick,
        handleCreateClick,
        handleOpenClick,
        handleDoubleClick,
        isRowSelected,
        pagination,
        isLoading: store.state.isLoading,
    };
};
