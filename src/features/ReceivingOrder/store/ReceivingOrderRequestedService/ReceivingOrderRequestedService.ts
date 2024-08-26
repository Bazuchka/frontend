import { Instance, types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

export const ReceivingOrderRequestedService = types.model("ReceivingOrderRequestedService", {
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

export const ReceivingOrderRequestedServiceStore = createBaseStoreWithViewMediator({
    storeName: "ReceivingOrderRequestedService",
    storeListModel: ReceivingOrderRequestedService,
    storeMainInfoModel: ReceivingOrderRequestedService,
});

export interface IReceivingOrderRequestedService
    extends Instance<typeof ReceivingOrderRequestedService> {}
