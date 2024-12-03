import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import TableWithInlineEditing from "src/features/TableWithInlineEditing/TableWithInlineEditing";
import clientGoodStore from "../../store/ClientGoodStore";
import { IGoodPackageBarcode } from "../../store/GoodPackageBarcodeStore";
import { getColumns } from "./configs";
import { FieldValues } from "react-hook-form";

interface GoodPackageBarcodeTableProps {
    fetchParams?: Record<string, unknown>;
}

const GoodPackageBarcodeTable: FunctionComponent<GoodPackageBarcodeTableProps> = observer(
    (props) => {
        const { t } = useTranslation();

        return (
            <TableWithInlineEditing
                getColumns={
                    (() => {
                        return getColumns(clientGoodStore.current?.id);
                    }) as () => ColumnDef<{ id: GridRowId }, IGoodPackageBarcode>[]
                }
                onBeforeCreateModelTransform={(formModel: FieldValues) => {
                    return {
                        ...formModel,
                        goodVariant: props.fetchParams!.goodVariant,
                    };
                }}
                onBeforeUpdateModelTransform={(formModel: FieldValues) => {
                    return {
                        ...formModel,
                        goodVariant: props.fetchParams!.goodVariant,
                    };
                }}
                store={clientGoodStore.current!.barcodes}
                messages={{
                    editSuccess: t("GoodPackageBarcode:dialog.editSuccess"),
                    createSuccess: t("GoodPackageBarcode:dialog.createSuccess"),
                }}
                fetchParams={props.fetchParams}
                permissionPath="ClientGood.GoodPackageBarcode"
            />
        );
    }
);

export default GoodPackageBarcodeTable;
