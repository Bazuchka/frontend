import { Instance, types } from "mobx-state-tree";
import { Container } from "src/features/Container/store/ContainerStore";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

// todo тут пока выдуманные данные - ждем сущности
export const RemainsContainerItem = types.model("RemainsContainerItem", {
    id: types.identifier,
    code: types.maybe(types.string),
    syncId: types.maybe(types.string),
    container: Container,
    sealNumbers: types.array(types.string),
    empty: types.boolean,
    weight: types.number,
    net: types.number,
    gross: types.number,
});

// todo нужно наполнить модель для стора
export const RemainsContainers = types.model("RemainsContainers", {
    id: types.identifier,
    remainsContainer: RemainsContainerItem,
});

export const RemainsContainersStore = createBaseStoreWithViewMediator({
    storeName: "RemainsContainers",
    storeListModel: RemainsContainers,
    storeMainInfoModel: RemainsContainers,
});

export interface IRemainsContainersStore extends Instance<typeof RemainsContainers> {}
