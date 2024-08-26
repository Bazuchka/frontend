import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent } from "react";
import { TableWithDrawer } from "../TableWithDrawer";
import { ClientVehicleForm } from "../common/ClientVehicleForm";
import { getColumns } from "./configs";
import clientVehicleStore from "./store";
import { IClientVehicle } from "./store/ClientVehicleStore";

interface ClientLegalEntityTableProps {}

const ClientVehicleTable: FunctionComponent<ClientLegalEntityTableProps> = observer(() => {
    return (
        <TableWithDrawer
            getColumns={getColumns as () => ColumnDef<{ id: GridRowId }, IClientVehicle>[]}
            permissionPath="ClientVehicle"
            store={clientVehicleStore}>
            {(props) => <ClientVehicleForm {...props} store={clientVehicleStore} />}
        </TableWithDrawer>
    );
});

export default ClientVehicleTable;
