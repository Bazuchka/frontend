import { Instance, types } from "mobx-state-tree";
import { ForeignKey, IsoDate } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { TermOfPeriodicServiceStore } from "../TermOfPeriodicServiceStore";
import { TermOfRequestedServiceStore } from "../TermOfRequestedServiceStore";

export const TermOfService = types.model("TermOfService", {
    id: types.identifier,
    code: types.string,
    contract: types.maybeNull(ForeignKey),
    terminalArea: types.string,
    validFrom: IsoDate,
    validTo: types.maybeNull(IsoDate),
    active: types.boolean,
    indefinitely: types.boolean,
    syncId: types.string,
    legalEntity: ForeignKey,
    currency: ForeignKey,
    client: ForeignKey,
});

export const FullTermOfService = types.compose(
    "FullTermOfService",
    TermOfService,
    types
        .model({
            syncId: types.string,
            termOfPeriodicService: types.optional(TermOfPeriodicServiceStore, () =>
                TermOfPeriodicServiceStore.create()
            ),
            termOfRequestedService: types.optional(TermOfRequestedServiceStore, () =>
                TermOfRequestedServiceStore.create()
            ),
        })
        .postProcessSnapshot((snapshot) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { termOfPeriodicService, termOfRequestedService, ...rest } = snapshot;
            return rest;
        })
);

export const TermOfServiceStore = createBaseStoreWithViewMediator({
    storeName: "TermOfService",
    storeListModel: TermOfService,
    storeMainInfoModel: FullTermOfService,
});

export interface ITermOfService extends Instance<typeof TermOfService> {}
export interface IFullTermOfService extends Instance<typeof FullTermOfService> {}
