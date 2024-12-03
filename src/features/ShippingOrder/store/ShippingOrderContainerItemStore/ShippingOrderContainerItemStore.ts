import { Instance, types } from "mobx-state-tree";
import { ForeignKey, ForeignKeyShort } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

export const ShippingOrderContainerItem = types.model("ShippingOrderContainersItem", {
    id: types.identifier,
    code: types.maybe(types.string),
    syncId: types.maybe(types.string),
    shippingOrder: ForeignKeyShort,
    shippingOrderContainer: ForeignKey,
    etsngCode: types.model({
        id: types.identifier,
        code: types.maybe(types.string),
        name: types.maybe(types.string),
    }),
    description: types.string,
    price: types.number,
});

export const ShippingOrderContainerItemStore = createBaseStoreWithViewMediator({
    storeName: "ShippingOrderContainerItem",
    storeListModel: ShippingOrderContainerItem,
    storeMainInfoModel: ShippingOrderContainerItem,
});

export interface IShippingOrderContainerItem extends Instance<typeof ShippingOrderContainerItem> {}
