import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { useTranslation } from "react-i18next";
import { Button } from "src/shared/UI/Button";
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
    fetchParams?: Record<string, unknown>;
    footerSettings?: {
        label?: {
            create?: string;
        };
        hasCreateButton?: boolean;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        additionalButtons?: (
            isLoading: boolean | undefined,
            classes: Record<string, string>
        ) => JSX.Element;
    };
}

const TableWithNavigation = ({
    permissionPath,
    isLoading,
    footerSettings,
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
        sorting,
    } = useTableWithNavigation({ isLoading, ...props });

    return (
        <>
            <ICard cardSize={12} col={10}>
                <TSBaseTableUI
                    table={table}
                    onRowClick={handleRowClick}
                    onRowDoubleClick={handleDoubleClick}
                    isLoading={isLoading || storeIsLoading}
                    sorting={sorting}
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
                                    {(footerSettings?.hasCreateButton ?? true) && (
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
                                                {footerSettings?.label?.create ??
                                                    t("Action:create")}
                                            </Button>
                                        </WithPermission>
                                    )}
                                    {footerSettings?.additionalButtons?.(isLoading, classes)}
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
