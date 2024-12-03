import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent } from "react";
import { TableWithNavigation } from "src/features/TableWithNavigation";
import { termOfServiceStore } from "../../store/TermOfServiceStore";
import { ITermOfService } from "../../store/TermOfServiceStore/TermOfServiceStore";
import { getColumns } from "./configs";

interface TermsOfServiceTableProps {}

const TermOfServiceTable: FunctionComponent<TermsOfServiceTableProps> = observer(() => {
    return (
        <TableWithNavigation
            getColumns={getColumns as () => ColumnDef<{ id: GridRowId }, ITermOfService>[]}
            store={termOfServiceStore}
            navigationPaths={{
                create: "/term-of-service/create",
                info: "/term-of-service",
            }}
            permissionPath="TermOfService"
            isLoading={termOfServiceStore.state.isLoading}
        />
    );
});

export default TermOfServiceTable;
