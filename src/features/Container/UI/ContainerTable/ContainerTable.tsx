import { GridRowId } from "@mui/x-data-grid";
import { observer } from "mobx-react";
import { TableWithNavigation } from "src/features/TableWithNavigation";
import { getColumns } from "./configs";
import { ColumnDef } from "@tanstack/react-table";
import { containerStore, type IContainer } from "../../store";

const ContainerTable = observer(() => {
    return (
        <TableWithNavigation
            getColumns={getColumns as () => ColumnDef<{ id: GridRowId }, IContainer>[]}
            store={containerStore}
            navigationPaths={{
                info: "/container",
            }}
            permissionPath="container"
            isLoading={containerStore.state.isLoading}
            footerSettings={{ hasCreateButton: false }}
        />
    );
});

export default ContainerTable;
