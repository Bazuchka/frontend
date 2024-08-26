import { Instance, types } from "mobx-state-tree";
import { BatchStore } from "src/features/Batch/store/Batch";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { ViewMediator } from "src/shared/store";

export const ClientGoodShort = types.model("ClientGoodShort", {
    batchAccountingType: types.string,
    id: types.identifier,
    code: types.string,
    name: types.maybeNull(types.string),
    unitOfMeasure: ForeignKey,
    tempRegime: types.maybeNull(ForeignKey),
    dangerClass: ForeignKey,
});

export const ReceivingOrderGood = types.model("ReceivingOrderGood", {
    id: types.identifier,
    receivingOrder: types.maybeNull(ForeignKey),
    client: types.maybe(ForeignKey),
    name: types.maybeNull(types.string),
    batch: ForeignKey,
    totalPrice: types.number,
    price: types.number,
    factQuantity: types.maybeNull(types.number),
    plannedQuantity: types.number,
    clientGood: ClientGoodShort,
    unitOfMeasure: types.maybe(ForeignKey),
    tempRegime: types.maybeNull(ForeignKey),
    dangerClass: types.maybe(ForeignKey),
    receivingOrderGoodBatch: types.optional(BatchStore, () => BatchStore.create()),
    goodVariant: types.maybeNull(ForeignKey),
});

const BaseStore = createBaseStoreWithViewMediator({
    storeName: "ReceivingOrderGood",
    storeListModel: ReceivingOrderGood,
    storeMainInfoModel: ReceivingOrderGood,
});

export const ReceivingOrderGoodStore = types
    .compose(BaseStore, ViewMediator)
    .named("ReceivingOrderGoodStore");

export interface IReceivingOrderGoodStore extends Instance<typeof ReceivingOrderGood> {}
export interface IFullReceivingOrderGood extends Instance<typeof ReceivingOrderGood> {}
