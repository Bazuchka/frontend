import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent } from "react";
import { TableWithNavigation } from "src/features/TableWithNavigation";
import { SortingDirection } from "src/shared/request/types";
import roleStore from "../../store/RoleStore";
import { IRole } from "../../store/RoleStore/RoleStore";
import { getColumns } from "./configs";

interface LegalEntitiesTableProps {}

const RoleTable: FunctionComponent<LegalEntitiesTableProps> = observer(() => {
    return (
        <TableWithNavigation
            getColumns={getColumns as () => ColumnDef<{ id: GridRowId }, IRole>[]}
            store={roleStore}
            navigationPaths={{
                info: "/roles",
                create: "/roles/create",
            }}
            permissionPath="Role"
            isLoading={roleStore.state.isLoading}
            fetchParams={{
                sortingColumn: "name",
                sortingDirection: SortingDirection.ASC,
                active: true,
            }}
        />
    );
});

export default RoleTable;
