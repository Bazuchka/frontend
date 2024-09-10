import { Instance, types } from "mobx-state-tree";
import { ForeignKey, ForeignKeyShort } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

export const ReceivingOrderContainerItem = types.model("ReceivingOrderContainersItem", {
    id: types.identifier,
    code: types.maybe(types.string),
    syncId: types.maybe(types.string),
    receivingOrder: ForeignKeyShort,
    receivingOrderContainer: ForeignKey,
    etsngCode: ForeignKey,
    description: types.string,
    price: types.number,
});

export const ReceivingOrderContainerItemStore = createBaseStoreWithViewMediator({
    storeName: "ReceivingOrderContainerItem",
    storeListModel: ReceivingOrderContainerItem,
    storeMainInfoModel: ReceivingOrderContainerItem,
});

export interface IReceivingOrderContainerItem
    extends Instance<typeof ReceivingOrderContainerItem> {}
