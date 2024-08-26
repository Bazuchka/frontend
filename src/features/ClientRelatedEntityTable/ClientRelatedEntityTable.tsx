import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ICard } from "src/shared/UI/iCard";
import TableWithInlineEditing from "../TableWithInlineEditing/TableWithInlineEditing";
import { getColumns } from "./configs";
import clientRelatedEntityStore from "./store";
import { IClientRelatedEntity } from "./store/ClientRelatedEntityStore";

interface ClientRelatedEntityTableProps {}

const ClientRelatedEntityTable: FunctionComponent<ClientRelatedEntityTableProps> = observer(() => {
    const { t } = useTranslation();

    return (
        <ICard cardSize={12} col={10}>
            <TableWithInlineEditing
                getColumns={
                    getColumns as () => ColumnDef<{ id: GridRowId }, IClientRelatedEntity>[]
                }
                store={clientRelatedEntityStore}
                messages={{
                    editSuccess: t("LegalEntity:dialog.editSuccess"),
                    createSuccess: t("LegalEntity:dialog.createSuccess"),
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
                onRowSelected={(id) => clientRelatedEntityStore.setCurrent(id as string)}
                permissionPath="ClientRelatedEntity"
            />
        </ICard>
    );
});

export default ClientRelatedEntityTable;
