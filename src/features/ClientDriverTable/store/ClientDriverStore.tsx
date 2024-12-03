import { Instance, types } from "mobx-state-tree";
import { ForeignKey, IsoDate } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

const ClientDriver = types.model("ClientRelatedEntitiy", {
    id: types.identifier,
    code: types.string,
    client: ForeignKey,
    phoneNumber: types.maybeNull(types.string),
    identityDocumentType: types.maybeNull(types.string),
    identityDocumentNumber: types.maybeNull(types.string),
    POANumber: types.maybeNull(types.string),
    POAValidTo: types.maybeNull(IsoDate),
    active: types.boolean,
});

export const FullClientDriver = types.compose(
    "FullClientDriver",
    ClientDriver,
    types.model({
        identityDocumentIssuedBy: types.maybeNull(types.string),
        identityDocumentIssuedDate: types.maybeNull(IsoDate),
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
