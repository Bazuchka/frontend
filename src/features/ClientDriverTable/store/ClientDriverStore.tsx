import { Instance, types } from "mobx-state-tree";
import { ForeignKey, IsoDate } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

const ClientDriver = types.model("ClientRelatedEntitiy", {
    id: types.identifier,
    code: types.string,
    client: ForeignKey,
    phoneNumber: types.maybeNull(types.string),
    passportIssuedBy: types.maybeNull(types.string),
    passportIssuedDate: types.maybeNull(IsoDate),
    passportNumber: types.maybeNull(types.string),
    drivingLicenseNumber: types.maybeNull(types.string),
    drivingLicenseIssuedDate: types.maybeNull(IsoDate),
    POANumber: types.maybeNull(types.string),
    POAValidTo: types.maybeNull(IsoDate),
    active: types.boolean,
});

export const FullClientDriver = types.compose(
    "FullClientDriver",
    ClientDriver,
    types.model({
        name: types.maybeNull(types.string),
        addressFact: types.maybeNull(types.string),
    })
);

const ClientDriverStore = createBaseStoreWithViewMediator({
    storeName: "ClientDriver",
    storeListModel: ClientDriver,
    storeMainInfoModel: FullClientDriver,
});

export default ClientDriverStore;

export interface IClientDriver extends Instance<typeof ClientDriver> {}
export interface IFullClientDriver extends Instance<typeof FullClientDriver> {}
