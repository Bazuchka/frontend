import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FunctionComponent, useMemo } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TableWithInlineEditing from "src/features/TableWithInlineEditing/TableWithInlineEditing";
import { IShippingOrderCargo, ShippingOrderCargoStore } from "../../store/ShippingOrderCargoStore";
import shippingOrderStore from "../../store/ShippingOrderStore";
import { getColumns } from "./configs";

interface ShippingOrderCargoTableProps {
    store: Instance<typeof ShippingOrderCargoStore>;
    isReadOnly: boolean;
}

const ShippingOrderCargoTable: FunctionComponent<ShippingOrderCargoTableProps> = observer(
    ({ store, isReadOnly }) => {
        const { t } = useTranslation();

        const columns = useMemo(
            () => getColumns(shippingOrderStore.current!.id),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [shippingOrderStore.current]
        );

        return (
            <TableWithInlineEditing
                getColumns={columns as () => ColumnDef<{ id: GridRowId }, IShippingOrderCargo>[]}
                store={store}
                onBeforeCreateModelTransform={(formModel: FieldValues) => ({
                    ...formModel,
                    packageQuantity: parseInt(formModel.packageQuantity, 10),
                    shippingOrder: {
                        id: shippingOrderStore.current!.id,
                    },
                    length: parseFloat(formModel.dimensions?.length ?? 0),
                    width: parseFloat(formModel.dimensions?.width ?? 0),
                    height: parseFloat(formModel.dimensions?.height ?? 0),
                    volume: parseFloat(formModel.dimensions?.volume ?? 0),
                    weight: parseFloat(formModel.dimensions?.weight ?? 0),
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
                        packageQuantity: parseInt(formModel.packageQuantity, 10),
                        shippingOrder: {
                            id: shippingOrderStore.current!.id,
                        },
                        length: parseFloat(formModel.dimensions.length),
                        width: parseFloat(formModel.dimensions.width),
                        height: parseFloat(formModel.dimensions.height),
                        volume: parseFloat(formModel.dimensions.volume),
                        weight: parseFloat(formModel.dimensions.weight),
                        ...dimensions,
                    };
                }}
                messages={{
                    editSuccess: t("ShippingOrderCargo:dialog.editSuccess"),
                    createSuccess: t("ShippingOrderCargo:dialog.createSuccess"),
                    deleteSuccess: t("ShippingOrderCargo:dialog.deleteSuccess"),
                }}
                permissionPath="ShippingOrder.ShippingOrderCargo"
                footerSettings={{
                    useNextButton: true,
                    label: {
                        create: t("Action:add"),
                    },
                }}
                isReadOnly={isReadOnly}
                fetchParams={{
                    shippingOrder: {
                        id: shippingOrderStore.current?.id,
                    },
                    deleted: false,
                }}
            />
        );
    }
);

export default ShippingOrderCargoTable;
