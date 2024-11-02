import { Instance, types } from "mobx-state-tree";

export const ContainerMovement = types.model("ContainerMovement", {
    id: types.string,
    code: types.string,
    containerCode: types.string,
    zone: types.string,
    platform: types.string,
    good: types.string,
    status: types.string,
    neto: types.number,
    date: types.string,
    order: types.string,
    damageList: types.array(types.string),
});

export interface IContainerMovement extends Instance<typeof ContainerMovement> {}
