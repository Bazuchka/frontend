import { GridRowId } from "@mui/x-data-grid";
import { observer } from "mobx-react";
import { TableWithNavigation } from "src/features/TableWithNavigation";
import { getColumns } from "./configs";
import { ColumnDef } from "@tanstack/react-table";
import { containersStore, IContainerItem } from "../../store";

const ContainersTable = observer(() => {
    return (
        <TableWithNavigation
            getColumns={getColumns as () => ColumnDef<{ id: GridRowId }, IContainerItem>[]}
            store={containersStore}
            navigationPaths={{
                info: "/containers",
            }}
            // todo заменить на верный доступ с бека
            permissionPath="ReceivingOrder"
            isLoading={containersStore.state.isLoading}
            footerSettings={{ hasCreateButton: false }}
        />
    );
});

export default ContainersTable;
