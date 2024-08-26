import { Instance, types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

export const ShippingOrderCargo = types.model("ShippingOrderCargo", {
    id: types.identifier,
    code: types.maybe(types.string),
    syncId: types.maybe(types.string),
    shippingOrderGood: ForeignKey,
    barcode: types.maybeNull(ForeignKey),
    goodPackage: ForeignKey,
    packageQuantity: types.refinement(types.number, (value) => value >= 0),
    conversionQuantity: types.refinement(types.number, (value) => value >= 0),
    totalQuantity: types.refinement(types.number, (value) => value >= 0),
    length: types.maybeNull(types.refinement(types.number, (value) => value >= 0)),
    width: types.maybeNull(types.refinement(types.number, (value) => value >= 0)),
    height: types.maybeNull(types.refinement(types.number, (value) => value >= 0)),
    volume: types.maybeNull(types.refinement(types.number, (value) => value >= 0)),
    weight: types.maybeNull(types.refinement(types.number, (value) => value >= 0)),
});

export const ShippingOrderCargoStore = createBaseStoreWithViewMediator({
    storeName: "ShippingOrderCargo",
    storeListModel: ShippingOrderCargo,
    storeMainInfoModel: ShippingOrderCargo,
});

export interface IShippingOrderCargo extends Instance<typeof ShippingOrderCargo> {}
