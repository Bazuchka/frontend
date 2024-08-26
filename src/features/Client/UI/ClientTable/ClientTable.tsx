import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent } from "react";
import { TableWithNavigation } from "src/features/TableWithNavigation";
import clientStore from "../../store";
import { IClient } from "../../store/ClientStore";
import { getColumns } from "./configs";

interface ClientsTableProps {}

const ClientTable: FunctionComponent<ClientsTableProps> = observer(() => {
    return (
        <TableWithNavigation
            getColumns={getColumns as () => ColumnDef<{ id: GridRowId }, IClient>[]}
            store={clientStore}
            navigationPaths={{
                info: "/client",
            }}
            permissionPath="Client"
            isLoading={clientStore.state.isLoading}
            hasCreateButton={false}
        />
    );
});

export default ClientTable;
