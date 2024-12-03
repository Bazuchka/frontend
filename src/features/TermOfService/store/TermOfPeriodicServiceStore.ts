import { Instance, types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

export const TermOfPeriodicService = types.model("TermOfPeriodicService", {
    id: types.identifier,
    code: types.maybe(types.string),
    termOfService: ForeignKey,
    service: ForeignKey,
    unitOfMeasure: types.maybe(ForeignKey),
    frequencyOfServices: ForeignKey,
    rate: types.number,
    active: types.maybe(types.boolean),
    syncId: types.string,
});

export const TermOfPeriodicServiceStore = createBaseStoreWithViewMediator({
    storeName: "TermOfPeriodicService",
    storeListModel: TermOfPeriodicService,
    storeMainInfoModel: TermOfPeriodicService,
});

export interface ITermOfPeriodicService extends Instance<typeof TermOfPeriodicService> {}
