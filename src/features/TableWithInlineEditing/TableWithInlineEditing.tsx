import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { CSSProperties, useCallback } from "react";
import { FieldValues } from "react-hook-form";
import { DialogPrompt } from "src/shared/UI/DialogPrompt";
import { RouterPrompt } from "src/shared/UI/RouterPrompt/RouterPrompt";
import { TSBaseTableUI } from "src/shared/UI/TSBaseTable/TSBaseTableUI";
import { Footer } from "src/shared/UI/TSBaseTable/UI/Footer";
import InlinetEditButtons from "src/shared/UI/TSBaseTable/UI/InlineEditButtons";
import { createBaseStore } from "src/shared/entities/BaseStore";
import { useTableWithInlineEditing } from "src/shared/hooks/useTableWithInlineEditing";
import { BaseActionOptions } from "src/shared/request/types";

interface TableWithInlineEditingProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getColumns: (disabledFieldsOnUpdate?: string[]) => ColumnDef<{ id: GridRowId }, any>[];
    store: Instance<ReturnType<typeof createBaseStore>>;
    permissionPath: string;
    messages: {
        createSuccess?: string;
        editSuccess?: string;
        deleteSuccess?: string;
    };
    onBeforeCreateModelTransform?: (
        formModel: FieldValues,
        actionOptions?: BaseActionOptions
    ) => { [key: string]: unknown };
    onBeforeUpdateModelTransform?: (formModel: FieldValues) => { [key: string]: unknown };
    onRowSelected?: (id: GridRowId) => void;
    fetchParams?: Record<string, unknown>;
    actionOptions?: BaseActionOptions;
    style?: CSSProperties;
    footerSettings?: {
        label?: {
            create?: string;
        };
        useNextButton?: boolean;
    };
    isReadOnly?: boolean;
    disabledFieldsOnUpdate?: string[];
    expandable?: boolean;
    sortingData?: Record<string, string>;
}

const TableWithInlineEditing = ({
    permissionPath,
    style,
    footerSettings,
    isReadOnly,
    ...props
}: TableWithInlineEditingProps) => {
    const {
        table,
        handleRowClick,
        handleCreateClick,
        handleEditClick,
        handleCancelClick,
        handleDeleteClick,
        handleUpdate,
        handleCreate,
        handleNextClick,
        handleProceedCancelEditPrompt,
        handleProceedDeletePrompt,
        isRowSelected,
        pagination,
        state,
        isEditMode,
        handleEditableRowStateChange,
        editableRowState,
        editPromptModalRef,
        deletePromptModalRef,
        setNavigateNextTab,
        sorting,
    } = useTableWithInlineEditing(props);

    const footerComponent = useCallback(
        (onSubmit: () => void) => {
            const handleSave = (navigateNext?: boolean) => {
                setNavigateNextTab(navigateNext ?? false);
                setTimeout(() => {
                    // workaround to move form submission to the end of the event loop since
                    // submission is handled by react hook form sinchronously
                    onSubmit();
                });
            };
            return (
                <Footer
                    paginator={pagination}
                    buttons={(classes) =>
                        !isReadOnly && (
                            <InlinetEditButtons
                                className={classes.button}
                                onSave={handleSave}
                                onCreate={handleCreateClick}
                                onCancel={handleCancelClick}
                                onEdit={handleEditClick}
                                onDelete={handleDeleteClick}
                                onNext={handleNextClick}
                                tableState={state}
                                editableRowIsValid={editableRowState.isValid}
                                isEditMode={isEditMode}
                                isSaveAllowed={editableRowState.isDirty}
                                isRowSelected={isRowSelected}
                                permissionPath={permissionPath}
                                {...footerSettings}
                            />
                        )
                    }
                />
            );
        },
        [
            pagination,
            setNavigateNextTab,
            isReadOnly,
            handleCreateClick,
            handleCancelClick,
            handleEditClick,
            handleDeleteClick,
            handleNextClick,
            state,
            editableRowState.isValid,
            editableRowState.isDirty,
            isEditMode,
            isRowSelected,
            permissionPath,
            footerSettings,
        ]
    );

    return (
        <>
            <TSBaseTableUI
                table={table}
                isEditMode={!isReadOnly && isEditMode && isRowSelected}
                isCreateMode={isEditMode && !isRowSelected}
                onEditableRowStateChange={handleEditableRowStateChange}
                onRowClick={handleRowClick}
                isLoading={state.isLoading}
                onSubmit={isRowSelected ? handleUpdate : handleCreate}
                footer={footerComponent}
                style={style}
                sorting={sorting}
                sortingData={props.sortingData}
            />
            <RouterPrompt when={isEditMode && editableRowState.isDirty} />
            <DialogPrompt onProceed={handleProceedCancelEditPrompt} ref={editPromptModalRef} />
            <DialogPrompt onProceed={handleProceedDeletePrompt} ref={deletePromptModalRef} />
        </>
    );
};

export default observer(TableWithInlineEditing);
