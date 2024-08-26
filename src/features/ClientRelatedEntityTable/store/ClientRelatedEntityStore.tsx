import { Instance, types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

const ClientRelatedEntity = types.model("ClientRelatedEntitiy", {
    id: types.identifier,
    code: types.string,
    inn: types.maybeNull(types.string),
    kpp: types.maybeNull(types.string),
    client: ForeignKey,
    isShipper: types.boolean,
    isConsignee: types.boolean,
    isCarrier: types.boolean,
    legalEntity: ForeignKey,
    active: types.boolean,
    syncId: types.string,
});

const ClientRelatedEntityStore = createBaseStoreWithViewMediator({
    storeName: "ClientRelatedEntity",
    storeListModel: ClientRelatedEntity,
    storeMainInfoModel: ClientRelatedEntity,
});

export default ClientRelatedEntityStore;

export interface IClientRelatedEntity extends Instance<typeof ClientRelatedEntity> {}
