import { flow, getParent, IAnyModelType, Instance, types } from "mobx-state-tree";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { getBaseActions } from "src/shared/request/baseActions";
import { IRole } from "../RoleStore/RoleStore";

export interface ITableViewPermission {
    rootId: string | null;
    id: string;
    path: string;
    type: string;
    level: string;
    children: ITableViewPermission[];
    depth: number;
}

const getTableViewPermissions = (permission: IPermission[], depth = 0): ITableViewPermission[] => {
    return permission.map((p) => ({
        rootId: p.id,
        id: p.permission.id,
        path: p.permission.path,
        type: p.permission.type,
        level: p.level,
        children: getTableViewPermissions(p.children || [], depth + 1),
        depth,
    }));
};

export const Permission = types.model("Permission", {
    id: types.maybeNull(types.string),
    level: types.string,
    children: types.maybeNull(types.array(types.late((): IAnyModelType => Permission))),
    permission: types.frozen<{
        id: string;
        path: string;
        type: string;
    }>(),
});

export const PermissionStore = createBaseStoreWithViewMediator({
    storeName: "Permission",
    storeListModel: Permission,
    storeMainInfoModel: Permission,
})
    .views((self) => ({
        get dataArray() {
            return getTableViewPermissions(self.data);
        },
    }))
    .actions((self) => {
        const fetch = flow(function* () {
            self.state.isFetching = true;
            const response = yield getBaseActions(
                `/role/${(getParent(self) as IRole).id}/permission/tree`
            ).get(
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            self.state.isFetching = false;
            self.data = response.data;
        });

        const update = flow(function* (data: ITableViewPermission) {
            self.state.isUpdating = true;
            let result;
            if (data.rootId === null) {
                result = yield getBaseActions().create(
                    {
                        roleId: (getParent(self) as IRole).id,
                        permissionId: data.id,
                        level: data.level,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        serviceUrl: `/role/${(getParent(self) as IRole).id}/permission`,
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ) as any;
            } else {
                result = yield getBaseActions(
                    `/role/${(getParent(self) as IRole).id}/permission`
                ).update(
                    data.rootId,
                    {
                        roleId: (getParent(self) as IRole).id,
                        permissionId: data.id,
                        level: data.level,
                        id: data.rootId,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        serviceUrl: `/role/${(getParent(self) as IRole).id}/permission/${data.rootId}`,
                    }
                );
            }
            self.state.isUpdating = false;
            return result;
        });
        return {
            fetch,
            update,
        };
    });

export interface IPermission extends Instance<typeof Permission> {}
