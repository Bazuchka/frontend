import { ExpandedState, getExpandedRowModel, useReactTable } from "@tanstack/react-table";
import { FunctionComponent, useEffect, useState } from "react";
import { DEFAULT_TANSTACK_CONFIG } from "src/shared/configs/table.conf";
import { TSBaseTableUI } from "src/shared/UI/TSBaseTable/TSBaseTableUI";
import roleStore from "../../store/RoleStore";
import { getColumns } from "./configs";

interface PermissionTableProps {}

const PermissionTable: FunctionComponent<PermissionTableProps> = () => {
    const [treeIsLoading, setTreeIsLoading] = useState(true);
    const permissionStore = roleStore.current!.permissions;

    useEffect(() => {
        permissionStore?.getTree().finally(() => {
            setTreeIsLoading(false);
        });
    }, [permissionStore]);

    const columns = getColumns();

    const [expanded, setExpanded] = useState<ExpandedState>({});
    const table = useReactTable({
        ...DEFAULT_TANSTACK_CONFIG,
        columns,
        data: permissionStore.tableView,
        getSubRows: (row) => row.children,
        getExpandedRowModel: getExpandedRowModel(),
        onExpandedChange: setExpanded,
        state: {
            expanded: expanded,
        },
    });

    return (
        <TSBaseTableUI
            isLoading={treeIsLoading}
            table={table}
            sorting={permissionStore.sorting}
            expandedState={expanded}
        />
    );
};

export default PermissionTable;
