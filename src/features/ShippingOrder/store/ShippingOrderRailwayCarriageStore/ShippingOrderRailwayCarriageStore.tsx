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

export const ShippingOrderRailwayCarriage = types.model("ShippingOrderRailwayCarriage", {
    id: types.identifier,
    railwayCarriage: types.maybeNull(RailwayCarriage),
    shippingOrderEtranInvoice: types.maybeNull(ForeignKey),
    shippingOrder: ForeignKeyShort,
    type: types.maybeNull(ForeignKey),
    liftingCapacity: types.maybeNull(types.number),
});

const BaseStore = createBaseStoreWithViewMediator({
    storeName: "ShippingOrderRailwayCarriage",
    storeListModel: ShippingOrderRailwayCarriage,
    storeMainInfoModel: ShippingOrderRailwayCarriage,
});

export const ShippingOrderRailwayCarriageStore = types
    .compose(BaseStore, ViewMediator)
    .named("ShippingOrderRailwayCarriageStore");

export interface IShippingOrderRailwayCarriage
    extends Instance<typeof ShippingOrderRailwayCarriage> {}
