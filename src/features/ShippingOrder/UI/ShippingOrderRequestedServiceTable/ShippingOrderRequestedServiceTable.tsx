import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FunctionComponent, useCallback } from "react";
import { useTranslation } from "react-i18next";
import TableWithInlineEditing from "src/features/TableWithInlineEditing/TableWithInlineEditing";
import {
    IShippingOrderRequestedService,
    ShippingOrderRequestedServiceStore,
} from "../../store/ShippingOrderRequestedServiceStore";
import shippingOrderStore from "../../store/ShippingOrderStore";
import { getColumns, getPlannedQuantity } from "./configs";

interface ShippingOrderRequestedServiceTableProps {
    store: Instance<typeof ShippingOrderRequestedServiceStore>;
    client: {
        id: string;
        code: string;
    };
    shippingOrderId: string;
    isReadOnly: boolean;
}

const ShippingOrderRequestedServiceTable: FunctionComponent<ShippingOrderRequestedServiceTableProps> =
    observer(({ store, shippingOrderId, isReadOnly }) => {
        const { t } = useTranslation();
        const columns = useCallback(
            () => getColumns(shippingOrderStore.current!.shippingOrderCargo.dataArray.length ?? 0),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [shippingOrderStore.current!.shippingOrderCargo.state.isLoading]
        );

        return (
            <TableWithInlineEditing
                getColumns={
                    columns as () => ColumnDef<{ id: GridRowId }, IShippingOrderRequestedService>[]
                }
                onBeforeCreateModelTransform={(formModel) => ({
                    ...formModel,
                    termOfRequestedService: {
                        id: formModel.termOfRequestedService.id,
                    },
                    shippingOrder: {
                        id: shippingOrderId,
                    },
                    plannedQuantity: getPlannedQuantity(
                        formModel.termOfRequestedService,
                        shippingOrderStore.current!.shippingOrderCargo.dataArray.length ?? 0
                    ),
                    actualQuantity: parseFloat(formModel.actualQuantity),
                })}
                onBeforeUpdateModelTransform={(formModel) => ({
                    ...formModel,
                    termOfRequestedService: {
                        id: formModel.termOfRequestedService.id,
                    },
                    shippingOrder: {
                        id: shippingOrderId,
                    },
                    plannedQuantity: getPlannedQuantity(
                        formModel.termOfRequestedService,
                        shippingOrderStore.current!.shippingOrderCargo.dataArray.length
                    ),
                    actualQuantity: parseFloat(formModel.actualQuantity),
                })}
                store={store}
                messages={{
                    editSuccess: t("ShippingOrderRequestedService:dialog.editSuccess"),
                    createSuccess: t("ShippingOrderRequestedService:dialog.createSuccess"),
                    deleteSuccess: t("ShippingOrderRequestedService:dialog.deleteSeccess"),
                }}
                fetchParams={{
                    shippingOrder: {
                        id: shippingOrderId,
                    },
                    deleted: false,
                }}
                permissionPath="ShippingOrder.ShippingOrderRequestedService"
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

export default ShippingOrderRequestedServiceTable;
