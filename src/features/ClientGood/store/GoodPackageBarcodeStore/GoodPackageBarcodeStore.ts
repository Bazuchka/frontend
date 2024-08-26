import { Instance, types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

export const GoodPackageBarcode = types.model("GoodPackageBarcode", {
    id: types.identifier,
    code: types.string,
    goodPackage: ForeignKey,
    goodVariant: ForeignKey,
    syncId: types.string,
    active: types.boolean,
});

const GoodPackageBarcodeBarcodeStore = createBaseStoreWithViewMediator({
    storeName: "GoodPackageBarcode",
    storeListModel: GoodPackageBarcode,
    storeMainInfoModel: GoodPackageBarcode,
});

export default GoodPackageBarcodeBarcodeStore;

export interface IGoodPackageBarcode extends Instance<typeof GoodPackageBarcode> {}
