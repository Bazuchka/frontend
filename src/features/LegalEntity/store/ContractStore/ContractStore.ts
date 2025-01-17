import { Instance, types } from "mobx-state-tree";
import { ForeignKey, IsoDate } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

export const Contract = types.model("Contract", {
    id: types.identifier,
    code: types.string,
    company: types.maybe(ForeignKey),
    contractNumber: types.string,
    contractDate: types.maybeNull(IsoDate),
    contractType: types.maybeNull(types.string),
    validFrom: types.maybeNull(IsoDate),
    validTo: types.maybeNull(IsoDate),
    legalEntity: ForeignKey,
    active: types.boolean,
    currency: types.maybeNull(ForeignKey),
});

export const ContractStore = createBaseStoreWithViewMediator({
    storeName: "Contract",
    storeListModel: Contract,
    storeMainInfoModel: Contract,
});

export interface IContract extends Instance<typeof Contract> {}
