import { Instance, types } from "mobx-state-tree";
import { ForeignKey, ForeignKeyShort } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { ViewMediator } from "src/shared/store";

export const RailwayCarriage = types.model("RailwayCarriage", {
    id: types.identifier,
    code: types.maybeNull(types.string),
    liftingCapacity: types.number,
    type: types.maybeNull(ForeignKey),
});

export const ReceivingOrderRailwayCarriage = types.model("ReceivingOrderRailwayCarriage", {
    id: types.identifier,
    railwayCarriage: types.maybeNull(RailwayCarriage),
    receivingOrderEtranInvoice: types.maybeNull(ForeignKey),
    receivingOrder: ForeignKeyShort,
    type: types.maybeNull(ForeignKey),
    liftingCapacity: types.maybeNull(types.number),
});

const BaseStore = createBaseStoreWithViewMediator({
    storeName: "ReceivingOrderRailwayCarriage",
    storeListModel: ReceivingOrderRailwayCarriage,
    storeMainInfoModel: ReceivingOrderRailwayCarriage,
});

export const ReceivingOrderRailwayCarriageStore = types
    .compose(BaseStore, ViewMediator)
    .named("ReceivingOrderRailwayCarriageStore");

export interface IReceivingOrderRailwayCarriage
    extends Instance<typeof ReceivingOrderRailwayCarriage> {}
