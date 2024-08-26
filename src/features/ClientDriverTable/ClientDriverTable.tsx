import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent } from "react";
import { ClientDriverForm } from "../common/ClientDriverForm";
import { TableWithDrawer } from "../TableWithDrawer";
import { getColumns } from "./configs";
import clientDriverStore from "./store";
import { IClientDriver } from "./store/ClientDriverStore";

interface ClientLegalEntityTableProps {}

const ClientDriverTable: FunctionComponent<ClientLegalEntityTableProps> = observer(() => {
    return (
        <TableWithDrawer
            getColumns={getColumns as () => ColumnDef<{ id: GridRowId }, IClientDriver>[]}
            permissionPath="ClientDriver"
            store={clientDriverStore}>
            {(props) => <ClientDriverForm {...props} store={clientDriverStore} />}
        </TableWithDrawer>
    );
});

export default ClientDriverTable;
