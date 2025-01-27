import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { ShippingOrderPreviewCargo } from "./models";

export const ShippingOrderPreviewCargoStore = createBaseStoreWithViewMediator({
    storeName: "ShippingOrderCargo",
    storeListModel: ShippingOrderPreviewCargo,
    storeMainInfoModel: ShippingOrderPreviewCargo,
});

export const shippingOrderPreviewCargoStore = ShippingOrderPreviewCargoStore.create();
