import { Instance, types } from "mobx-state-tree";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { UserClientStore } from "src/features/Administration/Users/store/UserClientStore";
import { UserLegalEntityStore } from "src/features/Administration/Users/store/UserLegalEntityStore";
import { UserRoleStore } from "src/features/Administration/Users/store/UserRoleStore/UserRoleStore";

export const User = types.model("User", {
    id: types.identifier,
    username: types.string,
    fullname: types.maybeNull(types.string),
    type: types.string,
    active: types.boolean,
});

export const FullUser = types.compose(
    "FullUser",
    User,
    types.model({
        firstName: types.maybeNull(types.string),
        middleName: types.maybeNull(types.string),
        lastName: types.maybeNull(types.string),
        city: types.maybeNull(types.string),
        address: types.maybeNull(types.string),
        phoneNumber: types.maybeNull(types.string),
        password: types.maybeNull(types.string),
        email: types.maybeNull(types.string),
        additionalEmail: types.maybeNull(types.string),
        type: types.maybeNull(types.string),
        clients: types.optional(UserClientStore, () =>
            UserClientStore.create({
                state: {
                    isFetching: true, // set true as default state
                },
            })
        ),
        legalEntities: types.optional(UserLegalEntityStore, () =>
            UserLegalEntityStore.create({
                state: {
                    isFetching: true, // set true as default state
                },
            })
        ),
        roles: types.optional(UserRoleStore, () =>
            UserRoleStore.create({
                state: {
                    isFetching: true, // set true as default state
                },
            })
        ),
    })
);

const UserStore = createBaseStoreWithViewMediator({
    storeName: "User",
    storeListModel: User,
    storeMainInfoModel: FullUser,
});

export default UserStore;

export interface IUser extends Instance<typeof User> {}
