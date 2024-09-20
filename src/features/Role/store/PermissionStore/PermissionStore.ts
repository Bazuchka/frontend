import { flow, getParent, IAnyModelType, Instance, types } from "mobx-state-tree";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { getBaseActions } from "src/shared/request/baseActions";
import { IRole } from "../RoleStore/RoleStore";

export interface ITableViewPermission {
    id: string;
    path: string;
    type: string;
    level: string;
    children: ITableViewPermission[];
    depth: number;
}

const getTableViewPermissions = (permission: IPermission[], depth = 0): ITableViewPermission[] => {
    return permission.map((p) => ({
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
        get tableView() {
            return getTableViewPermissions(self.dataArray);
        },
    }))
    .actions((self) => {
        const getTree = flow(function* () {
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

            self.data = response.data;
        });
        return {
            getTree,
        };
    });

export interface IPermission extends Instance<typeof Permission> {}
