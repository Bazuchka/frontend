import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FunctionComponent, useCallback } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TableWithInlineEditing from "src/features/TableWithInlineEditing/TableWithInlineEditing";
import {
    IReceivingOrderContainer,
    ReceivingOrderContainerStore,
    ReceivingOrderRailwayContainerStore,
} from "../../store/ReceivingOrderContainerStore";
import receivingOrderStore from "../../store/ReceivingOrderStore";
import { getColumns } from "./configs";

interface ReceivingOrderContainerTableProps {
    store:
        | Instance<typeof ReceivingOrderContainerStore>
        | Instance<typeof ReceivingOrderRailwayContainerStore>;
    clientId: string;
    receivingOrderId: string;
    isReadOnly: boolean;
}

const ReceivingOrderContainerTable: FunctionComponent<ReceivingOrderContainerTableProps> = observer(
    (props) => {
        const { store, isReadOnly, clientId, receivingOrderId } = props;
        const { t } = useTranslation();
        const getColumnsMemrorized = useCallback(
            () =>
                getColumns({
                    clientId,
                    receivingOrderId,
                    isRailway: (store as Instance<typeof ReceivingOrderRailwayContainerStore>)
                        .isRailway,
                }),
            [clientId, receivingOrderId, store]
        );
        return (
            <TableWithInlineEditing
                getColumns={
                    getColumnsMemrorized as () => ColumnDef<
                        { id: GridRowId },
                        IReceivingOrderContainer
                    >[]
                }
                store={store}
                messages={{
                    editSuccess: t("ReceivingOrderContainer:dialog.editSuccess"),
                    createSuccess: t("ReceivingOrderContainer:dialog.createSuccess"),
                    deleteSuccess: t("ReceivingOrderContainer:dialog.deleteSuccess"),
                }}
                onBeforeCreateModelTransform={(formModel: FieldValues) => {
                    return {
                        ...formModel,
                        receivingOrder: {
                            id: receivingOrderStore.current?.id,
                        },
                        active: true,
                    };
                }}
                onBeforeUpdateModelTransform={(formModel: FieldValues) => {
                    return {
                        ...formModel,
                        receivingOrder: {
                            id: receivingOrderStore.current?.id,
                        },
                    };
                }}
                fetchParams={{
                    active: true,
                    deleted: false,
                    receivingOrder: {
                        id: receivingOrderStore.current?.id,
                    },
                }}
                permissionPath="ReceivingOrder.ReceivingOrderContainer"
                footerSettings={{
                    useNextButton: true,
                    label: {
                        create: t("Action:add"),
                    },
                }}
                isReadOnly={isReadOnly}
            />
        );
    }
);

export default ReceivingOrderContainerTable;
