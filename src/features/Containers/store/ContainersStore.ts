import { Instance } from "mobx-state-tree";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { ContainerModal } from "./models";

export const ContainersStore = createBaseStoreWithViewMediator({
    storeName: "ClientContainers",
    storeListModel: ContainerModal,
    storeMainInfoModel: ContainerModal,
    useMock: true,
});

export interface IContainerItem extends Instance<typeof ContainerModal> {}
export interface IContainersStore extends Instance<typeof ContainersStore> {}
