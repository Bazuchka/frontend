import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { RemainsContainersItem } from "./models";

const RemainsContainersStore = createBaseStoreWithViewMediator({
    storeName: "RemainsContainers",
    storeListModel: RemainsContainersItem,
    storeMainInfoModel: RemainsContainersItem,
});

export const remainsContainersStore = RemainsContainersStore.create();
