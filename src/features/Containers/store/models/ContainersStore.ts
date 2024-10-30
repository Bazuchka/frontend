import { types } from "mobx-state-tree";
import { Container } from "src/features/Container/store/ContainerStore";

// todo тут пока выдуманные данные - ждем сущности
export const Containers = types.model("Containers", {
    id: types.identifier,
    container: Container,
});
