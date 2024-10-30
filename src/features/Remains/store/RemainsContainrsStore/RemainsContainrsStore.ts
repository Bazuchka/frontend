import { Instance } from "mobx-state-tree";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { RemainsContainers } from "./models";

export const RemainsContainersStore = createBaseStoreWithViewMediator({
    storeName: "RemainsContainers",
    storeListModel: RemainsContainers,
    storeMainInfoModel: RemainsContainers,
    useMock: true,
});

export interface IRemainsContainersStore extends Instance<typeof RemainsContainers> {}
