import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent } from "react";
import { TableWithNavigation } from "src/features/TableWithNavigation";
import legalEntityStore from "../../store/LegalEntityStore";
import { ILegalEntity } from "../../store/LegalEntityStore/LegalEntityStore";
import { getColumns } from "./configs";

interface LegalEntitiesTableProps {}

const LegalEntityTable: FunctionComponent<LegalEntitiesTableProps> = observer(() => {
    return (
        <TableWithNavigation
            getColumns={getColumns as () => ColumnDef<{ id: GridRowId }, ILegalEntity>[]}
            store={legalEntityStore}
            navigationPaths={{
                info: "/legal-entity",
            }}
            permissionPath="LegalEntity"
            isLoading={legalEntityStore.state.isLoading}
            footerSettings={{
                hasCreateButton: false,
            }}
        />
    );
});

export default LegalEntityTable;
