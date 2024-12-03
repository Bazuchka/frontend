import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent } from "react";
import { TableWithNavigation } from "src/features/TableWithNavigation";
import serviceStore from "../../store";
import { IService } from "../../store/ServiceStore";
import { getColumns } from "./configs";

interface ServiceTableProps {}

const ServiceTable: FunctionComponent<ServiceTableProps> = observer(() => {
    return (
        <TableWithNavigation
            getColumns={getColumns as () => ColumnDef<{ id: GridRowId }, IService>[]}
            store={serviceStore}
            navigationPaths={{
                info: "/service",
            }}
            permissionPath="Service"
            isLoading={serviceStore.state.isLoading}
            footerSettings={{
                hasCreateButton: false,
            }}
        />
    );
});

export default ServiceTable;
