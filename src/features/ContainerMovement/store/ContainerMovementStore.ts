import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { ContainerMovement } from "./model";

export const ContainerMovementStore = createBaseStoreWithViewMediator({
    storeName: "ContainerMovement",
    storeListModel: ContainerMovement,
    storeMainInfoModel: ContainerMovement,
});

export const containerMovement = ContainerMovementStore.create();
