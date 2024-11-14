import { Instance, types } from "mobx-state-tree";
import { IsoDate } from "src/shared/entities";

export const ContainerMovement = types.model("ContainerMovement", {
    eventCode: types.string,
    containerCode: types.string,
    id: types.string,
    transportType: types.string,
    transportNumber: types.string,
    etsngCode: types.string,
    eventDateTime: IsoDate,
    orderNumber: types.number,
    orderStatus: types.string,
    clientCode: types.string,
});

export interface IContainerMovement extends Instance<typeof ContainerMovement> {}
