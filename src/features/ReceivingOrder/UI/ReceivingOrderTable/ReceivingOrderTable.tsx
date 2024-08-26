import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent } from "react";
import { TableWithNavigation } from "src/features/TableWithNavigation";
import { SortingDirection } from "src/shared/request/types";
import receivingOrderStore from "../../store/ReceivingOrderStore";
import { IReceivingOrder } from "../../store/ReceivingOrderStore/ReceivingOrderStore";
import { getColumns } from "./configs";

interface ReceivingOrdersTableProps {}

const ReceivingOrderTable: FunctionComponent<ReceivingOrdersTableProps> = observer(() => {
    return (
        <TableWithNavigation
            getColumns={getColumns as () => ColumnDef<{ id: GridRowId }, IReceivingOrder>[]}
            store={receivingOrderStore}
            navigationPaths={{
                info: "/receiving-order",
                create: "/receiving-order/create",
            }}
            permissionPath="ReceivingOrder"
            isLoading={receivingOrderStore.state.isLoading}
            fetchParams={{
                sortingColumn: "number",
                sortingDirection: SortingDirection.DESC,
            }}
        />
    );
});

export default ReceivingOrderTable;
