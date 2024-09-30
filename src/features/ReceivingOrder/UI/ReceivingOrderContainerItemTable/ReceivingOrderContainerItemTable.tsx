import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FunctionComponent, useCallback } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TableWithInlineEditing from "src/features/TableWithInlineEditing/TableWithInlineEditing";
import {
    IReceivingOrderContainerItem,
    ReceivingOrderContainerItemStore,
} from "../../store/ReceivingOrderContainerItemStore";
import receivingOrderStore from "../../store/ReceivingOrderStore";
import { getColumns } from "./configs";

interface ReceivingOrderContainerItemTableProps {
    store: Instance<typeof ReceivingOrderContainerItemStore>;
    isReadOnly: boolean;
    receivingOrderId: string;
}

const ReceivingOrderContainerItemTable: FunctionComponent<ReceivingOrderContainerItemTableProps> =
    observer((props) => {
        const { store, isReadOnly, receivingOrderId } = props;
        const { t } = useTranslation();
        const columnsMemorized = useCallback(() => {
            return getColumns(receivingOrderId);
        }, [receivingOrderId]);

        return (
            <TableWithInlineEditing
                getColumns={
                    columnsMemorized as () => ColumnDef<
                        { id: GridRowId },
                        IReceivingOrderContainerItem
                    >[]
                }
                store={store}
                messages={{
                    editSuccess: t("ReceivingOrderContainerItem:dialog.editSuccess"),
                    createSuccess: t("ReceivingOrderContainerItem:dialog.createSuccess"),
                    deleteSuccess: t("ReceivingOrderContainerItem:dialog.deleteSuccess"),
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
                onRowSelected={(id) => store.setCurrent(id as string)}
                fetchParams={{
                    active: true,
                    deleted: false,
                    receivingOrder: {
                        id: receivingOrderStore.current?.id,
                    },
                }}
                permissionPath="ReceivingOrder.ReceivingOrderContainerItem"
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

export default ReceivingOrderContainerItemTable;
