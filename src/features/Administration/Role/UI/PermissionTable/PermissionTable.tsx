import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent, useMemo } from "react";
import { useTranslation } from "react-i18next";
import TableWithInlineEditing from "src/features/TableWithInlineEditing/TableWithInlineEditing";
import { ITableViewPermission } from "../../store/PermissionStore/PermissionStore";
import roleStore from "../../store/RoleStore";
import { getColumns } from "./configs";

interface PermissionTableProps {}

const PermissionTable: FunctionComponent<PermissionTableProps> = observer(() => {
    const permissionStore = roleStore.current!.permissions;
    const { t } = useTranslation();

    const columns = useMemo(() => getColumns, []);

    return (
        <TableWithInlineEditing
            getColumns={columns as () => ColumnDef<{ id: GridRowId }, ITableViewPermission>[]}
            store={permissionStore}
            expandable
            messages={{
                editSuccess: t("Permissions:dialog.editSuccess"),
            }}
            permissionPath="Role.RolePermission"
        />
    );
});

export default PermissionTable;
