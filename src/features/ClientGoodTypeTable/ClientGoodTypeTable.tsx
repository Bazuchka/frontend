import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ICard } from "src/shared/UI/iCard";
import TableWithInlineEditing from "../TableWithInlineEditing/TableWithInlineEditing";
import { getColumns } from "./configs";
import clientGoodTypeTableStore from "./store";
import { IClientGoodType } from "./store/ClientGoodTypeStore";

interface ClientGoodTypeTableProps {}

const ClientGoodTypeTable: FunctionComponent<ClientGoodTypeTableProps> = observer(() => {
    const { t } = useTranslation();

    return (
        <ICard cardSize={12} col={10}>
            <TableWithInlineEditing
                getColumns={getColumns as () => ColumnDef<{ id: GridRowId }, IClientGoodType>[]}
                store={clientGoodTypeTableStore}
                messages={{
                    editSuccess: t("ClientGoodType:dialog.editSuccess"),
                    createSuccess: t("ClientGoodType:dialog.createSuccess"),
                }}
                onBeforeCreateModelTransform={(formModel: FieldValues) => {
                    return {
                        ...formModel,
                        client: { id: formModel.client.id },
                    };
                }}
                onBeforeUpdateModelTransform={(formModel: FieldValues) => {
                    return {
                        ...formModel,
                        client: { id: formModel.client.id },
                    };
                }}
                permissionPath="ClientGoodType"
            />
        </ICard>
    );
});

export default ClientGoodTypeTable;
