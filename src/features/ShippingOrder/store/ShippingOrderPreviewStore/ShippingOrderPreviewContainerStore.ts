import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { ShippingOrderPreviewContainer } from "./models";

export const ShippingOrderPreviewContainerStore = createBaseStoreWithViewMediator({
    storeName: "ShippingOrderContainer",
    storeListModel: ShippingOrderPreviewContainer,
    storeMainInfoModel: ShippingOrderPreviewContainer,
});

export const shippingOrderPreviewContainerStore = ShippingOrderPreviewContainerStore.create();
