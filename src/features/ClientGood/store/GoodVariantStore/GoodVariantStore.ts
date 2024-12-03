import { Instance, types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

export const GoodVariant = types.model("GoodVariantStore", {
    id: types.identifier,
    code: types.string,
    item: types.string,
    client: ForeignKey,
    clientGood: ForeignKey,
    syncId: types.string,
    active: types.boolean,
});

const GoodVariantStore = createBaseStoreWithViewMediator({
    storeName: "GoodVariant",
    storeListModel: GoodVariant,
    storeMainInfoModel: GoodVariant,
});

export default GoodVariantStore;

export interface IGoodVariant extends Instance<typeof GoodVariant> {}
