import { Instance, types } from "mobx-state-tree";
import GoodPackageStore from "src/features/ClientGood/store/GoodPackageStore/GoodPackageStore";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

export const Client = types.model("Client", {
    id: types.identifier,
    phoneNumber: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    code: types.string,
    active: types.boolean,
});

export const FullClient = types.compose(
    "FullClient",
    Client,
    types.model({
        name: types.maybeNull(types.string),
        addressFact: types.maybeNull(types.string),
        packages: types.optional(GoodPackageStore, {
            state: {},
            data: [],
        }),
    })
);

const ClientStore = createBaseStoreWithViewMediator({
    storeName: "Client",
    storeListModel: Client,
    storeMainInfoModel: FullClient,
});

export default ClientStore;

export interface IClient extends Instance<typeof Client> {}
export interface IFullClient extends Instance<typeof FullClient> {}
