import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FunctionComponent } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TableWithInlineEditing from "src/features/TableWithInlineEditing/TableWithInlineEditing";
import {
    IReceivingOrderEtranInvoice,
    ReceivingOrderEtranInvoiceStore,
} from "../../store/ReceivingOrderEtranInvoiceStore/ReceivingOrderEtranInvoiceStore";
import receivingOrderStore from "../../store/ReceivingOrderStore";
import { getColumns } from "./configs";

interface ReceivingOrderEtranInvoiceTableProps {
    store: Instance<typeof ReceivingOrderEtranInvoiceStore>;
    isReadOnly: boolean;
}

const ReceivingOrderEtranInvoiceTable: FunctionComponent<ReceivingOrderEtranInvoiceTableProps> =
    observer((props) => {
        const { store, isReadOnly } = props;
        const { t } = useTranslation();

        return (
            <TableWithInlineEditing
                getColumns={
                    getColumns as () => ColumnDef<{ id: GridRowId }, IReceivingOrderEtranInvoice>[]
                }
                store={store}
                messages={{
                    editSuccess: t("ReceivingOrderEtranInvoice:dialog.editSuccess"),
                    createSuccess: t("ReceivingOrderEtranInvoice:dialog.createSuccess"),
                    deleteSuccess: t("ReceivingOrderEtranInvoice:dialog.deleteSuccess"),
                }}
                onBeforeCreateModelTransform={(formModel: FieldValues) => {
                    return {
                        ...formModel,
                        receivingOrder: {
                            id: receivingOrderStore.current?.id,
                        },
                    };
                }}
                onBeforeUpdateModelTransform={(formModel: FieldValues) => {
                    return {
                        ...formModel,
                    };
                }}
                onRowSelected={(id) => store.setCurrent(id as string)}
                fetchParams={{
                    receivingOrder: {
                        id: receivingOrderStore.current?.id,
                    },
                    deleted: false,
                }}
                permissionPath="ReceivingOrder.EtranInvoice"
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

export default ReceivingOrderEtranInvoiceTable;
