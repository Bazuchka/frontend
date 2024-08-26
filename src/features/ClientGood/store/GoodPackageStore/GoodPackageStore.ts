import { Instance, types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

export const GoodPackage = types.model("GoodPackage", {
    id: types.identifier,
    code: types.string,
    clientGood: ForeignKey,
    unitOfMeasure: ForeignKey,
    processingType: types.maybeNull(types.string),
    conversionQty: types.number,
    syncId: types.string,
    level: types.number,
    length: types.maybeNull(types.number),
    width: types.maybeNull(types.number),
    height: types.maybeNull(types.number),
    weight: types.maybeNull(types.number),
    volume: types.maybeNull(types.number),
    tareWeight: types.maybeNull(types.number),
    active: types.boolean,
});

const GoodPackageStore = createBaseStoreWithViewMediator({
    storeName: "GoodPackage",
    storeListModel: GoodPackage,
    storeMainInfoModel: GoodPackage,
});

export default GoodPackageStore;

export interface IGoodPackage extends Instance<typeof GoodPackage> {}
