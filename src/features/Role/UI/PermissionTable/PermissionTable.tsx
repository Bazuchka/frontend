import { useReactTable } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent, useEffect, useMemo } from "react";
import { DEFAULT_TANSTACK_CONFIG } from "src/shared/configs/table.conf";
import { TSBaseTableUI } from "src/shared/UI/TSBaseTable/TSBaseTableUI";
import roleStore from "../../store/RoleStore";
import { getColumns } from "./configs";

interface PermissionTableProps {}

const PermissionTable: FunctionComponent<PermissionTableProps> = observer(() => {
    const columns = useMemo(() => getColumns(), []);
    const permissionStore = roleStore.current!.permissions;

    useEffect(() => {
        permissionStore?.getTree();
    }, [permissionStore]);

    const table = useReactTable({
        ...DEFAULT_TANSTACK_CONFIG,
        columns,
        data: permissionStore.dataArray,
        getSubRows: (row) => row.children,
    });

    return (
        <TSBaseTableUI
            table={table}
            isLoading={roleStore.state.isLoading}
            sorting={permissionStore.sorting}
        />
    );
});

export default PermissionTable;
