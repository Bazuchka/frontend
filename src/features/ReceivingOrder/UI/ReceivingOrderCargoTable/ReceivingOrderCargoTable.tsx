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
                    packageQuantity: parseFloat(formModel.packageQuantity),
                    conversionQuantity: parseFloat(formModel.conversionQuantity),
                    receivingOrder: {
                        id: receivingOrderStore.current!.id,
                    },
                    length: parseFloat(formModel.dimensions?.length ?? 0),
                    width: parseFloat(formModel.dimensions?.width ?? 0),
                    height: parseFloat(formModel.dimensions?.height ?? 0),
                    volume: parseFloat(formModel.dimensions?.volume ?? 0),
                    weight: parseFloat(formModel.dimensions?.weight ?? 0),
                    totalQuantity:
                        parseFloat(formModel.packageQuantity) *
                        parseFloat(formModel.conversionQuantity),
                })}
                onBeforeUpdateModelTransform={(formModel: FieldValues) => {
                    const dimensions = formModel.dimensions
                        ? {
                              length: parseFloat(formModel.dimensions.length),
                              width: parseFloat(formModel.dimensions.width),
                              height: parseFloat(formModel.dimensions.height),
                              volume: parseFloat(formModel.dimensions.volume),
                              weight: parseFloat(formModel.dimensions.weight),
                          }
                        : {};
                    return {
                        ...formModel,
                        packageQuantity: parseFloat(formModel.packageQuantity),
                        totalQuantity:
                            parseFloat(formModel.packageQuantity) *
                            parseFloat(formModel.conversionQuantity),
                        receivingOrder: {
                            id: receivingOrderStore.current!.id,
                        },
                        ...dimensions,
                    };
                }}
                messages={{
                    editSuccess: t("ReceivingOrderCargo:dialog.editSuccess"),
                    createSuccess: t("ReceivingOrderCargo:dialog.createSuccess"),
                    deleteSuccess: t("ReceivingOrderCargo:dialog.deleteSuccess"),
                }}
                permissionPath="ReceivingOrder.ReceivingOrderCargo"
                footerSettings={{
                    useNextButton: true,
                    label: {
                        create: t("Action:add"),
                    },
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
