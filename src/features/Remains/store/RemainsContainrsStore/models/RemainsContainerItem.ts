import { types } from "mobx-state-tree";
import { Container } from "src/features/Container/store/ContainerStore";

// todo тут пока выдуманные данные - ждем сущности
export const RemainsContainerItem = types.model("RemainsContainerItem", {
    id: types.identifier,
    code: types.maybe(types.string),
    syncId: types.maybe(types.string),
    container: Container,
    sealNumbers: types.array(types.string),
    empty: types.boolean,
    weightTara: types.number,
    net: types.number,
    gross: types.number,
});
