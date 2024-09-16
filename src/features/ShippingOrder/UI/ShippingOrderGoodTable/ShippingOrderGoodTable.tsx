import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FunctionComponent } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TableWithInlineEditing from "src/features/TableWithInlineEditing/TableWithInlineEditing";
import {
    IShippingOrderGoodStore,
    ShippingOrderGoodStore,
} from "../../store/ShippingOrderGoodStore/ShippingOrderGoodStore";
import shippingOrderStore from "../../store/ShippingOrderStore";
import { getColumns } from "./configs";

interface ShippingOrderGoodTableProps {
    store: Instance<typeof ShippingOrderGoodStore>;
    isReadOnly: boolean;
}

const ShippingOrderGoodTable: FunctionComponent<ShippingOrderGoodTableProps> = observer((props) => {
    const { store, isReadOnly } = props;
    const { t } = useTranslation();

    return (
        <TableWithInlineEditing
            getColumns={getColumns as () => ColumnDef<{ id: GridRowId }, IShippingOrderGoodStore>[]}
            store={store}
            messages={{
                editSuccess: t("ShippingOrderGood:dialog.editSuccess"),
                createSuccess: t("ShippingOrderGood:dialog.createSuccess"),
                deleteSuccess: t("ShippingOrderGood:dialog.deleteSuccess"),
            }}
            onBeforeCreateModelTransform={(formModel: FieldValues) => {
                return {
                    ...formModel,
                    code: formModel.clientGood.code,
                    name: formModel.clientGood.name,
                    shippingOrder: {
                        id: shippingOrderStore.current?.id,
                    },
                    client: shippingOrderStore.current?.client,
                    active: true,
                };
            }}
            onBeforeUpdateModelTransform={(formModel: FieldValues) => {
                return {
                    ...formModel,
                    code: formModel.clientGood.code,
                    name: formModel.clientGood.name,
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
            permissionPath="ShippingOrder.ShippingOrderGood"
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

export default ShippingOrderGoodTable;
