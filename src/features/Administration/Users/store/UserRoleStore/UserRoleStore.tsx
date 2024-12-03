import { Instance, types } from "mobx-state-tree";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { ViewMediator } from "src/shared/store";

export const UserRole = types.model("UserRole", {
    id: types.identifier,
    code: types.string,
    active: types.boolean,
    restricted: types.boolean,
});

const BaseStore = createBaseStoreWithViewMediator({
    storeName: "UserRole",
    storeListModel: UserRole,
    storeMainInfoModel: UserRole,
});

export const UserRoleStore = types.compose(BaseStore, ViewMediator).named("UserRole");

export interface IUserRole extends Instance<typeof UserRole> {}
