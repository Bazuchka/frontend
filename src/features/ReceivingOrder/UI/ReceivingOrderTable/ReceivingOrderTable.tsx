import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { TableWithNavigation } from "src/features/TableWithNavigation";
import receivingOrderStore from "../../store/ReceivingOrderStore";
import { IReceivingOrder } from "../../store/ReceivingOrderStore/ReceivingOrderStore";
import { getColumns } from "./configs";

interface ReceivingOrdersTableProps {}

const ReceivingOrderTable: FunctionComponent<ReceivingOrdersTableProps> = observer(() => {
    const { t } = useTranslation();
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
            footerSettings={{
                label: {
                    create: t("Shared:createOrder"),
                },
            }}
        />
    );
});

export default ReceivingOrderTable;
