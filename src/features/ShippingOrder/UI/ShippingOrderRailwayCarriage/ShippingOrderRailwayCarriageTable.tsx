import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FunctionComponent, useMemo } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TableWithInlineEditing from "src/features/TableWithInlineEditing/TableWithInlineEditing";
import {
    IShippingOrderRailwayCarriage,
    ShippingOrderRailwayCarriageStore,
} from "../../store/ShippingOrderRailwayCarriageStore/ShippingOrderRailwayCarriageStore";
import shippingOrderStore from "../../store/ShippingOrderStore";
import { getColumns } from "./configs";

interface ShippingOrderEtranInvoiceTableProps {
    store: Instance<typeof ShippingOrderRailwayCarriageStore>;
    isReadOnly: boolean;
}

const ShippingOrderRailwayCarriageTable: FunctionComponent<ShippingOrderEtranInvoiceTableProps> =
    observer((props) => {
        const { store, isReadOnly } = props;
        const { t } = useTranslation();

        const columns = useMemo(
            () => getColumns(shippingOrderStore.current!.id, shippingOrderStore.current!.client.id),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [shippingOrderStore.current]
        );

        return (
            <TableWithInlineEditing
                getColumns={
                    columns as () => ColumnDef<{ id: GridRowId }, IShippingOrderRailwayCarriage>[]
                }
                store={store}
                messages={{
                    editSuccess: t("ShippingOrderRailwayCarriage:dialog.editSuccess"),
                    createSuccess: t("ShippingOrderRailwayCarriage:dialog.createSuccess"),
                    deleteSuccess: t("ShippingOrderRailwayCarriage:dialog.deleteSuccess"),
                }}
                onBeforeCreateModelTransform={(formModel: FieldValues) => {
                    return {
                        ...formModel,
                        etranInvoice: formModel?.shippingOrderEtranInvoice?.id
                            ? {
                                  id: formModel.shippingOrderEtranInvoice.id,
                              }
                            : null,
                        shippingOrder: {
                            id: shippingOrderStore.current?.id,
                        },
                    };
                }}
                onBeforeUpdateModelTransform={(formModel: FieldValues) => {
                    return {
                        ...formModel,
                        etranInvoice: formModel?.shippingOrderEtranInvoice?.id
                            ? {
                                  id: formModel.shippingOrderEtranInvoice.id,
                              }
                            : null,
                    };
                }}
                fetchParams={{
                    shippingOrder: {
                        id: shippingOrderStore.current?.id,
                    },
                    deleted: false,
                }}
                permissionPath="ShippingOrder.RailwayCarriage"
                footerSettings={{
                    useNextButton: true,
                    label: {
                        create: t("Action:add"),
                    },
                }}
                isReadOnly={isReadOnly}
                sortingData={{
                    shippingOrderEtranInvoice: "etranInvoice.code",
                }}
            />
        );
    });

export default ShippingOrderRailwayCarriageTable;
