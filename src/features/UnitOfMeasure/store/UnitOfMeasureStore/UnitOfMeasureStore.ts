import { Instance, types } from "mobx-state-tree";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

export const UnitOfMeasure = types.model("UnitOfMeasure", {
    id: types.identifier,
    codeOkei: types.string,
    unitOfMeasureType: types.string,
    name: types.maybeNull(types.string),
    code: types.string,
    active: types.boolean,
});

const UnitOfMeasureStore = createBaseStoreWithViewMediator({
    storeName: "UnitOfMeasure",
    storeListModel: UnitOfMeasure,
    storeMainInfoModel: UnitOfMeasure,
});

export default UnitOfMeasureStore;

export interface IUnitOfMeasure extends Instance<typeof UnitOfMeasure> {}
