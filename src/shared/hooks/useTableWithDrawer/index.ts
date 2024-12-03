import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef, RowSelectionState, useReactTable } from "@tanstack/react-table";
import { Instance } from "mobx-state-tree";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ShowPromptHandle } from "src/shared/UI/DialogPrompt";
import { PaginationProps } from "src/shared/UI/TSBaseTable/UI/Pagination";
import { DEFAULT_TANSTACK_CONFIG } from "src/shared/configs/table.conf";
import { createBaseStore } from "src/shared/entities/BaseStore";
import { DIALOG_ACTION } from "src/shared/enums/enums";

export interface IUseTableWithDrawerParams {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getColumns: () => ColumnDef<{ id: GridRowId }, any>[];
    store: Instance<ReturnType<typeof createBaseStore>>;
    fetchParams?: Record<string, unknown>;
}

export const useTableWithDrawer = ({
    getColumns,
    store,
    fetchParams,
}: IUseTableWithDrawerParams) => {
    const columns = useMemo(() => getColumns(), [getColumns]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [drawerShowed, setDrawerShowed] = useState<boolean>(false);
    const editPromptModalRef = useRef<ShowPromptHandle>(null);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        store.fetch(fetchParams);
    }, [store, fetchParams]);

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
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    });

    const handleRowClick = useCallback(
        (id: GridRowId) => () => {
            if (drawerShowed) {
                return;
            }

            if (rowSelection[id]) {
                delete rowSelection[id];
                setRowSelection({ ...rowSelection });
            } else {
                setRowSelection({
                    [id]: true,
                });
            }
        },
        [drawerShowed, rowSelection]
    );

    const handleCreateClick = useCallback(() => {
        setRowSelection({});
        setDrawerShowed(true);
    }, []);

    const handleOpenClick = useCallback(() => {
        setDrawerShowed(true);
    }, []);

    const handleFormStateChange = useCallback((isDirty: boolean) => {
        setIsDirty(isDirty);
    }, []);

    const handleDoubleClick = useCallback(
        (id: GridRowId) => () => {
            setRowSelection({
                [id]: true,
            });
            setDrawerShowed(true);
        },
        []
    );

    const handleCancelEditing = useCallback(() => {
        setDrawerShowed(false);
    }, []);

    const handleClose = useCallback(
        (submited: boolean = false) => {
            if (!isDirty || submited) {
                setDrawerShowed(false);
                submited && store.fetch(fetchParams);
            } else {
                editPromptModalRef.current?.show(DIALOG_ACTION.EDIT_CANCEL);
            }
        },
        [isDirty, store, fetchParams]
    );

    useEffect(() => {
        setRowSelection({});
    }, [pagination.page, pagination.size]);

    const isRowSelected = useMemo(() => {
        return Object.keys(rowSelection).length > 0;
    }, [rowSelection]);

    const selectedRowId = useMemo(() => {
        return Object.keys(rowSelection)[0];
    }, [rowSelection]);

    return {
        table,
        handleClose,
        handleFormStateChange,
        handleRowClick,
        handleCreateClick,
        handleOpenClick,
        handleDoubleClick,
        isRowSelected,
        pagination,
        drawerShowed,
        setDrawerShowed,
        handleCancelEditing,
        editPromptModalRef,
        selectedRowId,
        sorting: store.sorting,
    };
};
