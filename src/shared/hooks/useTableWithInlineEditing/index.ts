import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef, RowSelectionState, useReactTable } from "@tanstack/react-table";
import { Instance } from "mobx-state-tree";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import { useBeforeUnload, useSearchParams } from "react-router-dom";
import { viewStore } from "src/app/store";
import { ShowPromptHandle } from "src/shared/UI/DialogPrompt";
import { PaginationProps } from "src/shared/UI/TSBaseTable/UI/Pagination";
import { DEFAULT_TANSTACK_CONFIG } from "src/shared/configs/table.conf";
import { createBaseStore } from "src/shared/entities/BaseStore";
import { DIALOG_ACTION } from "src/shared/enums/enums";
import { v4 as uuidv4 } from "uuid";

export interface IUseTableWithInlineEditingParams {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getColumns: (disabledFieldsOnUpdate?: string[]) => ColumnDef<{ id: GridRowId }, any>[];
    store: Instance<ReturnType<typeof createBaseStore>>;
    messages: {
        createSuccess: string;
        editSuccess: string;
        deleteSuccess?: string;
    };
    onBeforeCreateModelTransform?: (formModel: FieldValues) => { [key: string]: unknown };
    onBeforeUpdateModelTransform?: (formModel: FieldValues) => { [key: string]: unknown };
    onRowSelected?: (id: GridRowId) => void;
    fetchParams?: Record<string, unknown>;
    disabledFieldsOnUpdate?: string[];
}

export const useTableWithInlineEditing = ({
    getColumns,
    store,
    messages,
    onBeforeCreateModelTransform,
    onBeforeUpdateModelTransform,
    onRowSelected,
    fetchParams,
    disabledFieldsOnUpdate,
}: IUseTableWithInlineEditingParams) => {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [navigateNextTab, setNavigateNextTab] = useState<boolean>(false);
    const [, setSearchParams] = useSearchParams();
    const [editableRowState, setEditableRowState] = useState<{
        isValid: boolean;
        isDirty: boolean;
    }>({
        isValid: false,
        isDirty: false,
    });

    const isRowSelected = useMemo(() => {
        return Object.keys(rowSelection).length > 0;
    }, [rowSelection]);

    const columns = useMemo(
        () => getColumns(isRowSelected && isEditMode ? disabledFieldsOnUpdate : []),
        [disabledFieldsOnUpdate, getColumns, isEditMode, isRowSelected]
    );

    const editPromptModalRef = useRef<ShowPromptHandle>(null);
    const deletePromptModalRef = useRef<ShowPromptHandle>(null);

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
        data: store.dataArray,
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    });

    const handleRowClick = (id: GridRowId) => () => {
        if (isEditMode) {
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

        if (onRowSelected) {
            onRowSelected(id);
        }
    };

    const handleCreateClick = () => {
        setRowSelection({});
        setIsEditMode(true);
    };

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleCancelClick = () => {
        if (!editableRowState.isDirty) {
            setIsEditMode(false);
            return;
        }
        editPromptModalRef.current?.show(DIALOG_ACTION.EDIT_CANCEL);
    };

    const handleDeleteClick = useMemo(() => {
        if (!messages.deleteSuccess) {
            return undefined;
        }

        return () => deletePromptModalRef.current?.show(DIALOG_ACTION.DELETE);
    }, [messages.deleteSuccess]);

    const handleEditableRowStateChange = useCallback(
        (formState: { errors: FieldErrors; isValid: boolean; isDirty: boolean }) => {
            setEditableRowState(formState);
        },
        []
    );

    const handleCreate = useCallback(
        async (model: FieldValues) => {
            await store.create({
                ...model,
                ...onBeforeCreateModelTransform?.(model),
                syncId: uuidv4(),
            });

            setIsEditMode(false);
            viewStore.addAlert({
                alertMode: "success",
                message: messages.createSuccess,
            });

            await store.fetch(fetchParams);

            if (navigateNextTab) {
                setSearchParams((prev) => ({
                    ...prev,
                    tab: prev.get("tab") ? parseInt(prev.get("tab")!, 10) + 1 : 1,
                }));
            }
        },
        [
            store,
            onBeforeCreateModelTransform,
            messages.createSuccess,
            fetchParams,
            navigateNextTab,
            setSearchParams,
        ]
    );

    const handleUpdate = useCallback(
        async (model: FieldValues) => {
            await store.update({
                ...model,
                ...onBeforeUpdateModelTransform?.(model),
                id: model.id,
            });
            await store.fetch(fetchParams);

            setIsEditMode(false);

            viewStore.addAlert({
                alertMode: "success",
                message: messages.editSuccess,
            });

            if (navigateNextTab) {
                setSearchParams((prev) => ({
                    ...prev,
                    tab: prev.get("tab") ? parseInt(prev.get("tab")!, 10) + 1 : 1,
                }));
            }
        },
        [
            fetchParams,
            messages.editSuccess,
            navigateNextTab,
            onBeforeUpdateModelTransform,
            setSearchParams,
            store,
        ]
    );

    const handleProceedCancelEditPrompt = useCallback(async () => {
        setIsEditMode(false);
    }, []);

    const handleProceedDeletePrompt = useCallback(async () => {
        const model = store.dataMap.get(Object.keys(rowSelection)[0]);
        await store.remove({ id: model.id });
        await store.fetch(fetchParams);

        viewStore.addAlert({
            alertMode: "success",
            message: messages.deleteSuccess,
        });
    }, [fetchParams, messages.deleteSuccess, rowSelection, store]);

    useEffect(() => {
        store.fetch(fetchParams);
    }, [fetchParams, store]);

    useEffect(() => {
        setRowSelection({});
    }, [pagination.page, pagination.size]);

    useBeforeUnload(
        (e) => {
            if (isEditMode && editableRowState.isDirty) {
                e.preventDefault();
            }
        },
        { capture: true }
    );

    return {
        table,
        handleRowClick,
        handleCreateClick,
        handleEditClick,
        handleCancelClick,
        handleDeleteClick,
        handleEditableRowStateChange,
        handleCreate,
        handleUpdate,
        handleProceedCancelEditPrompt,
        handleProceedDeletePrompt,
        isRowSelected,
        pagination,
        state: store.state,
        isEditMode,
        editPromptModalRef,
        deletePromptModalRef,
        editableRowState,
        setNavigateNextTab,
    };
};
