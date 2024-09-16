import { flow, getParent, IAnyModelType, Instance, types } from "mobx-state-tree";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { getBaseActions } from "src/shared/request/baseActions";
import { IRole } from "../RoleStore/RoleStore";

export const Permission = types.model("Permission", {
    id: types.identifier,
    path: types.string,
    level: types.maybe(types.string),
    type: types.maybe(types.string),
    children: types.array(types.late((): IAnyModelType => Permission)),
});

export const PermissionStore = createBaseStoreWithViewMediator({
    storeName: "Permission",
    storeListModel: Permission,
    storeMainInfoModel: Permission,
}).actions((self) => {
    const getTree = flow(function* () {
        const response = yield getBaseActions(
            `/role/${(getParent(self) as IRole).id}/permission/tree`
        ).get();

        self.current = response.data;
    });
    return {
        getTree,
    };
});

export interface IPermission extends Instance<typeof Permission> {}
