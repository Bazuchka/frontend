import { Instance, types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { ContractStore } from "../ContractStore";

export const LegalEntity = types.model("LegalEntity", {
    id: types.identifier,
    code: types.string,
    client: ForeignKey,
    inn: types.maybeNull(types.string),
    kpp: types.maybeNull(types.string),
    active: types.boolean,
});

export const LeagalEntityFull = types.compose(
    "LegalEntityFull",
    LegalEntity,
    types.model({
        okpo: types.maybeNull(types.string),
        ogrn: types.maybeNull(types.string),
        edoId: types.maybeNull(types.string),
        addressLegal: types.maybeNull(types.string),
        addressFact: types.maybeNull(types.string),
        signatoryName: types.maybeNull(types.string),
        signatoryPosition: types.maybeNull(types.string),
        name: types.maybe(types.string),
        contracts: types.optional(ContractStore, {
            state: {},
            data: [],
        }),
    })
);

const LegalEntityStore = createBaseStoreWithViewMediator({
    storeName: "LegalEntity",
    storeListModel: LegalEntity,
    storeMainInfoModel: LeagalEntityFull,
});

export default LegalEntityStore;

export interface ILegalEntity extends Instance<typeof LegalEntity> {}
export interface ILegalEntityFull extends Instance<typeof LeagalEntityFull> {}
