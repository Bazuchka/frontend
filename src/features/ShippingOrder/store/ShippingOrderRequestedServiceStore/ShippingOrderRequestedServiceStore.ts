import { Instance, types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

export const ShippingOrderRequestedService = types.model("ShippingOrderRequestedService", {
    id: types.identifier,
    code: types.maybe(types.string),
    rate: types.number,
    syncId: types.maybe(types.string),
    actualQuantity: types.number,
    plannedQuantity: types.number,
    priceWithoutVAT: types.number,
    priceWithVAT: types.number,
    termOfRequestedService: ForeignKey,
    unitOfMeasure: ForeignKey,
});

export const ShippingOrderRequestedServiceStore = createBaseStoreWithViewMediator({
    storeName: "ShippingOrderRequestedService",
    storeListModel: ShippingOrderRequestedService,
    storeMainInfoModel: ShippingOrderRequestedService,
});

export interface IShippingOrderRequestedService
    extends Instance<typeof ShippingOrderRequestedService> {}
