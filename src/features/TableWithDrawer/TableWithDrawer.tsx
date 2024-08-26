import { Button } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { CSSProperties, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { createBaseStore } from "src/shared/entities/BaseStore";
import { useTableWithDrawer } from "src/shared/hooks/useTableWithDrawer";
import { WithPermission } from "src/shared/services/PermissionService";
import { PermissionType } from "src/shared/services/PermissionService/types";
import { PermissionLevel } from "src/shared/types";
import { DialogPrompt } from "src/shared/UI/DialogPrompt";
import { ICard } from "src/shared/UI/iCard";
import { IDrawer } from "src/shared/UI/IDrawer";
import { TSBaseTableUI } from "src/shared/UI/TSBaseTable/TSBaseTableUI";
import { Footer } from "src/shared/UI/TSBaseTable/UI/Footer";
import clientVehicleStore from "../ClientVehicle/store";

interface TableWithDrawerProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getColumns: () => ColumnDef<{ id: GridRowId }, any>[];
    store: Instance<ReturnType<typeof createBaseStore>>;
    permissionPath: string;
    withoutCard?: boolean;
    cssClasses?: string;
    tableStyle?: CSSProperties;
    fetchParams?: Record<string, unknown>;
    children(drawerParams: {
        onClose: (submitted?: boolean) => void;
        onFormStateChange: (isDirty: boolean) => void;
        id: string;
    }): React.ReactElement;
}

const TableWithDrawer: FunctionComponent<TableWithDrawerProps> = observer((props) => {
    const { t } = useTranslation();
    const {
        table,
        handleClose,
        handleFormStateChange,
        handleRowClick,
        handleCreateClick,
        handleOpenClick,
        handleDoubleClick,
        handleCancelEditing,
        isRowSelected,
        pagination,
        drawerShowed,
        editPromptModalRef,
        selectedRowId,
    } = useTableWithDrawer(props);

    const tableUI = (
        <TSBaseTableUI
            table={table}
            onRowClick={handleRowClick}
            onRowDoubleClick={handleDoubleClick}
            isLoading={clientVehicleStore.state.isLoading}
            style={props.tableStyle}
            footer={() => (
                <Footer
                    paginator={pagination}
                    buttons={(classes) => (
                        <WithPermission
                            permission={{
                                path: "ClientVehicle",
                                level: PermissionLevel.WRITE,
                                type: PermissionType.FORM,
                            }}>
                            <Button
                                disabled={
                                    clientVehicleStore.state.isLoading ||
                                    !isRowSelected ||
                                    drawerShowed
                                }
                                className={classes.button}
                                onClick={handleOpenClick}>
                                {t("Action:open")}
                            </Button>
                            <WithPermission
                                permission={{
                                    path: "ClientVehicle",
                                    level: PermissionLevel.CREATE,
                                    type: PermissionType.FORM,
                                }}>
                                <Button
                                    disabled={clientVehicleStore.state.isLoading || drawerShowed}
                                    className={classes.button}
                                    onClick={handleCreateClick}>
                                    {t("Action:create")}
                                </Button>
                            </WithPermission>
                        </WithPermission>
                    )}
                />
            )}
        />
    );

    return (
        <>
            {!props.withoutCard && (
                <ICard cardSize={12} col={10}>
                    {tableUI}
                </ICard>
            )}
            {props.withoutCard && tableUI}
            <DialogPrompt onProceed={handleCancelEditing} ref={editPromptModalRef} />
            <IDrawer
                open={drawerShowed}
                onCloseIconClick={handleClose}
                cssClasses={props.cssClasses}>
                {props.children({
                    onClose: handleClose,
                    onFormStateChange: handleFormStateChange,
                    id: selectedRowId,
                })}
            </IDrawer>
        </>
    );
});

export default TableWithDrawer;
