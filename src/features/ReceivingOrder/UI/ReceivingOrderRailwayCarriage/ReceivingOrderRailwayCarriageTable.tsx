import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FunctionComponent, useMemo } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TableWithInlineEditing from "src/features/TableWithInlineEditing/TableWithInlineEditing";
import {
    IReceivingOrderRailwayCarriage,
    ReceivingOrderRailwayCarriageStore,
} from "../../store/ReceivingOrderRailwayCarriageStore/ReceivingOrderRailwayCarriageStore";
import receivingOrderStore from "../../store/ReceivingOrderStore";
import { getColumns } from "./configs";

interface ReceivingOrderEtranInvoiceTableProps {
    store: Instance<typeof ReceivingOrderRailwayCarriageStore>;
    isReadOnly: boolean;
}

const ReceivingOrderRailwayCarriageTable: FunctionComponent<ReceivingOrderEtranInvoiceTableProps> =
    observer((props) => {
        const { store, isReadOnly } = props;
        const { t } = useTranslation();

        const columns = useMemo(
            () => getColumns(receivingOrderStore.current!.id),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [receivingOrderStore.current]
        );

        return (
            <TableWithInlineEditing
                getColumns={
                    columns as () => ColumnDef<{ id: GridRowId }, IReceivingOrderRailwayCarriage>[]
                }
                store={store}
                messages={{
                    editSuccess: t("ReceivingOrderRailwayCarriage:dialog.editSuccess"),
                    createSuccess: t("ReceivingOrderRailwayCarriage:dialog.createSuccess"),
                    deleteSuccess: t("ReceivingOrderRailwayCarriage:dialog.deleteSuccess"),
                }}
                onBeforeCreateModelTransform={(formModel: FieldValues) => {
                    return {
                        ...formModel,
                        etranInvoice: {
                            id: formModel?.receivingOrderEtranInvoice?.id,
                        },
                        receivingOrder: {
                            id: receivingOrderStore.current?.id,
                        },
                    };
                }}
                onBeforeUpdateModelTransform={(formModel: FieldValues) => {
                    return {
                        ...formModel,
                        etranInvoice: {
                            id: formModel?.receivingOrderEtranInvoice?.id,
                        },
                    };
                }}
                onRowSelected={(id) => store.setCurrent(id as string)}
                fetchParams={{
                    receivingOrder: {
                        id: receivingOrderStore.current?.id,
                    },
                    deleted: false,
                }}
                permissionPath="ReceivingOrder.RailwayCarriage"
                footerSettings={{
                    useNextButton: true,
                    label: {
                        create: t("Action:add"),
                    },
                }}
                isReadOnly={isReadOnly}
            />
        );
    });

export default ReceivingOrderRailwayCarriageTable;
