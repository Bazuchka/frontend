import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FunctionComponent, useCallback } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ReceivingOrderGoodStore from "src/features/ReceivingOrder/store/ReceivingOrderGood";
import TableWithInlineEditing from "src/features/TableWithInlineEditing/TableWithInlineEditing";
import { IForeignKey } from "src/shared/entities/ForeignKey";
import { IReceivingOrderGoodStore } from "../../store/ReceivingOrderGood/ReceivingOrderGood";
import receivingOrderStore from "../../store/ReceivingOrderStore";
import { getColumns } from "./configs";

interface ReceivingOrderGoodTableProps {
    store: Instance<typeof ReceivingOrderGoodStore>;
    isReadOnly: boolean;
    client: IForeignKey;
}

const ReceivingOrderGoodTable: FunctionComponent<ReceivingOrderGoodTableProps> = observer(
    (props) => {
        const { store, isReadOnly, client } = props;
        const { t } = useTranslation();

        const columns = useCallback(() => {
            return getColumns(client);
        }, [client]);

        return (
            <TableWithInlineEditing
                getColumns={
                    columns as () => ColumnDef<{ id: GridRowId }, IReceivingOrderGoodStore>[]
                }
                store={store}
                messages={{
                    editSuccess: t("ReceivingOrderGood:dialog.editSuccess"),
                    createSuccess: t("ReceivingOrderGood:dialog.createSuccess"),
                    deleteSuccess: t("ReceivingOrderGood:dialog.deleteSuccess"),
                }}
                onBeforeCreateModelTransform={(formModel: FieldValues) => {
                    return {
                        ...formModel,
                        code: formModel.clientGood.code,
                        name: formModel.clientGood.name,
                        receivingOrder: {
                            id: receivingOrderStore.current?.id,
                        },
                        client: receivingOrderStore.current?.client,
                        active: true,
                    };
                }}
                onBeforeUpdateModelTransform={(formModel: FieldValues) => {
                    return {
                        ...formModel,
                        code: formModel.clientGood.code,
                        name: formModel.clientGood.name,
                        receivingOrder: {
                            id: receivingOrderStore.current?.id,
                        },
                        client: receivingOrderStore.current?.client,
                    };
                }}
                fetchParams={{
                    active: true,
                    deleted: false,
                    receivingOrder: {
                        id: receivingOrderStore.current?.id,
                    },
                }}
                permissionPath="ReceivingOrder.ReceivingOrderGood"
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

export default ReceivingOrderGoodTable;
