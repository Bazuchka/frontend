import { Instance, types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

export const TermOfRequestedService = types.model("TermsOfRequestedService", {
    id: types.identifier,
    code: types.string,
    termOfService: ForeignKey,
    service: ForeignKey,
    rate: types.number,
    active: types.boolean,
    syncId: types.string,
    clientOrderType: types.string,
    required: types.boolean,
    unitOfMeasure: types.maybe(ForeignKey),
    calculationMethod: types.string,
});

export const TermOfRequestedServiceStore = createBaseStoreWithViewMediator({
    storeName: "TermOfRequestedService",
    storeListModel: TermOfRequestedService,
    storeMainInfoModel: TermOfRequestedService,
});

export interface ITermOfRequestedService extends Instance<typeof TermOfRequestedService> {}
