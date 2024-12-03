import { Instance, types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

const ClientVehicle = types.model("ClientRelatedEntitiy", {
    id: types.identifier,
    code: types.string,
    client: ForeignKey,
    vehicleType: types.maybeNull(ForeignKey),
    vehicleBrand: ForeignKey,
    refrigerator: types.boolean,
    loadingType: types.maybeNull(ForeignKey),
    active: types.boolean,
});

export const FullClientVehicle = types.compose(
    "FullClientVehicle",
    ClientVehicle,
    types.model({
        withTrailer: types.boolean,
        trailerNumber: types.maybeNull(types.string),
        insuranceNumber: types.maybeNull(types.string),
        name: types.maybeNull(types.string),
    })
);

const ClientVehicleStore = createBaseStoreWithViewMediator({
    storeName: "ClientVehicle",
    storeListModel: ClientVehicle,
    storeMainInfoModel: FullClientVehicle,
});

export default ClientVehicleStore;

export interface IClientVehicle extends Instance<typeof ClientVehicle> {}
export interface IFullClientVehicle extends Instance<typeof FullClientVehicle> {}
