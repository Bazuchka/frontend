import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FunctionComponent } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TableWithInlineEditing from "src/features/TableWithInlineEditing/TableWithInlineEditing";
import {
    UserClientStore,
    IUserClient,
} from "src/features/Administration/Users/store/UserClientStore";
import userStore from "src/features/Administration/Users/store/UserStore";
import { getColumns } from "./configs";

interface UserClientTableProps {
    store: Instance<typeof UserClientStore>;
    isReadOnly: boolean;
}

const UserClientTable: FunctionComponent<UserClientTableProps> = observer((props) => {
    const { store, isReadOnly } = props;
    const { t } = useTranslation();

    return (
        <TableWithInlineEditing
            getColumns={getColumns as () => ColumnDef<{ id: GridRowId }, IUserClient>[]}
            store={store}
            messages={{
                editSuccess: t("User:dialog.client.editSuccess"),
                createSuccess: t("User:dialog.client.createSuccess"),
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
            permissionPath="User.UserClient"
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
});

export default UserClientTable;
