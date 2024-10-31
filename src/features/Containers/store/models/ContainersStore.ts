import { types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";

// todo тут пока выдуманные данные - ждем сущности
export const ContainerModal = types.model("ContainersItem", {
    id: types.identifier,
    code: types.maybe(types.string),
    syncId: types.maybe(types.string),
    containerType: types.string,
    weight: types.number,
    refrigerator: types.boolean,
    active: types.boolean,
    client: ForeignKey,
});
