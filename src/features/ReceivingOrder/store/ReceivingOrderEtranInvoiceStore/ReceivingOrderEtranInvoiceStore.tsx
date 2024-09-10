import { Instance, types } from "mobx-state-tree";
import { EtranInvoiceStore } from "src/features/EtranInvoice/store/EtranInvoice";
import { ForeignKey, ForeignKeyShort } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { ViewMediator } from "src/shared/store";

export const EtranInvoice = types.model("EtranInvoice", {
    id: types.identifier,
    code: types.maybeNull(types.string),
    shipper: types.maybeNull(ForeignKey),
    departureStation: types.maybeNull(ForeignKey),
    destinationStation: types.maybeNull(ForeignKey),
});

export const ReceivingOrderEtranInvoice = types.model("ReceivingOrderEtranInvoice", {
    id: types.identifier,
    etranInvoice: types.maybeNull(EtranInvoice),
    receivingOrder: ForeignKeyShort,
    shipper: types.maybeNull(ForeignKey),
    departureStation: types.maybeNull(ForeignKey),
    destinationStation: types.maybeNull(ForeignKey),
    etranInvoiceStore: types.optional(EtranInvoiceStore, () => EtranInvoiceStore.create()),
});

const BaseStore = createBaseStoreWithViewMediator({
    storeName: "ReceivingOrderEtranInvoice",
    storeListModel: ReceivingOrderEtranInvoice,
    storeMainInfoModel: ReceivingOrderEtranInvoice,
});

export const ReceivingOrderEtranInvoiceStore = types
    .compose(BaseStore, ViewMediator)
    .named("ReceivingOrderEtranInvoiceStore");

export interface IReceivingOrderEtranInvoice extends Instance<typeof ReceivingOrderEtranInvoice> {}
export interface IFullReceivingOrderEtranInvoice
    extends Instance<typeof ReceivingOrderEtranInvoice> {}
