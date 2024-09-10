import { Instance, types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

export const UserClient = types.model("UserClient", {
    id: types.identifier,
    client: types.maybe(ForeignKey),
});

const UserClientStore = createBaseStoreWithViewMediator({
    storeName: "UserClient",
    storeListModel: UserClient,
    storeMainInfoModel: UserClient,
});

export default UserClientStore;

export interface IUserClient extends Instance<typeof UserClient> {}
