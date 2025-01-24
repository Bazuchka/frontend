import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { ReceivingOrderPreviewCargo } from "./models";

export const ReceivingOrderPreviewCargoStore = createBaseStoreWithViewMediator({
    storeName: "ReceivingOrderCargo",
    storeListModel: ReceivingOrderPreviewCargo,
    storeMainInfoModel: ReceivingOrderPreviewCargo,
});

export const receivingOrderPreviewCargoStore = ReceivingOrderPreviewCargoStore.create();
