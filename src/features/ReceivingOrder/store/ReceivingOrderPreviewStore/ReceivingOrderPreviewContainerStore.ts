import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { ReceivingOrderPreviewContainer } from "./models";

export const ReceivingOrderPreviewContainerStore = createBaseStoreWithViewMediator({
    storeName: "ReceivingOrderContainer",
    storeListModel: ReceivingOrderPreviewContainer,
    storeMainInfoModel: ReceivingOrderPreviewContainer,
});

export const receivingOrderPreviewContainerStore = ReceivingOrderPreviewContainerStore.create();
