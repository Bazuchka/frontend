import { Instance, types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

export const ClientGoodType = types.model("ClientGoodType", {
    id: types.identifier,
    clientSyncId: types.maybeNull(types.string),
    client: ForeignKey,
    code: types.string,
    active: types.boolean,
    syncId: types.string,
    isVariable: types.maybe(types.boolean),
    hasClientGoods: types.boolean,
});

const ClientGoodTypeStore = createBaseStoreWithViewMediator({
    storeName: "ClientGoodType",
    storeListModel: ClientGoodType,
    storeMainInfoModel: ClientGoodType,
});

export default ClientGoodTypeStore;

export interface IClientGoodType extends Instance<typeof ClientGoodType> {}
