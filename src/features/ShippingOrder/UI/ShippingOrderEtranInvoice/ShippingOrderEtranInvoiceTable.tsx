import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FunctionComponent } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TableWithInlineEditing from "src/features/TableWithInlineEditing/TableWithInlineEditing";
import {
    IShippingOrderEtranInvoice,
    ShippingOrderEtranInvoiceStore,
} from "../../store/ShippingOrderEtranInvoiceStore/ShippingOrderEtranInvoiceStore";
import shippingOrderStore from "../../store/ShippingOrderStore";
import { getColumns } from "./configs";

interface ShippingOrderEtranInvoiceTableProps {
    store: Instance<typeof ShippingOrderEtranInvoiceStore>;
    isReadOnly: boolean;
}

const ShippingOrderEtranInvoiceTable: FunctionComponent<ShippingOrderEtranInvoiceTableProps> =
    observer((props) => {
        const { store, isReadOnly } = props;
        const { t } = useTranslation();

        return (
            <TableWithInlineEditing
                getColumns={
                    getColumns as () => ColumnDef<{ id: GridRowId }, IShippingOrderEtranInvoice>[]
                }
                store={store}
                messages={{
                    editSuccess: t("ShippingOrderEtranInvoice:dialog.editSuccess"),
                    createSuccess: t("ShippingOrderEtranInvoice:dialog.createSuccess"),
                    deleteSuccess: t("ShippingOrderEtranInvoice:dialog.deleteSuccess"),
                }}
                onBeforeCreateModelTransform={(formModel: FieldValues) => {
                    return {
                        ...formModel,
                        shippingOrder: {
                            id: shippingOrderStore.current?.id,
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
                    shippingOrder: {
                        id: shippingOrderStore.current?.id,
                    },
                    deleted: false,
                }}
                permissionPath="ShippingOrder.EtranInvoice"
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

export default ShippingOrderEtranInvoiceTable;
