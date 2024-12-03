import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent } from "react";
import { TableWithNavigation } from "src/features/TableWithNavigation";
import { getColumns } from "./configs";
import userStore, { IUser } from "src/features/Administration/Users/store/UserStore";
import { SortingDirection } from "src/shared/request/types";

interface UserTableProps {}

const UserTable: FunctionComponent<UserTableProps> = observer(() => {
    return (
        <>
            <TableWithNavigation
                getColumns={getColumns as () => ColumnDef<{ id: GridRowId }, IUser>[]}
                store={userStore}
                navigationPaths={{
                    info: "/users",
                    create: "/users/create",
                }}
                permissionPath="ClientGood"
                isLoading={userStore.state.isLoading}
                fetchParams={{
                    sortingColumn: "name",
                    sortingDirection: SortingDirection.ASC,
                }}
            />
        </>
    );
});

export default UserTable;
