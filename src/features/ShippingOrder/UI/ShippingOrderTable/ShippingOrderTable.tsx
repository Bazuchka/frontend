import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { TableWithNavigation } from "src/features/TableWithNavigation";
import shippingOrderStore from "../../store/ShippingOrderStore";
import { IShippingOrder } from "../../store/ShippingOrderStore/ShippingOrderStore";
import { getColumns } from "./configs";

interface ShippingOrdersTableProps {}

const ShippingOrderTable: FunctionComponent<ShippingOrdersTableProps> = observer(() => {
    const { t } = useTranslation();
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
            footerSettings={{
                label: {
                    create: t("Shared:createOrder"),
                },
            }}
        />
    );
});

export default ShippingOrderTable;
