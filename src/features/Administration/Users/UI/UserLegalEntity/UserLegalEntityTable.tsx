import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FunctionComponent } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    IUserLegalEntity,
    UserLegalEntityStore,
} from "src/features/Administration/Users/store/UserLegalEntityStore";
import userStore from "src/features/Administration/Users/store/UserStore";
import TableWithInlineEditing from "src/features/TableWithInlineEditing/TableWithInlineEditing";
import { getColumns } from "./configs";

interface UserLegalEntityTableProps {
    store: Instance<typeof UserLegalEntityStore>;
    userId: string;
    isReadOnly: boolean;
}

const UserLegalEntityTable: FunctionComponent<UserLegalEntityTableProps> = observer(
    ({ store, userId, isReadOnly }) => {
        const { t } = useTranslation();

        const getTableColumns: () => ColumnDef<{ id: GridRowId }, IUserLegalEntity>[] = () => {
            return getColumns(userId) as ColumnDef<{ id: GridRowId }, IUserLegalEntity>[];
        };

        return (
            <TableWithInlineEditing
                getColumns={getTableColumns}
                store={store}
                messages={{
                    editSuccess: t("User:dialog.legalEntity.editSuccess"),
                    createSuccess: t("User:dialog.legalEntity.createSuccess"),
                    deleteSuccess: t("User:dialog.client.deleteSuccess"),
                }}
                onBeforeCreateModelTransform={(formModel: FieldValues) => {
                    return {
                        ...formModel,
                        userId: userStore.current?.id,
                    };
                }}
                onBeforeUpdateModelTransform={(formModel: FieldValues) => {
                    return {
                        ...formModel,
                        userId: userStore.current?.id,
                    };
                }}
                isReadOnly={isReadOnly}
                permissionPath="User.UserLegalEntity"
                fetchParams={{
                    userId: userStore.current?.id,
                }}
                footerSettings={{
                    label: {
                        create: t("Action:add"),
                    },
                }}
            />
        );
    }
);

export default UserLegalEntityTable;
