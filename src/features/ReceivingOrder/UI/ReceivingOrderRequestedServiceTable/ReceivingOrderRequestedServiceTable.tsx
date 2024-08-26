import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FunctionComponent, useCallback } from "react";
import { useTranslation } from "react-i18next";
import TableWithInlineEditing from "src/features/TableWithInlineEditing/TableWithInlineEditing";
import {
    IReceivingOrderRequestedService,
    ReceivingOrderRequestedServiceStore,
} from "../../store/ReceivingOrderRequestedService";
import receivingOrderStore from "../../store/ReceivingOrderStore";
import { getColumns, getPlannedQuantity } from "./configs";

interface ReceivingOrderRequestedServiceTableProps {
    store: Instance<typeof ReceivingOrderRequestedServiceStore>;
    receivingOrderId: string;
    isReadOnly: boolean;
}

const ReceivingOrderRequestedServiceTable: FunctionComponent<ReceivingOrderRequestedServiceTableProps> =
    observer(({ store, receivingOrderId, isReadOnly }) => {
        const { t } = useTranslation();
        const columns = useCallback(
            () =>
                getColumns(receivingOrderStore.current!.receivingOrderCargo.dataArray.length ?? 0),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [receivingOrderStore.current!.receivingOrderCargo.state.isLoading]
        );

        return (
            <TableWithInlineEditing
                getColumns={
                    columns as () => ColumnDef<{ id: GridRowId }, IReceivingOrderRequestedService>[]
                }
                onBeforeCreateModelTransform={(formModel) => ({
                    ...formModel,
                    termOfRequestedService: {
                        id: formModel.termOfRequestedService.id,
                    },
                    receivingOrder: {
                        id: receivingOrderId,
                    },
                    plannedQuantity: getPlannedQuantity(
                        formModel.termOfRequestedService,
                        receivingOrderStore.current!.receivingOrderCargo.dataArray.length ?? 0
                    ),
                    actualQuantity: parseFloat(formModel.actualQuantity),
                })}
                onBeforeUpdateModelTransform={(formModel) => ({
                    ...formModel,
                    termOfRequestedService: {
                        id: formModel.termOfRequestedService.id,
                    },
                    receivingOrder: {
                        id: receivingOrderId,
                    },
                    plannedQuantity: getPlannedQuantity(
                        formModel.termOfRequestedService,
                        receivingOrderStore.current!.receivingOrderCargo.dataArray.length ?? 0
                    ),
                    actualQuantity: parseFloat(formModel.actualQuantity),
                })}
                store={store}
                messages={{
                    editSuccess: t("ReceivingOrderRequestedService:dialog.editSuccess"),
                    createSuccess: t("ReceivingOrderRequestedService:dialog.createSuccess"),
                    deleteSuccess: t("ReceivingOrderRequestedService:dialog.deleteSeccess"),
                }}
                fetchParams={{
                    receivingOrder: {
                        id: receivingOrderId,
                    },
                    deleted: false,
                }}
                permissionPath="ReceivingOrder.ReceivingOrderRequestedService"
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

export default ReceivingOrderRequestedServiceTable;
