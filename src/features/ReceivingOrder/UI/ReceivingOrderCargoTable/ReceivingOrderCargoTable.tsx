import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FunctionComponent, useMemo } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TableWithInlineEditing from "src/features/TableWithInlineEditing/TableWithInlineEditing";
import {
    IReceivingOrderCargo,
    ReceivingOrderCargoStore,
} from "../../store/ReceivingOrderCargoStore";
import receivingOrderStore from "../../store/ReceivingOrderStore";
import { getColumns } from "./configs";

interface ReceivingOrderCargoTableProps {
    store: Instance<typeof ReceivingOrderCargoStore>;
    isReadOnly: boolean;
}

const ReceivingOrderCargoTable: FunctionComponent<ReceivingOrderCargoTableProps> = observer(
    ({ store, isReadOnly }) => {
        const { t } = useTranslation();

        const columns = useMemo(
            () => getColumns(receivingOrderStore.current!.id),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [receivingOrderStore.current]
        );

        return (
            <TableWithInlineEditing
                getColumns={columns as () => ColumnDef<{ id: GridRowId }, IReceivingOrderCargo>[]}
                store={store}
                onBeforeCreateModelTransform={(formModel: FieldValues) => ({
                    ...formModel,
                    packageQuantity: parseInt(formModel.packageQuantity, 10),
                    receivingOrder: {
                        id: receivingOrderStore.current!.id,
                    },
                    length: parseFloat(formModel.dimensions.length),
                    width: parseFloat(formModel.dimensions.width),
                    height: parseFloat(formModel.dimensions.height),
                    volume: parseFloat(formModel.dimensions.volume),
                    weight: parseFloat(formModel.dimensions.weight),
                })}
                onBeforeUpdateModelTransform={(formModel: FieldValues) => ({
                    ...formModel,
                    packageQuantity: parseInt(formModel.packageQuantity, 10),
                    receivingOrder: {
                        id: receivingOrderStore.current!.id,
                    },
                    length: parseFloat(formModel.dimensions.length),
                    width: parseFloat(formModel.dimensions.width),
                    height: parseFloat(formModel.dimensions.height),
                    volume: parseFloat(formModel.dimensions.volume),
                    weight: parseFloat(formModel.dimensions.weight),
                })}
                messages={{
                    editSuccess: t("ReceivingOrderCargo:dialog.editSuccess"),
                    createSuccess: t("ReceivingOrderCargo:dialog.createSuccess"),
                    deleteSuccess: t("ReceivingOrderCargo:dialog.deleteSuccess"),
                }}
                permissionPath="ReceivingOrder.ReceivingOrderCargo"
                footerSettings={{
                    useNextButton: true,
                }}
                isReadOnly={isReadOnly}
                fetchParams={{
                    receivingOrder: {
                        id: receivingOrderStore.current?.id,
                    },
                    deleted: false,
                }}
            />
        );
    }
);

export default ReceivingOrderCargoTable;
