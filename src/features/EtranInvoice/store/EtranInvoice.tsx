import { Instance, types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { ViewMediator } from "src/shared/store";

export const EtranInvoice = types.model("EtranInvoice", {
    id: types.identifier,
    code: types.maybeNull(types.string),
    active: types.boolean,
    client: ForeignKey,
    shipper: ForeignKey,
    departureStation: ForeignKey,
    destinationStation: ForeignKey,
    isEtranCreated: types.maybeNull(types.boolean),
});

const BaseStore = createBaseStoreWithViewMediator({
    storeName: "EtranInvoice",
    storeListModel: EtranInvoice,
    storeMainInfoModel: EtranInvoice,
});

export const EtranInvoiceStore = types.compose(BaseStore, ViewMediator).named("EtranInvoiceStore");

export interface IEtranInvoice extends Instance<typeof EtranInvoice> {}
