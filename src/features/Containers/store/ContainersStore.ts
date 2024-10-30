import { Instance } from "mobx-state-tree";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { Containers } from "./models";

export const ContainersStore = createBaseStoreWithViewMediator({
    storeName: "RemainsContainers",
    storeListModel: Containers,
    storeMainInfoModel: Containers,
});

export interface IRemainsContainersStore extends Instance<typeof ContainersStore> {}
