import { Instance, types } from "mobx-state-tree";

export const ContainerMovement = types.model("ContainerMovement", {
    eventCode: types.string,
    containerCode: types.string,
    id: types.string,
    transportType: types.string,
    transportNumber: types.string,
    etsngCode: types.string,
    eventDateTime: types.string,
    orderNumber: types.integer,
    orderStatus: types.string,
    clientCode: types.string,
});

export interface IContainerMovement extends Instance<typeof ContainerMovement> {}
