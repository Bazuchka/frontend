import { Instance, types } from "mobx-state-tree";
import { IsoDate } from "src/shared/entities";

export const RemainsContainersItem = types.model("RemainsContainersItem", {
    id: types.string,
    containerCode: types.string,
    eventDateTime: IsoDate,
    orderNumber: types.number,
    orderStatus: types.string,
    clientCode: types.string,
    etsngCode: types.string,
});

export interface IRemainsContainersItem extends Instance<typeof RemainsContainersItem> {}
