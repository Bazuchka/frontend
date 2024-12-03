import { Instance, types } from "mobx-state-tree";
import { ForeignKey, ForeignKeyShort, ForeignKeyWithName } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { ViewMediator } from "src/shared/store";
import { EtranInvoiceStore } from "src/features/EtranInvoice/store/EtranInvoice";

export const EtranInvoice = types.model("EtranInvoice", {
    id: types.identifier,
    code: types.maybeNull(types.string),
    shipper: types.maybeNull(ForeignKey),
    departureStation: types.maybeNull(ForeignKeyWithName),
    destinationStation: types.maybeNull(ForeignKeyWithName),
});

export const ShippingOrderEtranInvoice = types.model("ShippingOrderEtranInvoice", {
    id: types.identifier,
    etranInvoice: types.maybeNull(EtranInvoice),
    shippingOrder: ForeignKeyShort,
    shipper: types.maybeNull(ForeignKey),
    departureStation: types.maybeNull(ForeignKeyWithName),
    destinationStation: types.maybeNull(ForeignKeyWithName),
    etranInvoiceStore: types.optional(EtranInvoiceStore, () => EtranInvoiceStore.create()),
});

const BaseStore = createBaseStoreWithViewMediator({
    storeName: "ShippingOrderEtranInvoice",
    storeListModel: ShippingOrderEtranInvoice,
    storeMainInfoModel: ShippingOrderEtranInvoice,
});

export const ShippingOrderEtranInvoiceStore = types
    .compose(BaseStore, ViewMediator)
    .named("ShippingOrderEtranInvoiceStore");

export interface IShippingOrderEtranInvoice extends Instance<typeof ShippingOrderEtranInvoice> {}
export interface IFullShippingOrderEtranInvoice
    extends Instance<typeof ShippingOrderEtranInvoice> {}
