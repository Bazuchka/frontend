import { Instance, types } from "mobx-state-tree";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { PermissionStore } from "../PermissionStore";

export const Role = types.model("Role", {
    id: types.identifier,
    code: types.string,
    name: types.maybeNull(types.string),
    active: types.boolean,
});

export const RoleFull = types
    .compose(
        "RoleFull",
        Role,
        types.model({
            permissions: types.optional(PermissionStore, () => PermissionStore.create()),
        })
    )
    .postProcessSnapshot((snapshot) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { permissions, ...rest } = snapshot;
        return rest;
    });

const RoleStore = createBaseStoreWithViewMediator({
    storeName: "Role",
    storeListModel: Role,
    storeMainInfoModel: RoleFull,
});

export default RoleStore;

export interface IRole extends Instance<typeof Role> {}
export interface IRoleFull extends Instance<typeof RoleFull> {}
