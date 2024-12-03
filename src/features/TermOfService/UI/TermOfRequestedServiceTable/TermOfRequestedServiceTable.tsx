import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TableWithInlineEditing from "src/features/TableWithInlineEditing/TableWithInlineEditing";
import { ITermOfRequestedService } from "../../store/TermOfRequestedServiceStore";
import { termOfServiceStore } from "../../store/TermOfServiceStore";
import { getColumns } from "./configs";

interface TermOfRequestedServiceTableProps {}

const TermOfRequestedServiceTable: FunctionComponent<TermOfRequestedServiceTableProps> = observer(
    () => {
        const { t } = useTranslation();

        return (
            <TableWithInlineEditing
                getColumns={
                    getColumns as () => ColumnDef<{ id: GridRowId }, ITermOfRequestedService>[]
                }
                store={termOfServiceStore.current!.termOfRequestedService}
                messages={{
                    editSuccess: t("TermOfRequestedService:dialog.editSuccess"),
                    createSuccess: t("TermOfRequestedService:dialog.createSuccess"),
                    deleteSuccess: t("TermOfRequestedService:dialog.deleteSeccess"),
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
                permissionPath="TermOfService.TermOfRequestedService"
            />
        );
    }
);

export default TermOfRequestedServiceTable;
