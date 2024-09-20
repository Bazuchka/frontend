import { Instance, types } from "mobx-state-tree";
import { BatchStore } from "src/features/Batch/store/Batch";
import { ForeignKey, ForeignKeyShort } from "src/shared/entities";
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

export const ShippingOrderGood = types.model("ShippingOrderGood", {
    id: types.identifier,
    shippingOrder: types.maybeNull(ForeignKeyShort),
    client: types.maybe(ForeignKey),
    name: types.maybeNull(types.string),
    batch: types.maybeNull(ForeignKey),
    totalPrice: types.number,
    price: types.number,
    actualQuantity: types.maybeNull(types.number),
    plannedQuantity: types.number,
    clientGood: ClientGoodShort,
    unitOfMeasure: types.maybe(ForeignKey),
    tempRegime: types.maybeNull(ForeignKey),
    dangerClass: types.maybe(ForeignKey),
    shippingOrderGoodBatch: types.optional(BatchStore, () => BatchStore.create()),
    goodVariant: types.maybeNull(ForeignKey),
});

const BaseStore = createBaseStoreWithViewMediator({
    storeName: "ShippingOrderGood",
    storeListModel: ShippingOrderGood,
    storeMainInfoModel: ShippingOrderGood,
});

export const ShippingOrderGoodStore = types
    .compose(BaseStore, ViewMediator)
    .named("ShippingOrderGoodStore");

export interface IShippingOrderGoodStore extends Instance<typeof ShippingOrderGood> {}
export interface IFullShippingOrderGood extends Instance<typeof ShippingOrderGood> {}
