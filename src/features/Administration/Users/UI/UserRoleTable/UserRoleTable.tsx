import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FunctionComponent } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TableWithInlineEditing from "src/features/TableWithInlineEditing/TableWithInlineEditing";
import UserRoleStore, { IUserRole } from "src/features/Administration/Users/store/UserRoleStore";
import userStore from "src/features/Administration/Users/store/UserStore";
import { getColumns } from "./configs";
import { BaseActionOptions } from "src/shared/request/types";

interface ReceivingOrderGoodTableProps {
    store: Instance<typeof UserRoleStore>;
    isReadOnly: boolean;
}

const UserRoleTable: FunctionComponent<ReceivingOrderGoodTableProps> = observer((props) => {
    const { store, isReadOnly } = props;
    const { t } = useTranslation();

    return (
        <TableWithInlineEditing
            getColumns={getColumns as () => ColumnDef<{ id: GridRowId }, IUserRole>[]}
            store={store}
            messages={{
                createSuccess: t("User:dialog.role.createSuccess"),
            }}
            onBeforeCreateModelTransform={(
                formModel: FieldValues,
                actionOptions?: BaseActionOptions
            ) => {
                actionOptions!.serviceUrl = `${actionOptions!.serviceUrl}/${formModel.role.id}`;
                return {
                    ...formModel,
                };
            }}
            onBeforeUpdateModelTransform={(formModel: FieldValues) => {
                return {
                    ...formModel,
                };
            }}
            isReadOnly={isReadOnly}
            permissionPath="User.UserRole"
            fetchParams={{
                userId: userStore.current?.id,
            }}
            actionOptions={{
                serviceUrl: `/user/${userStore.current?.id}/role`,
                method: "GET",
            }}
            footerSettings={{
                label: {
                    create: t("Action:add"),
                },
            }}
        />
    );
});

export default UserRoleTable;
