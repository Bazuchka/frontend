import { Button } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { useTranslation } from "react-i18next";
import { TSBaseTableUI } from "src/shared/UI/TSBaseTable/TSBaseTableUI";
import { Footer } from "src/shared/UI/TSBaseTable/UI/Footer";
import { ICard } from "src/shared/UI/iCard";
import { createBaseStore } from "src/shared/entities/BaseStore";
import { useTableWithNavigation } from "src/shared/hooks/useTableWithNavigation";
import { WithPermission } from "src/shared/services/PermissionService";
import { PermissionType } from "src/shared/services/PermissionService/types";
import { PermissionLevel } from "src/shared/types";

interface TableWithNaviagtionProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getColumns: () => ColumnDef<{ id: GridRowId }, any>[];
    store: Instance<ReturnType<typeof createBaseStore>>;
    navigationPaths: {
        create?: string;
        info: string;
    };
    permissionPath: string;
    isLoading?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    additionalButtons?: (
        isLoading: boolean | undefined,
        classes: Record<string, string>
    ) => JSX.Element;
    hasCreateButton?: boolean;
    fetchParams?: Record<string, unknown>;
}

const TableWithNavigation = ({
    permissionPath,
    isLoading,
    hasCreateButton = true,
    additionalButtons,
    ...props
}: TableWithNaviagtionProps) => {
    const { t } = useTranslation();
    const {
        table,
        handleRowClick,
        handleCreateClick,
        handleOpenClick,
        handleDoubleClick,
        isRowSelected,
        pagination,
        isLoading: storeIsLoading,
    } = useTableWithNavigation({ isLoading, ...props });

    return (
        <>
            <ICard cardSize={12} col={10}>
                <TSBaseTableUI
                    table={table}
                    onRowClick={handleRowClick}
                    onRowDoubleClick={handleDoubleClick}
                    isLoading={isLoading || storeIsLoading}
                    footer={() => (
                        <Footer
                            paginator={pagination}
                            buttons={(classes) => (
                                <>
                                    <Button
                                        disabled={isLoading || !isRowSelected}
                                        className={classes.button}
                                        onClick={handleOpenClick}>
                                        {t("Action:open")}
                                    </Button>
                                    {hasCreateButton && (
                                        <WithPermission
                                            permission={{
                                                path: permissionPath,
                                                level: PermissionLevel.CREATE,
                                                type: PermissionType.FORM,
                                            }}>
                                            <Button
                                                disabled={isLoading}
                                                className={classes.button}
                                                onClick={handleCreateClick}>
                                                {t("Action:create")}
                                            </Button>
                                        </WithPermission>
                                    )}
                                    {additionalButtons && additionalButtons(isLoading, classes)}
                                </>
                            )}
                        />
                    )}
                />
            </ICard>
        </>
    );
};

export default observer(TableWithNavigation);
