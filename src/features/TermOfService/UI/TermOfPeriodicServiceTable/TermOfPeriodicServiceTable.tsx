import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TableWithInlineEditing from "src/features/TableWithInlineEditing/TableWithInlineEditing";
import { ITermOfPeriodicService } from "../../store/TermOfPeriodicServiceStore";
import { termOfServiceStore } from "../../store/TermOfServiceStore";
import { getColumns } from "./configs";

interface TermOfPeriodicServiceTableProps {}

const TermOfPeriodicServiceTable: FunctionComponent<TermOfPeriodicServiceTableProps> = observer(
    () => {
        const { t } = useTranslation();

        return (
            <TableWithInlineEditing
                getColumns={
                    getColumns as () => ColumnDef<{ id: GridRowId }, ITermOfPeriodicService>[]
                }
                store={termOfServiceStore.current!.termOfPeriodicService}
                messages={{
                    editSuccess: t("TermOfPeriodicService:dialog.editSuccess"),
                    createSuccess: t("TermOfPeriodicService:dialog.createSuccess"),
                    deleteSuccess: t("TermOfPeriodicService:dialog.deleteSeccess"),
                }}
                onBeforeCreateModelTransform={(formModel: FieldValues) => {
                    return {
                        ...formModel,
                        code: formModel.service.code,
                        termOfService: { id: termOfServiceStore.current!.id },
                        active: true,
                    };
                }}
                onBeforeUpdateModelTransform={(formModel: FieldValues) => {
                    return {
                        ...formModel,
                        code: formModel.service.code,
                    };
                }}
                fetchParams={{
                    active: true,
                    deleted: false,
                    termOfService: {
                        id: termOfServiceStore.current?.id,
                    },
                }}
                permissionPath="TermOfService.TermOfPeriodicService"
            />
        );
    }
);

export default TermOfPeriodicServiceTable;
