import { Instance, types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { ViewMediator } from "src/shared/store";

export const Batch = types.model("BatchShort", {
    code: types.string,
    active: types.boolean,
    name: types.maybe(types.string),
    client: ForeignKey,
    clientGood: ForeignKey,
    batchAccountingType: types.string,
    manufactureDate: types.string,
    batchBarcode: types.maybeNull(types.string),
    goodVariant: types.maybeNull(ForeignKey),
});

const BaseStore = createBaseStoreWithViewMediator({
    storeName: "Batch",
    storeListModel: Batch,
    storeMainInfoModel: Batch,
});

export const BatchStore = types.compose(BaseStore, ViewMediator).named("BatchStore");

export interface IBatch extends Instance<typeof Batch> {}
