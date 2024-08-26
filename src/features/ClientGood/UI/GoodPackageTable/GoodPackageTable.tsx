import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TableWithInlineEditing from "src/features/TableWithInlineEditing/TableWithInlineEditing";
import clientGoodStore from "../../store/ClientGoodStore";
import { IGoodPackage } from "../../store/GoodPackageStore";
import { getColumns } from "./configs";

interface GoodPackageTableProps {}

const GoodPackageTable: FunctionComponent<GoodPackageTableProps> = observer(() => {
    const { t } = useTranslation();

    return (
        <TableWithInlineEditing
            getColumns={getColumns as () => ColumnDef<{ id: GridRowId }, IGoodPackage>[]}
            store={clientGoodStore.current!.packages}
            messages={{
                editSuccess: t("GoodPackage:dialog.editSuccess"),
                createSuccess: t("GoodPackage:dialog.createSuccess"),
            }}
            onBeforeCreateModelTransform={(formModel: FieldValues) => {
                return {
                    ...formModel,
                    clientGood: { id: clientGoodStore.current?.id },
                    conversionQty: parseInt(formModel.conversionQty, 10),
                    level: parseInt(formModel.level, 10),
                    length: parseInt(formModel.length, 10),
                    width: parseInt(formModel.width, 10),
                    height: parseInt(formModel.height, 10),
                    volume: parseFloat(formModel.volume),
                    weight: parseFloat(formModel.weight),
                    tareWeight: parseFloat(formModel.tareWeight),
                };
            }}
            onBeforeUpdateModelTransform={(formModel: FieldValues) => {
                return {
                    ...formModel,
                    clientGood: { id: clientGoodStore.current?.id },
                    conversionQty: parseInt(formModel.conversionQty, 10),
                    level: parseInt(formModel.level, 10),
                    length: parseInt(formModel.length, 10),
                    width: parseInt(formModel.width, 10),
                    height: parseInt(formModel.height, 10),
                    volume: parseFloat(formModel.volume),
                    weight: parseFloat(formModel.weight),
                    tareWeight: parseFloat(formModel.tareWeight),
                };
            }}
            fetchParams={{
                clientGood: {
                    id: clientGoodStore.current?.id,
                },
            }}
            permissionPath="ClientGood.GoodPackage"
        />
    );
});

export default GoodPackageTable;
