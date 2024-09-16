import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FunctionComponent, useCallback } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TableWithInlineEditing from "src/features/TableWithInlineEditing/TableWithInlineEditing";
import {
    IShippingOrderContainerItem,
    ShippingOrderContainerItemStore,
} from "../../store/ShippingOrderContainerItemStore";
import shippingOrderStore from "../../store/ShippingOrderStore";
import { getColumns } from "./configs";

interface ShippingOrderContainerItemTableProps {
    store: Instance<typeof ShippingOrderContainerItemStore>;
    isReadOnly: boolean;
    shippingOrderId: string;
}

const ShippingOrderContainerItemTable: FunctionComponent<ShippingOrderContainerItemTableProps> =
    observer((props) => {
        const { store, isReadOnly, shippingOrderId } = props;
        const { t } = useTranslation();
        const columnsMemorized = useCallback(() => {
            return getColumns(shippingOrderId);
        }, [shippingOrderId]);

        return (
            <TableWithInlineEditing
                getColumns={
                    columnsMemorized as () => ColumnDef<
                        { id: GridRowId },
                        IShippingOrderContainerItem
                    >[]
                }
                store={store}
                messages={{
                    editSuccess: t("ShippingOrderContainerItem:dialog.editSuccess"),
                    createSuccess: t("ShippingOrderContainerItem:dialog.createSuccess"),
                    deleteSuccess: t("ShippingOrderContainerItem:dialog.deleteSuccess"),
                }}
                onBeforeCreateModelTransform={(formModel: FieldValues) => {
                    return {
                        ...formModel,
                        shippingOrder: {
                            id: shippingOrderStore.current?.id,
                        },
                        active: true,
                    };
                }}
                onBeforeUpdateModelTransform={(formModel: FieldValues) => {
                    return {
                        ...formModel,
                        shippingOrder: {
                            id: shippingOrderStore.current?.id,
                        },
                    };
                }}
                onRowSelected={(id) => store.setCurrent(id as string)}
                fetchParams={{
                    active: true,
                    deleted: false,
                    shippingOrder: {
                        id: shippingOrderStore.current?.id,
                    },
                }}
                permissionPath="ShippingOrder"
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

export default ShippingOrderContainerItemTable;
