import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FunctionComponent, useCallback } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TableWithInlineEditing from "src/features/TableWithInlineEditing/TableWithInlineEditing";
import {
    IShippingOrderContainer,
    ShippingOrderContainerStore,
} from "../../store/ShippingOrderContainerStore";
import { ShippingOrderRailwayContainerStore } from "../../store/ShippingOrderContainerStore/ShippingOrderContainerStore";
import shippingOrderStore from "../../store/ShippingOrderStore";
import { getColumns } from "./configs";

interface ShippingOrderContainerTableProps {
    store:
        | Instance<typeof ShippingOrderContainerStore>
        | Instance<typeof ShippingOrderRailwayContainerStore>;
    clientId: string;
    isReadOnly: boolean;
    shippingOrderId: string;
}

const ShippingOrderContainerTable: FunctionComponent<ShippingOrderContainerTableProps> = observer(
    (props) => {
        const { store, isReadOnly, clientId, shippingOrderId } = props;
        const { t } = useTranslation();
        const getColumnsMemrorized = useCallback(
            () =>
                getColumns({
                    clientId,
                    shippingOrderId,
                    isRailway: (store as Instance<typeof ShippingOrderRailwayContainerStore>)
                        .isRailway,
                }),
            [clientId, shippingOrderId, store]
        );
        return (
            <TableWithInlineEditing
                getColumns={
                    getColumnsMemrorized as () => ColumnDef<
                        { id: GridRowId },
                        IShippingOrderContainer
                    >[]
                }
                store={store}
                messages={{
                    editSuccess: t("ShippingOrderContainer:dialog.editSuccess"),
                    createSuccess: t("ShippingOrderContainer:dialog.createSuccess"),
                    deleteSuccess: t("ShippingOrderContainer:dialog.deleteSuccess"),
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
                }}
                isReadOnly={isReadOnly}
            />
        );
    }
);

export default ShippingOrderContainerTable;
