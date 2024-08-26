import { Instance, types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

export const Service = types.model("Service", {
    id: types.identifier,
    code: types.string,
    terminalArea: types.maybeNull(types.string),
    unitOfMeasure: types.maybeNull(ForeignKey),
    accrualMethod: types.maybeNull(types.string),
    accrualBase: types.maybeNull(types.string),
    active: types.boolean,
});

export const FullService = types.compose(
    "FullService",
    Service,
    types.model({
        instruction: types.maybeNull(types.string),
        name: types.maybeNull(types.string),
    })
);

const ServiceStore = createBaseStoreWithViewMediator({
    storeName: "Service",
    storeListModel: Service,
    storeMainInfoModel: FullService,
});

export default ServiceStore;

export interface IService extends Instance<typeof Service> {}
