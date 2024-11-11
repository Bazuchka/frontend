import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { RemainsContainersItem } from "./models";

const RemainsContainersStore = createBaseStoreWithViewMediator({
    storeName: "RemainsContainers",
    storeListModel: RemainsContainersItem,
    storeMainInfoModel: RemainsContainersItem,
    useMock: true,
});

export const remainsContainersStore = RemainsContainersStore.create();
