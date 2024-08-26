import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent } from "react";
import { TableWithNavigation } from "src/features/TableWithNavigation";
import shippingOrderStore from "../../store/ShippingOrderStore";
import { IShippingOrder } from "../../store/ShippingOrderStore/ShippingOrderStore";
import { getColumns } from "./configs";

interface ReceivingOrdersTableProps {}

const ShippingOrderTable: FunctionComponent<ReceivingOrdersTableProps> = observer(() => {
    return (
        <TableWithNavigation
            getColumns={getColumns as () => ColumnDef<{ id: GridRowId }, IShippingOrder>[]}
            store={shippingOrderStore}
            navigationPaths={{
                info: "/shipping-order",
                create: "/shipping-order/create",
            }}
            permissionPath="ShippingOrder"
            isLoading={shippingOrderStore.state.isLoading}
        />
    );
});

export default ShippingOrderTable;
