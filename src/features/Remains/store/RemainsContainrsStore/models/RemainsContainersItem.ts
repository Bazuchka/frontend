import { Instance, types } from "mobx-state-tree";

const goodModel = types.model("RemainsContainersItemGood", {
    id: types.string,
    code: types.string,
});

// todo тут пока выдуманные данные - ждем сущности
export const RemainsContainersItem = types.model("RemainsContainersItem", {
    id: types.identifier,
    code: types.maybe(types.string),
    transport: types.string,
    transportCode: types.string,
    good: goodModel,
    date: types.string,
    order: types.string,
    orderStatus: types.string,
    client: types.string,
});

export interface IRemainsContainersItem extends Instance<typeof RemainsContainersItem> {}
